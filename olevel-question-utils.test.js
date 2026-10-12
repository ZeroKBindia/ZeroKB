"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = __dirname;
const window = {};
[
    "olevel-catalog.js",
    "olevel-question-utils.js",
    "olevel-data-m1.js",
    "olevel-data-m2.js",
    "olevel-data-m3.js",
    "olevel-data-m4.js"
].forEach(function (filename) {
    const source = fs.readFileSync(path.join(root, filename), "utf8");
    vm.runInNewContext(source, { window: window }, { filename: filename });
});

const utils = window.OLEVEL_QUESTION_UTILS;

function makeQuestion(id, difficulty, chapterId, moduleId) {
    return {
        id: id,
        difficulty: difficulty,
        chapterId: chapterId,
        moduleId: moduleId,
        questionEnglish: "Question " + id,
        options: [
            { id: id + "-O1", en: "Option A" },
            { id: id + "-O2", en: "Option B" }
        ],
        correctOptionId: id + "-O2"
    };
}

function seededRandom(seed) {
    let value = seed;
    return function () {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

test("normalizes the difficulty labels used by the bank and its Medium alias", function () {
    assert.equal(utils.normalizeDifficulty("Easy"), "Easy");
    assert.equal(utils.normalizeDifficulty(" moderate "), "Moderate");
    assert.equal(utils.normalizeDifficulty("Medium"), "Moderate");
    assert.equal(utils.normalizeDifficulty("MED"), "Moderate");
    assert.equal(utils.normalizeDifficulty("moderate-difficulty"), "Moderate");
    assert.equal(utils.normalizeDifficulty("HARD"), "Hard");
    assert.equal(utils.normalizeDifficulty("expert"), "");
});

test("filters paper, chapter, and combined difficulties before selection", function () {
    const questions = [
        makeQuestion("one", "Moderate", "chapter-a", "M1-R5.1"),
        makeQuestion("two", "Hard", "chapter-a", "M1-R5.1"),
        makeQuestion("three", "Easy", "chapter-a", "M1-R5.1"),
        makeQuestion("four", "Medium", "chapter-b", "M1-R5.1"),
        makeQuestion("five", "Hard", "chapter-a", "M2-R5.1")
    ];
    const eligible = utils.filterQuestions(questions, {
        paperId: "M1-R5.1",
        chapterIds: ["chapter-a"],
        difficulties: ["Moderate", "Hard"]
    });
    assert.deepEqual(Array.from(eligible, function (question) { return question.id; }).sort(), ["one", "two"]);
});

test("supports module and source filters together and accepts missing optional translations", function () {
    const questions = [
        Object.assign(makeQuestion("source-one", "MODERATE", "chapter-a", "M1-R5.1"), { sourceType: "Original Practice" }),
        Object.assign(makeQuestion("source-two", "Hard", "chapter-a", "M1-R5.1"), { sourceType: "Verified Past Paper" }),
        Object.assign(makeQuestion("source-three", "Hard", "chapter-a", "M2-R5.1"), { sourceType: "Verified Past Paper" })
    ];
    questions[0].questionEnglish = "";
    questions[0].questionHindi = "प्रश्न";
    questions[0].options[0].en = "";
    questions[0].options[0].hi = "विकल्प";
    const result = utils.filterQuestions(questions, {
        moduleId: "M1-R5.1",
        chapterIds: ["chapter-a"],
        difficulties: ["moderate", "HARD"],
        sourceTypes: ["original practice"]
    });
    assert.deepEqual(Array.from(result, function (question) { return question.id; }), ["source-one"]);
});

test("core eligibility excludes broken records but not absent optional metadata", function () {
    const question = makeQuestion("valid-minimal", "Hard", "chapter-a", "M1-R5.1");
    question.questionEnglish = "";
    question.questionHindi = "प्रश्न";
    question.options[0].en = "";
    question.options[0].hi = "उत्तर";
    assert.deepEqual(Array.from(utils.validateQuestion(question, "M1-R5.1")), []);
    assert.deepEqual(Array.from(utils.validateQuestion(Object.assign({}, question, { correctOptionId: "missing" }), "M1-R5.1")),
        ["invalid correct option ID"]);
});

test("unknown difficulty labels do not broaden selected filters", function () {
    const questions = [
        makeQuestion("medium", "Medium", "chapter-a", "M1-R5.1"),
        makeQuestion("easy", "Easy", "chapter-a", "M1-R5.1")
    ];
    const result = utils.filterQuestions(questions, {
        paperId: "M1-R5.1",
        chapterIds: ["chapter-a"],
        difficulties: ["moderate"]
    });
    assert.deepEqual(Array.from(result, function (question) { return question.id; }), ["medium"]);
});

test("M1 single-chapter Moderate + Hard returns exactly 10 valid unique questions", function () {
    const m1 = window.OLEVEL_BANKS.m1;
    const chapterId = "computer-fundamentals";
    const chapterQuestions = m1.filter(function (question) {
        return question.moduleId === "M1-R5.1" && question.chapterId === chapterId;
    });
    const moderate = chapterQuestions.filter(function (question) {
        return utils.normalizeDifficulty(question.difficulty) === "Moderate";
    });
    const hard = chapterQuestions.filter(function (question) {
        return utils.normalizeDifficulty(question.difficulty) === "Hard";
    });
    const emptyDifficulty = utils.filterQuestions(m1, {
        paperId: "M1-R5.1",
        chapterIds: [chapterId],
        difficulties: []
    });
    const chapterPool = utils.filterQuestions(m1, {
        paperId: "M1-R5.1",
        chapterIds: [chapterId],
        difficulties: ["Moderate", "Hard"]
    });
    assert.equal(emptyDifficulty.length, 0);
    assert.equal(chapterQuestions.length, 11);
    assert.equal(moderate.length, 7);
    assert.equal(hard.length, 4);
    assert.equal(chapterPool.length, 11);
    assert.equal(new Set(Array.from(chapterPool, function (question) { return question.id; })).size, 11);
    chapterPool.forEach(function (question) {
        assert.equal(question.moduleId, "M1-R5.1");
        assert.equal(question.chapterId, chapterId);
        assert.ok(["Moderate", "Hard"].includes(utils.normalizeDifficulty(question.difficulty)));
    });
    [5, 10].forEach(function (requested) {
        const selected = utils.selectQuestions(chapterPool, requested, [], seededRandom(requested));
        assert.equal(selected.length, requested);
        assert.equal(new Set(selected.map(function (question) { return question.id; })).size, requested);
        selected.forEach(function (question) {
            assert.equal(question.moduleId, "M1-R5.1");
            assert.equal(question.chapterId, chapterId);
            assert.ok(["Moderate", "Hard"].includes(utils.normalizeDifficulty(question.difficulty)));
        });
    });
});

test("every M1 chapter provides a distinct 10-question Moderate-or-Hard quiz", function () {
    const paper = window.OLEVEL_CATALOG.find(function (entry) { return entry.code === "M1-R5.1"; });
    const bank = window.OLEVEL_BANKS.m1;
    const report = utils.validate(window.OLEVEL_CATALOG, window.OLEVEL_BANKS);
    const module = report.modules.find(function (entry) { return entry.id === paper.code; });

    assert.equal(bank.length, 99);
    assert.equal(module.total, 99);
    assert.equal(module.valid, 99);
    assert.equal(report.errors.filter(function (item) {
        return item.id.indexOf("M1-") === 0;
    }).length, 0);

    paper.chapters.forEach(function (chapter) {
        const chapterQuestions = bank.filter(function (question) {
            return question.moduleId === paper.code && question.chapterId === chapter.id;
        });
        const moderate = chapterQuestions.filter(function (question) {
            return utils.normalizeDifficulty(question.difficulty) === "Moderate";
        });
        const hard = chapterQuestions.filter(function (question) {
            return utils.normalizeDifficulty(question.difficulty) === "Hard";
        });
        const eligible = utils.filterQuestions(bank, {
            paperId: paper.code,
            chapterIds: [chapter.id],
            difficulties: ["Moderate", "Hard"]
        });

        assert.equal(chapterQuestions.length, 11, chapter.id);
        assert.equal(eligible.length, moderate.length + hard.length, chapter.id);
        assert.ok(eligible.length >= 10, chapter.id);
        assert.equal(new Set(eligible.map(function (question) { return question.id; })).size, eligible.length);
        const selected = utils.selectQuestions(eligible, 10, [], seededRandom(100 + paper.chapters.indexOf(chapter)));
        assert.equal(selected.length, 10);
        assert.equal(new Set(selected.map(function (question) { return question.id; })).size, 10);
        eligible.forEach(function (question) {
            assert.equal(question.moduleId, paper.code);
            assert.equal(question.chapterId, chapter.id);
            assert.ok(["Moderate", "Hard"].includes(utils.normalizeDifficulty(question.difficulty)));
        });
        selected.forEach(function (question) {
            assert.equal(question.moduleId, paper.code);
            assert.equal(question.chapterId, chapter.id);
            assert.ok(["Moderate", "Hard"].includes(utils.normalizeDifficulty(question.difficulty)));
        });
    });
});

test("every O Level paper chapter provides 10 unique questions for each supported difficulty combination", function () {
    window.OLEVEL_CATALOG.forEach(function (paper) {
        const bank = window.OLEVEL_BANKS[paper.shortCode];
        paper.chapters.forEach(function (chapter) {
            [["Moderate"], ["Hard"], ["Moderate", "Hard"]].forEach(function (difficulties) {
                const eligible = utils.filterQuestions(bank, {
                    paperId: paper.code,
                    chapterIds: [chapter.id],
                    difficulties: difficulties
                });
                assert.ok(eligible.length > 0, paper.code + "/" + chapter.id + "/" + difficulties.join("+"));
                const selected = utils.selectQuestions(
                    eligible,
                    Math.min(10, eligible.length),
                    [],
                    seededRandom(paper.code.length * chapter.id.length * difficulties.length)
                );
                assert.equal(selected.length, Math.min(10, eligible.length));
                assert.equal(new Set(selected.map(function (question) { return question.id; })).size, selected.length);
                selected.forEach(function (question) {
                    assert.equal(question.moduleId, paper.code);
                    assert.equal(question.chapterId, chapter.id);
                    assert.ok(difficulties.includes(utils.normalizeDifficulty(question.difficulty)));
                });
                if (eligible.length < 10) {
                    assert.throws(function () {
                        utils.selectQuestions(eligible, 10, [], seededRandom(7));
                    }, new RegExp("only " + eligible.length + " unique eligible questions are available"));
                }
            });
        });
    });
});

test("supports five and ten question requests for actual M1 Moderate, Hard, and combined pools", function () {
    const paper = window.OLEVEL_CATALOG.find(function (entry) { return entry.shortCode === "m1"; });
    [
        ["Moderate", 56],
        ["Hard", 40],
        ["Moderate + Hard", 96]
    ].forEach(function (selection, selectionIndex) {
        const difficulties = selection[0] === "Moderate + Hard" ? ["Moderate", "Hard"] : [selection[0]];
        const eligible = utils.filterQuestions(window.OLEVEL_BANKS.m1, {
            paperId: paper.code,
            chapterIds: paper.chapters.map(function (chapter) { return chapter.id; }),
            difficulties: difficulties
        });
        assert.equal(eligible.length, selection[1]);
        [5, 10].forEach(function (requested, requestIndex) {
            const selected = utils.selectQuestions(eligible, requested, [], seededRandom(50 + selectionIndex * 2 + requestIndex));
            assert.equal(selected.length, requested);
            assert.equal(new Set(Array.from(selected, function (question) { return question.id; })).size, requested);
            selected.forEach(function (question) {
                assert.equal(question.moduleId, paper.code);
                assert.ok(paper.chapters.some(function (chapter) { return chapter.id === question.chapterId; }));
                assert.ok(difficulties.includes(utils.normalizeDifficulty(question.difficulty)));
            });
        });
    });
});

test("returns no candidates for empty difficulty filters", function () {
    const emptyDifficulty = utils.filterQuestions(window.OLEVEL_BANKS.m1, {
        paperId: "M1-R5.1",
        chapterIds: ["computer-fundamentals"],
        difficulties: []
    });
    assert.equal(emptyDifficulty.length, 0);
});

test("full-paper selection returns exactly 10 from the combined eligible bank", function () {
    const paper = window.OLEVEL_CATALOG.find(function (entry) { return entry.shortCode === "m1"; });
    const eligible = utils.filterQuestions(window.OLEVEL_BANKS.m1, {
        paperId: paper.code,
        chapterIds: paper.chapters.map(function (chapter) { return chapter.id; }),
        difficulties: ["Moderate", "Hard"]
    });
    const generated = utils.selectQuestions(eligible, 10, [], seededRandom(22));
    assert.equal(eligible.length, 96);
    assert.equal(generated.length, 10);
    assert.equal(new Set(Array.from(generated, function (question) { return question.id; })).size, 10);
});

test("selects the requested number of unique questions and prioritizes unseen history", function () {
    const pool = Array.from({ length: 12 }, function (_value, index) {
        return makeQuestion("q" + index, index % 2 ? "Hard" : "Moderate", "chapter-a", "M1-R5.1");
    });
    const selected = utils.selectQuestions(pool, 9, ["q0", "q1", "q2"], seededRandom(4));
    assert.equal(selected.length, 9);
    assert.equal(new Set(Array.from(selected, function (question) { return question.id; })).size, 9);
    assert.equal(selected.some(function (question) { return ["q0", "q1", "q2"].includes(question.id); }), false);
});

test("throws a clear shortage error instead of silently returning fewer questions", function () {
    const pool = [makeQuestion("q1", "Moderate", "chapter-a", "M1-R5.1")];
    assert.throws(function () {
        utils.selectQuestions(pool, 2, [], seededRandom(1));
    }, /Requested 2 questions, but only 1 unique eligible questions are available/);
});

test("consecutive selections can vary and preserve each question record", function () {
    const pool = Array.from({ length: 20 }, function (_value, index) {
        return { id: "q" + index, correctOptionId: "q" + index + "-O2" };
    });
    const random = seededRandom(19);
    const first = utils.selectQuestions(pool, 10, [], random);
    const second = utils.selectQuestions(pool, 10, [], random);
    assert.notDeepEqual(
        Array.from(first, function (question) { return question.id; }).sort(),
        Array.from(second, function (question) { return question.id; }).sort()
    );
    first.concat(second).forEach(function (question) {
        assert.equal(question.correctOptionId, question.id + "-O2");
    });
});

test("all current O Level banks pass schema validation without duplicate questions", function () {
    const report = utils.validate(window.OLEVEL_CATALOG, window.OLEVEL_BANKS);
    assert.equal(report.totalLoaded, 363);
    assert.equal(report.validCount, 363);
    assert.equal(report.errors.length, 0);
    assert.equal(report.duplicateIds, 0);
    assert.equal(report.exactDuplicates, 0);
    assert.equal(report.nearDuplicates.length, 0);
    report.modules.forEach(function (module) {
        assert.equal(module.valid, module.total);
        assert.ok(module.total > 0);
    });
    ["m1", "m2", "m3", "m4"].forEach(function (shortCode) {
        const expectedPractice = window.OLEVEL_BANKS[shortCode].filter(function (question) {
            return question.sourceType === "Expected Practice";
        });
        assert.equal(expectedPractice.length, shortCode === "m1" || shortCode === "m3" ? 72 : shortCode === "m2" ? 64 : 56);
    });
});

test("new expected-practice questions have complete four-option answer keys and cover every chapter", function () {
    const totalAdded = window.OLEVEL_CATALOG.reduce(function (total, paper) {
        const bank = window.OLEVEL_BANKS[paper.shortCode];
        paper.chapters.forEach(function (chapter) {
            const chapterAdditions = bank.filter(function (question) {
                return question.chapterId === chapter.id && question.sourceType === "Expected Practice";
            });
            assert.equal(chapterAdditions.length, 8, paper.code + "/" + chapter.id);
            chapterAdditions.forEach(function (question) {
                assert.equal(question.moduleId, paper.code);
                assert.ok(["Moderate", "Hard"].includes(utils.normalizeDifficulty(question.difficulty)));
                assert.ok(question.questionEnglish.trim());
                assert.ok(question.questionHindi.trim());
                assert.equal(question.options.length, 4);
                assert.equal(new Set(question.options.map(function (option) { return utils.normalize(option.en); })).size, 4);
                assert.equal(new Set(question.options.map(function (option) { return utils.normalize(option.hi); })).size, 4);
                assert.equal(question.options.filter(function (option) { return option.id === question.correctOptionId; }).length, 1);
                assert.ok(question.explanationEnglish.trim());
                assert.ok(question.explanationHindi.trim());
                assert.equal(question.source.year, null);
            });
            total += chapterAdditions.length;
        });
        return total;
    }, 0);
    assert.equal(totalAdded, 264);
});

test("optional O Level metadata does not invalidate an otherwise answerable question", function () {
    const question = window.OLEVEL_BANKS.m1[0];
    const original = {
        questionHindi: question.questionHindi,
        explanationEnglish: question.explanationEnglish,
        explanationHindi: question.explanationHindi,
        topicId: question.topicId,
        topic: question.topic,
        sourceType: question.sourceType,
        source: question.source,
        optionHi: question.options[0].hi
    };
    question.questionHindi = "";
    question.explanationEnglish = "";
    question.explanationHindi = "";
    question.topicId = "";
    question.topic = "";
    question.sourceType = "";
    question.source = null;
    question.options[0].hi = "";
    try {
        const report = utils.validate(window.OLEVEL_CATALOG, window.OLEVEL_BANKS);
        assert.equal(report.modules.find(function (module) { return module.id === "M1-R5.1"; }).valid, 99);
        assert.equal(report.errors.some(function (item) { return item.id === question.id; }), false);
        assert.ok(report.warnings.some(function (item) { return item.id === question.id; }));
        const chapterPool = utils.filterQuestions(window.OLEVEL_BANKS.m1, {
            paperId: "M1-R5.1",
            chapterIds: [question.chapterId],
            difficulties: [question.difficulty]
        });
        assert.ok(chapterPool.some(function (entry) { return entry.id === question.id; }));
    } finally {
        question.questionHindi = original.questionHindi;
        question.explanationEnglish = original.explanationEnglish;
        question.explanationHindi = original.explanationHindi;
        question.topicId = original.topicId;
        question.topic = original.topic;
        question.sourceType = original.sourceType;
        question.source = original.source;
        question.options[0].hi = original.optionHi;
    }
});
