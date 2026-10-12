(function (global) {
    "use strict";

    const SOURCE_TYPES = ["Original Practice", "Expected Practice", "Verified Official Sample", "Verified Past Paper"];

    function normalize(text) {
        return String(text || "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");
    }

    function normalizeDifficulty(value) {
        const difficulty = String(value || "").trim().toLowerCase().replace(/[\s_-]+/g, "").replace(/(difficulty|level)$/, "");
        if (difficulty === "easy") return "Easy";
        if (difficulty === "moderate" || difficulty === "medium" || difficulty === "med") return "Moderate";
        if (difficulty === "hard") return "Hard";
        return "";
    }

    function validateQuestion(question, paperId) {
        const issues = [];
        if (!question || typeof question !== "object") return ["question must be an object"];
        if (typeof question.id !== "string" || !question.id.trim()) issues.push("missing question ID");
        if (paperId && question.moduleId !== paperId) issues.push("module ID does not match selected paper");
        if (typeof question.chapterId !== "string" || !question.chapterId.trim()) issues.push("missing chapter ID");
        if (!normalizeDifficulty(question.difficulty)) issues.push("invalid difficulty");
        if (!(typeof question.questionEnglish === "string" && question.questionEnglish.trim()) &&
            !(typeof question.questionHindi === "string" && question.questionHindi.trim())) {
            issues.push("missing question text");
        }
        if (!Array.isArray(question.options) || question.options.length < 2) {
            issues.push("at least two answer options are required");
        } else {
            const optionIds = new Set();
            question.options.forEach(function (option) {
                if (!option || typeof option !== "object" || typeof option.id !== "string" || !option.id.trim()) {
                    issues.push("option has missing ID");
                    return;
                }
                if (!(typeof option.en === "string" && option.en.trim()) &&
                    !(typeof option.hi === "string" && option.hi.trim())) {
                    issues.push("option has no answer text");
                }
                if (optionIds.has(option.id)) issues.push("duplicate option ID");
                optionIds.add(option.id);
            });
            if (!question.correctOptionId || !optionIds.has(question.correctOptionId)) {
                issues.push("invalid correct option ID");
            }
        }
        return issues;
    }

    function shuffle(items, random) {
        const result = items.slice();
        const randomValue = typeof random === "function" ? random : Math.random;
        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(randomValue() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }
        return result;
    }

    function filterQuestions(questions, filters) {
        const settings = filters || {};
        const chapterIds = new Set(settings.chapterIds || []);
        const difficulties = new Set((settings.difficulties || []).map(normalizeDifficulty).filter(Boolean));
        const sourceTypes = new Set((settings.sourceTypes || []).map(function (source) { return String(source).trim().toLowerCase(); }));
        const paperId = settings.paperId || settings.moduleId;
        const seenIds = new Set();
        if (Array.isArray(settings.chapterIds) && chapterIds.size === 0) return [];
        if (Array.isArray(settings.difficulties) && difficulties.size === 0) return [];
        if (Array.isArray(settings.sourceTypes) && sourceTypes.size === 0) return [];

        return (Array.isArray(questions) ? questions : []).filter(function (question) {
            if (validateQuestion(question, paperId).length || seenIds.has(question.id)) return false;
            if (paperId && question.moduleId !== paperId) return false;
            if (chapterIds.size && !chapterIds.has(question.chapterId)) return false;
            if (!difficulties.size || !difficulties.has(normalizeDifficulty(question.difficulty))) return false;
            if (sourceTypes.size && !sourceTypes.has(String(question.sourceType || "").trim().toLowerCase())) return false;
            seenIds.add(question.id);
            return true;
        });
    }

    function selectQuestions(pool, requested, recentIds, random) {
        if (!Number.isInteger(requested) || requested < 1) {
            throw new RangeError("Requested question count must be a positive integer.");
        }
        const questions = [];
        const seenIds = new Set();
        (Array.isArray(pool) ? pool : []).forEach(function (question) {
            if (!question || typeof question !== "object" || !question.id || seenIds.has(question.id)) return;
            seenIds.add(question.id);
            questions.push(question);
        });
        if (requested > questions.length) {
            throw new RangeError("Requested " + requested + " questions, but only " + questions.length + " unique eligible questions are available.");
        }

        const recent = new Set(Array.isArray(recentIds) ? recentIds : []);
        const unseen = questions.filter(function (question) { return !recent.has(question.id); });
        const seen = questions.filter(function (question) { return recent.has(question.id); });
        const randomized = shuffle(unseen, random).concat(shuffle(seen, random));
        return shuffle(randomized.slice(0, requested), random);
    }

    function validate(catalog, banks) {
        const ids = new Map();
        const textIds = new Map();
        const report = { totalLoaded: 0, validCount: 0, errors: [], warnings: [], nearDuplicates: [], modules: [] };

        function error(id, reason) { report.errors.push({ id: id || "(missing ID)", reason: reason }); }
        function increment(object, key) { object[key] = (object[key] || 0) + 1; }

        (catalog || []).forEach(function (paper) {
            const questions = banks && banks[paper.shortCode];
            const module = {
                id: paper.code,
                total: Array.isArray(questions) ? questions.length : 0,
                valid: 0,
                chapters: paper.chapters.map(function (chapter) {
                    return { id: chapter.id, title: chapter.title, total: 0, valid: 0, difficulties: {}, sources: {} };
                }),
                difficulties: {},
                sources: {},
                answerPositions: [0, 0, 0, 0]
            };
            report.modules.push(module);
            report.totalLoaded += module.total;
            if (!Array.isArray(questions)) {
                error(paper.code, "question bank missing");
                return;
            }
            const chapters = new Map(module.chapters.map(function (chapter) { return [chapter.id, chapter]; }));
            questions.forEach(function (question) {
                if (!question || typeof question !== "object") { error("(missing ID)", "question must be an object"); return; }
                const id = question.id;
                const issues = validateQuestion(question, paper.code);
                issues.forEach(function (reason) {
                    if (reason.indexOf("duplicate option ID") === 0) error(id, reason);
                    else if (reason.indexOf("invalid correct option ID") === 0) error(id, reason);
                    else if (reason.indexOf("missing question ID") === 0) error(id, reason);
                    else if (reason.indexOf("module ID") === 0) error(id, reason);
                    else if (reason.indexOf("missing chapter ID") === 0) error(id, "invalid chapter ID for module");
                    else if (reason.indexOf("invalid difficulty") === 0) error(id, reason);
                    else error(id, reason);
                });
                let valid = issues.length === 0;
                if (id && ids.has(id)) {
                    error(id, "duplicate question ID; first found in " + ids.get(id));
                    valid = false;
                } else if (id) ids.set(id, paper.code);

                if (question.moduleId !== paper.code && !issues.some(function (reason) { return reason.indexOf("module ID") === 0; })) {
                    error(id, "module ID does not match bank");
                    valid = false;
                }
                const chapter = chapters.get(question.chapterId);
                if (!chapter && !issues.some(function (reason) { return reason.indexOf("chapter ID") !== -1; })) {
                    error(id, "invalid chapter ID for module");
                    valid = false;
                }
                if (!question.topicId || !question.topic) report.warnings.push({ id: id || "(missing ID)", reason: "missing optional topic/subtopic metadata" });
                if (!question.questionEnglish || !question.questionHindi) report.warnings.push({ id: id || "(missing ID)", reason: "one question translation is missing" });
                if (!question.explanationEnglish || !question.explanationHindi) report.warnings.push({ id: id || "(missing ID)", reason: "one or more optional explanations are missing" });
                if (!SOURCE_TYPES.includes(question.sourceType)) report.warnings.push({ id: id || "(missing ID)", reason: "missing or unrecognized optional source type" });
                if (!question.source) report.warnings.push({ id: id || "(missing ID)", reason: "optional source metadata is missing" });
                if (Array.isArray(question.options)) {
                    const optionIds = new Set();
                    const optionTexts = new Set();
                    question.options.forEach(function (option) {
                        if (!option || !option.id) return;
                        if (!option.en || !option.hi) report.warnings.push({ id: id || "(missing ID)", reason: "one answer-option translation is missing" });
                        optionIds.add(option.id);
                        const optionText = normalize(option.en || option.hi);
                        if (optionText && optionTexts.has(optionText)) {
                            report.warnings.push({ id: id || "(missing ID)", reason: "duplicate normalized answer-option text" });
                        }
                        optionTexts.add(optionText);
                    });
                    if (question.correctOptionId && optionIds.has(question.correctOptionId)) {
                        module.answerPositions[question.options.findIndex(function (option) { return option && option.id === question.correctOptionId; })] += 1;
                    }
                }

                const questionText = normalize(question.questionEnglish || question.questionHindi);
                if (questionText && textIds.has(questionText)) {
                    report.warnings.push({ id: id || "(missing ID)", reason: "duplicate normalized question text; first found as " + textIds.get(questionText) });
                }
                else if (questionText) textIds.set(questionText, id || "(missing ID)");
                const difficulty = question.difficulty || "invalid";
                const source = question.sourceType || "invalid";
                increment(module.difficulties, difficulty);
                increment(module.sources, source);
                if (chapter) {
                    chapter.total += 1;
                    increment(chapter.difficulties, difficulty);
                    increment(chapter.sources, source);
                }
                if (valid) {
                    module.valid += 1;
                    if (chapter) chapter.valid += 1;
                }
            });
            if (module.total && Math.max.apply(null, module.answerPositions) / module.total > 0.45) {
                report.warnings.push({ id: paper.code, reason: "correct answer position exceeds the 45% concentration threshold" });
            }
        });

        const all = (catalog || []).flatMap(function (paper) {
            return Array.isArray(banks && banks[paper.shortCode]) ? banks[paper.shortCode] : [];
        });
        for (let i = 0; i < all.length; i += 1) {
            const first = all[i];
            const firstTokens = new Set(normalize(first && first.questionEnglish).split(" ").filter(function (token) { return token.length > 2; }));
            if (firstTokens.size < 8) continue;
            for (let j = i + 1; j < all.length; j += 1) {
                const second = all[j];
                const secondTokens = new Set(normalize(second && second.questionEnglish).split(" ").filter(function (token) { return token.length > 2; }));
                if (!secondTokens.size) continue;
                let common = 0;
                firstTokens.forEach(function (token) { if (secondTokens.has(token)) common += 1; });
                const score = common / (firstTokens.size + secondTokens.size - common);
                if (score >= 0.88) report.nearDuplicates.push({ first: first.id, second: second.id, similarityPercent: Math.round(score * 100) });
            }
        }
        report.validCount = report.modules.reduce(function (total, module) { return total + module.valid; }, 0);
        report.duplicateIds = report.errors.filter(function (item) { return item.reason.indexOf("duplicate question ID") === 0; }).length;
        report.exactDuplicates = report.warnings.filter(function (item) { return item.reason.indexOf("duplicate normalized question text") === 0; }).length;
        report.automatedLimit = "Automated checks cannot prove one defensible answer; semantic ambiguity and translation need subject-matter review.";
        return report;
    }

    global.OLEVEL_QUESTION_UTILS = {
        validate: validate,
        validateQuestion: validateQuestion,
        normalize: normalize,
        normalizeDifficulty: normalizeDifficulty,
        filterQuestions: filterQuestions,
        selectQuestions: selectQuestions
    };
}(window));
