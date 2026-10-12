"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const window = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "customize-test.js"), "utf8"), {
    window: window
}, { filename: "customize-test.js" });

const quiz = window.ZeroKBCustomTest;
const chapters = [
    "computer-fundamentals",
    "operating-system",
    "word-processing",
    "spreadsheet",
    "internet-email",
    "digital-financial-services",
    "cyber-security",
    "future-skills"
];

function seededRandom(seed) {
    let value = seed;
    return function () {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

test("all CCC and O Level sections have complete, valid bank diagnostics", function () {
    ["CCC", "O Level"].forEach(function (course) {
        const report = quiz.getDiagnostics(course, chapters, ["Easy", "Moderate", "Hard"]);
        assert.equal(report.totalLoaded, 64);
        assert.equal(report.selectedChapterLoaded, 64);
        assert.equal(report.selectedChapterValid, 64);
        assert.equal(report.eligible, 64);
        assert.deepEqual(Array.from(report.invalid), []);
        assert.equal(report.chapters.length, chapters.length);
        report.chapters.forEach(function (chapter) {
            assert.equal(chapter.loaded, 8);
            assert.equal(chapter.valid, 8);
            assert.equal(chapter.eligible, 8);
            assert.equal(Object.values(chapter.byDifficulty).reduce(function (sum, count) { return sum + count; }, 0), 8);
        });
    });
});

test("difficulty matching is case-insensitive and Moderate aliases remain inclusive OR filters", function () {
    const bank = quiz.getBank().CCC;
    const chapter = bank["computer-fundamentals"];
    const originalDifficulty = chapter[0].difficulty;
    chapter[0].difficulty = " hArD ";
    try {
        const eligible = quiz.getEligiblePool("ccc", ["computer-fundamentals"], ["MEDIUM", "hard"]);
        assert.ok(eligible.some(function (question) { return question.id === chapter[0].id; }));
        assert.equal(eligible.every(function (question) {
            const difficulty = String(question.difficulty).trim().toLowerCase();
            return ["moderate", "medium", "med", "hard"].includes(difficulty);
        }), true);
    } finally {
        chapter[0].difficulty = originalDifficulty;
    }
});

test("10-question selection filters exactly the requested chapters, course and difficulties", function () {
    ["CCC", "O Level"].forEach(function (course, index) {
        const selectedChapters = chapters.slice(0, 2);
        const eligible = quiz.getEligiblePool(course, selectedChapters, ["Moderate", "Hard"]);
        assert.equal(eligible.length, course === "CCC" ? 10 : 12);
        const selected = quiz.selectQuestions(eligible, 10, seededRandom(30 + index));
        assert.equal(selected.length, 10);
        assert.equal(new Set(selected.map(function (question) { return question.id; })).size, 10);
        selected.forEach(function (question) {
            assert.equal(question.course, course);
            assert.ok(selectedChapters.includes(question.chapterId));
            assert.ok(["Moderate", "Hard"].includes(question.difficulty));
        });
    });
});

test("50-question selection uses all available eligible questions without repetition", function () {
    ["CCC", "O Level"].forEach(function (course, index) {
        const eligible = quiz.getEligiblePool(course, chapters, ["Easy", "Moderate", "Hard"]);
        const selected = quiz.selectQuestions(eligible, 50, seededRandom(80 + index));
        assert.equal(eligible.length, 64);
        assert.equal(selected.length, 50);
        assert.equal(new Set(selected.map(function (question) { return question.id; })).size, 50);
    });
});

test("single-chapter shortages report real counts and never silently lower the requested count", function () {
    ["CCC", "O Level"].forEach(function (course) {
        const chapter = "computer-fundamentals";
        const report = quiz.getDiagnostics(course, [chapter], ["Moderate", "Hard"]);
        const eligible = quiz.getEligiblePool(course, [chapter], ["Moderate", "Hard"]);
        assert.equal(report.chapters[0].loaded, 8);
        const available = course === "CCC" ? 5 : 6;
        assert.equal(report.chapters[0].eligible, available);
        assert.equal(eligible.length, available);
        assert.throws(function () {
            quiz.selectQuestions(eligible, 10, seededRandom(2));
        }, new RegExp("Requested 10 questions, but only " + available + " valid eligible questions are available"));
        assert.equal(quiz.selectQuestions(eligible, eligible.length, seededRandom(3)).length, available);
    });
});

test("valid questions do not require optional translations, explanations, or source metadata", function () {
    const question = quiz.getBank()["O Level"]["computer-fundamentals"][0];
    const original = {
        questionHindi: question.questionHindi,
        explanation: question.explanation,
        sourceType: question.sourceType,
        source: question.source,
        optionHi: question.options[0].hi
    };
    question.questionHindi = "";
    question.explanation = "";
    question.sourceType = "";
    question.source = null;
    question.options[0].hi = "";
    try {
        const report = quiz.getDiagnostics("O Level", ["computer-fundamentals"], ["Moderate", "Hard"]);
        assert.equal(report.invalid.some(function (entry) { return entry.id === question.id; }), false);
        assert.ok(quiz.getEligiblePool("O Level", ["computer-fundamentals"], ["Moderate", "Hard"])
            .some(function (entry) { return entry.id === question.id; }));
    } finally {
        question.questionHindi = original.questionHindi;
        question.explanation = original.explanation;
        question.sourceType = original.sourceType;
        question.source = original.source;
        question.options[0].hi = original.optionHi;
    }
});

test("invalid core fields and duplicate IDs are excluded with explicit diagnostic reasons", function () {
    const bank = quiz.getBank().CCC["computer-fundamentals"];
    const malformed = {
        id: "TEST-BAD",
        course: "CCC",
        chapterId: "computer-fundamentals",
        chapter: "Computer Fundamentals",
        difficulty: "Moderate",
        questionEnglish: "",
        questionHindi: "",
        options: [{ en: "A", hi: "A" }, { en: "B", hi: "B" }],
        correctAnswer: 7
    };
    const duplicate = Object.assign({}, bank[0]);
    bank.push(malformed, duplicate);
    try {
        const report = quiz.getDiagnostics("CCC", ["computer-fundamentals"], ["Easy", "Moderate", "Hard"]);
        assert.equal(report.invalid.length, 2);
        assert.match(report.invalid.find(function (entry) { return entry.id === "TEST-BAD"; }).reasons.join(" "), /missing question text/);
        assert.match(report.invalid.find(function (entry) { return entry.id === "TEST-BAD"; }).reasons.join(" "), /correct answer/);
        assert.match(report.invalid.find(function (entry) { return entry.id === duplicate.id; }).reasons.join(" "), /duplicate question ID/);
        assert.equal(quiz.getEligiblePool("CCC", ["computer-fundamentals"], ["Easy", "Moderate", "Hard"]).length, 8);
    } finally {
        bank.splice(bank.length - 2, 2);
    }
});

test("unknown courses never fall back to CCC questions", function () {
    assert.deepEqual(Array.from(quiz.getEligiblePool("not-a-course", chapters, ["Easy", "Moderate", "Hard"])), []);
    assert.equal(quiz.getDiagnostics("not-a-course", chapters, ["Easy", "Moderate", "Hard"]).totalLoaded, 0);
});
