(function () {
    "use strict";

    const params = new URLSearchParams(window.location.search);
    const shortCode = (params.get("paper") || "m1").toLowerCase();
    const requestedMode = params.get("mode") || "chapter";
    const catalog = window.OLEVEL_CATALOG || [];
    const paper = catalog.find(function (entry) { return entry.shortCode === shortCode; });
    const el = function (id) { return document.getElementById(id); };
    const HISTORY_LIMIT = 300;
    const ATTEMPT_LIMIT = 25;
    let bankReport = null;
    let bankLoaded = false;
    let historyStorageAvailable = true;
    const state = {
        questions: [],
        answers: [],
        current: 0,
        secondsLeft: 0,
        durationSeconds: 0,
        startedAt: 0,
        timer: null,
        submitted: false,
        historyKey: ""
    };

    function showError(message) {
        const box = el("load-error");
        box.textContent = message;
        box.hidden = false;
        el("setup").hidden = true;
    }

    if (!paper) {
        showError("Unknown O Level paper. Return to the dashboard and choose one of the four modules.");
        return;
    }

    el("paper-title").textContent = paper.code + " — " + paper.title;
    el("mode").value = ["chapter", "paper", "mock"].includes(requestedMode) ? requestedMode : "chapter";
    el("chapter").innerHTML = paper.chapters.map(function (chapter) {
        return '<option value="' + chapter.id + '">' + chapter.title + "</option>";
    }).join("");
    el("chapters").innerHTML = paper.chapters.map(function (chapter, index) {
        return '<label><input type="checkbox" value="' + chapter.id + '"' + (index === 0 ? " checked" : "") + "> " + chapter.title + "</label>";
    }).join("");

    const data = window.OLEVEL_BANKS && window.OLEVEL_BANKS[paper.shortCode];
    if (!Array.isArray(data)) {
        showError("The question bank for " + paper.code + " did not load. Check the four olevel-data-m*.js files and their case-sensitive paths.");
        return;
    }
    if (!window.OLEVEL_QUESTION_UTILS || typeof window.OLEVEL_QUESTION_UTILS.validate !== "function") {
        showError("The O Level question validator did not load. Check olevel-question-utils.js.");
        return;
    }
    bankReport = window.OLEVEL_QUESTION_UTILS.validate(catalog, window.OLEVEL_BANKS);
    const activeReport = bankReport.modules.find(function (module) { return module.id === paper.code; });
    const activeErrors = bankReport.errors.filter(function (item) { return item.id.indexOf(paper.shortCode.toUpperCase() + "-") === 0 || item.id === paper.code; });
    if (!activeReport) {
        el("diagnostics").textContent = JSON.stringify({ module: activeReport, errors: activeErrors, nearDuplicates: bankReport.nearDuplicates }, null, 2);
        showError("The " + paper.code + " question bank could not be validated. See diagnostics for details.");
        return;
    }
    bankLoaded = true;
    updateSetup();
    updateAvailability();

    function moduleQuestions() {
        return (window.OLEVEL_BANKS[paper.shortCode] || []).filter(function (question) {
            return question.moduleId === paper.code;
        });
    }

    function historyKey() {
        const chapters = selectedChapters().slice().sort().join(",");
        const difficulties = el("mode").value === "mock"
            ? "Easy,Hard,Moderate"
            : Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(function (input) { return input.value; }).sort().join(",");
        return "zerokb_olevel_attempts:" + paper.code + ":" + el("mode").value + ":" + chapters + ":" + difficulties;
    }

    function readHistory(key) {
        // localStorage is browser-local: attempt history does not sync across devices or browsers.
        try {
            const parsed = JSON.parse(window.localStorage.getItem(key) || "{}");
            return {
                recentIds: Array.isArray(parsed.recentIds) ? parsed.recentIds.slice(-HISTORY_LIMIT) : [],
                attempts: Array.isArray(parsed.attempts) ? parsed.attempts.slice(-ATTEMPT_LIMIT) : []
            };
        } catch (_error) {
            historyStorageAvailable = false;
            return { recentIds: [], attempts: [] };
        }
    }

    function writeHistory(key, history) {
        try {
            window.localStorage.setItem(key, JSON.stringify({
                recentIds: history.recentIds.slice(-HISTORY_LIMIT),
                attempts: history.attempts.slice(-ATTEMPT_LIMIT)
            }));
            historyStorageAvailable = true;
        } catch (_error) {
            historyStorageAvailable = false;
        }
    }

    function renderDiagnostics(chapterQuestions, filteredQuestions, history) {
        if (!bankReport) return;
        const module = bankReport.modules.find(function (entry) { return entry.id === paper.code; });
        const chosen = new Set(selectedChapters());
        const byChapter = module.chapters.filter(function (chapter) { return chosen.has(chapter.id); });
        const byDifficulty = {};
        filteredQuestions.forEach(function (question) {
            const difficulty = window.OLEVEL_QUESTION_UTILS.normalizeDifficulty(question.difficulty) || "Invalid";
            byDifficulty[difficulty] = (byDifficulty[difficulty] || 0) + 1;
        });
        const recent = new Set(history.recentIds);
        const selectedIds = new Set(chapterQuestions.map(function (question) { return question.id; }));
        const selectedErrors = bankReport.errors.filter(function (item) { return selectedIds.has(item.id); });
        const rejectedQuestions = chapterQuestions.map(function (question) {
            const reasons = window.OLEVEL_QUESTION_UTILS.validateQuestion(question, paper.code);
            if (selectedErrors.some(function (item) {
                return item.id === question.id && item.reason.indexOf("duplicate question ID") === 0;
            })) reasons.push("duplicate question ID");
            return reasons.length ? { id: question.id || "(missing ID)", chapterId: question.chapterId, reasons: reasons } : null;
        }).filter(Boolean);
        const report = {
            totalLoadedQuestionsAcrossModules: bankReport.totalLoaded,
            moduleId: paper.code,
            selectedModuleLoaded: module.total,
            selectedModuleTotal: module.total,
            selectedChapterIds: Array.from(chosen),
            selectedChapterTotals: byChapter.map(function (chapter) { return { id: chapter.id, title: chapter.title, total: chapter.total }; }),
            selectedChapterQuestionsBeforeDifficulty: chapterQuestions.length,
            selectedChapterQuestionsPassingRequiredValidation: chapterQuestions.length - rejectedQuestions.length,
            selectedDifficulties: Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(function (input) { return input.value; }),
            questionsAfterDifficultyFilter: filteredQuestions.length,
            finalAvailableUniqueQuestions: new Set(filteredQuestions.map(function (question) { return question.id; })).size,
            eligibleByDifficulty: byDifficulty,
            invalidOrRejectedQuestions: rejectedQuestions,
            validationErrorsInSelectedChapters: selectedErrors,
            unseenFromRecentAttempts: filteredQuestions.filter(function (question) { return !recent.has(question.id); }).length,
            recentAttemptCount: history.attempts.length,
            bankValidation: { valid: module.valid, invalid: bankReport.errors.filter(function (item) { return item.id.indexOf(paper.shortCode.toUpperCase() + "-") === 0; }).length },
            possibleNearDuplicates: bankReport.nearDuplicates.filter(function (pair) { return pair.first.indexOf(paper.shortCode.toUpperCase() + "-") === 0; })
        };
        el("diagnostics").textContent = JSON.stringify(report, null, 2);
    }

    function selectedChapters() {
        const mode = el("mode").value;
        if (mode === "paper" || mode === "mock") return paper.chapters.map(function (chapter) { return chapter.id; });
        if (el("chapter-mode").value === "single") return [el("chapter").value];
        return Array.from(el("chapters").querySelectorAll("input:checked")).map(function (input) { return input.value; });
    }

    function candidatesForSetup() {
        const difficulties = el("mode").value === "mock"
            ? ["Easy", "Moderate", "Hard"]
            : Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(function (input) { return input.value; });
        return window.OLEVEL_QUESTION_UTILS.filterQuestions(moduleQuestions(), {
            paperId: paper.code,
            chapterIds: selectedChapters(),
            difficulties: difficulties
        });
    }

    function requestedQuestionCount(available) {
        if (el("mode").value === "mock") return 100;
        const value = el("count").value;
        if (value === "all") return available;
        const allowedValues = Array.from(el("count").options).map(function (option) { return option.value; });
        const requested = Number(value);
        return allowedValues.includes(value) && Number.isInteger(requested) && requested > 0 ? requested : null;
    }

    function shortageDetails(candidates) {
        const selectedDifficulties = el("mode").value === "mock"
            ? ["Easy", "Moderate", "Hard"]
            : Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(function (input) { return input.value; });
        const chapters = selectedChapters().map(function (chapterId) {
            const chapterQuestions = candidates.filter(function (question) { return question.chapterId === chapterId; });
            const counts = selectedDifficulties.map(function (difficulty) {
                const normalized = window.OLEVEL_QUESTION_UTILS.normalizeDifficulty(difficulty);
                const count = chapterQuestions.filter(function (question) {
                    return window.OLEVEL_QUESTION_UTILS.normalizeDifficulty(question.difficulty) === normalized;
                }).length;
                return difficulty + " " + count;
            });
            return chapterTitle(chapterId) + ": " + chapterQuestions.length + " eligible (" + counts.join(", ") + ")";
        });
        return chapters.join("; ");
    }

    function updateSetup() {
        const mode = el("mode").value;
        const isChapter = mode === "chapter";
        const isMock = mode === "mock";
        el("chapter-mode-field").hidden = !isChapter;
        el("single-chapter-field").hidden = !isChapter || el("chapter-mode").value !== "single";
        el("mixed-chapters-field").hidden = !isChapter || el("chapter-mode").value !== "mix";
        el("difficulty-field").hidden = isMock;
        el("count-field").hidden = isMock;
        el("duration-field").hidden = isMock;
        el("setup-message").textContent = isMock
            ? "Full mock pattern: exactly 100 questions, 100 marks and 120 minutes. A mock starts only when 100 validated questions are available for this paper."
            : "Questions are original bilingual practice items. Chapter-wise tests default to Moderate and Hard; add Easy only if you choose it. Selection never crosses paper boundaries.";
        if (isMock) {
            el("count").value = "100";
            el("duration").value = "120";
        }
        updateAvailability();
    }

    function updateAvailability() {
        if (!window.OLEVEL_BANKS || !window.OLEVEL_BANKS[paper.shortCode]) return;
        if (!bankLoaded) return;
        const candidates = candidatesForSetup();
        const count = candidates.length;
        const mode = el("mode").value;
        const desired = requestedQuestionCount(count);
        const isMockReady = count >= 100;
        const selectedChapterIds = selectedChapters();
        const chapterQuestions = moduleQuestions().filter(function (question) { return selectedChapterIds.indexOf(question.chapterId) !== -1; });
        const history = readHistory(historyKey());
        const unseenCount = candidates.filter(function (question) { return !history.recentIds.includes(question.id); }).length;
        let message;
        if (mode === "mock") {
            message = "Validated module bank: " + moduleQuestions().length + "; eligible at selected difficulties: " + count + ". " +
                (isMockReady ? "100-question mock available." : "A full mock needs 100 unique eligible questions; no filler or cross-module questions are used.");
        } else if (!count) {
            message = "No questions match the selected module, chapter(s), and difficulty. The selected difficulty is not changed automatically.";
        } else if (desired === null) {
            message = "Invalid question count. Choose one of the available positive question counts.";
        } else {
            message = "Diagnostics — module: " + paper.code + " (" + moduleQuestions().length + " total); selected chapter(s): " + chapterQuestions.length +
                "; after difficulty filter: " + count + "; final unique availability: " + count + ". Requested: " + desired + ". ";
            if (count < desired) message += "Short by " + (desired - count) + ". " + shortageDetails(candidates) +
                ". This test cannot start with fewer than requested; choose All available or a lower count. ";
            if (unseenCount < Math.min(desired, count)) message += "Recent-attempt history leaves " + unseenCount + " unseen; repeats may be needed for the requested count.";
        }
        if (!historyStorageAvailable) message += " Attempt history is unavailable in this browser; random selection still works, but recent-repeat avoidance is off.";
        el("availability").textContent = message;
        renderDiagnostics(chapterQuestions, candidates, history);
        const insufficient = desired !== null && count < desired;
        el("start").disabled = count === 0 || desired === null || insufficient || (mode === "mock" && !isMockReady);
        el("start").textContent = mode === "mock" && !isMockReady ? "Full mock not available yet"
            : count === 0 ? "No matching questions"
                : insufficient ? "Not enough eligible questions" : "Start test";
    }

    function shuffle(items) {
        const result = items.slice();
        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }
        return result;
    }

    function startTest() {
        const mode = el("mode").value;
        const selected = candidatesForSetup();
        if (!selected.length) {
            el("availability").textContent = "No questions match this paper, chapter and difficulty selection. Choose a different selection; no questions from another chapter or paper will be inserted.";
            return;
        }
        const requested = requestedQuestionCount(selected.length);
        if (requested === null || requested < 1) {
            el("availability").textContent = "Invalid question count. Choose one of the available positive question counts.";
            return;
        }
        if (mode === "mock" && selected.length < 100) {
            el("availability").textContent = "This selected paper has only " + selected.length + " eligible questions. A full mock requires exactly 100 distinct validated questions.";
            return;
        }
        if (selected.length < requested) {
            el("availability").textContent = "Requested " + requested + " questions, but only " + selected.length +
                " unique valid questions are eligible (short by " + (requested - selected.length) + "). Paper " +
                paper.code + " — " + shortageDetails(selected) +
                ". No test was started; choose All available or a lower question count.";
            updateAvailability();
            return;
        }

        const key = historyKey();
        const history = readHistory(key);
        const eligibleCount = requested;
        const unseenCount = selected.filter(function (question) { return !history.recentIds.includes(question.id); }).length;
        if (unseenCount < eligibleCount && history.recentIds.length > 0 &&
            !window.confirm("Only " + unseenCount + " unseen question(s) remain in the recent-attempt window. Continue with repeats if needed?")) return;

        state.questions = window.OLEVEL_QUESTION_UTILS.selectQuestions(selected, eligibleCount, history.recentIds).map(function (question) {
            return Object.assign({}, question, { options: shuffle(question.options) });
        });
        if (state.questions.length !== requested) {
            el("availability").textContent = "Question selection failed: expected " + requested + " questions from " + selected.length + " eligible question(s), but generated " + state.questions.length + ". No test was started.";
            return;
        }
        if (mode === "mock" && state.questions.length !== 100) {
            el("availability").textContent = "Full mock validation failed: expected 100 unique questions but found " + state.questions.length + ".";
            return;
        }
        if (new Set(state.questions.map(function (question) { return question.id; })).size !== state.questions.length) {
            el("availability").textContent = "Question selection validation failed: duplicate question IDs were selected. No test was started.";
            return;
        }
        state.historyKey = key;
        history.recentIds = history.recentIds.concat(state.questions.map(function (question) { return question.id; })).slice(-HISTORY_LIMIT);
        history.attempts.push({ at: new Date().toISOString(), questionIds: state.questions.map(function (question) { return question.id; }) });
        writeHistory(key, history);
        state.answers = new Array(state.questions.length).fill(null);
        state.current = 0;
        state.submitted = false;
        state.durationSeconds = Number(mode === "mock" ? 120 : el("duration").value) * 60;
        state.secondsLeft = state.durationSeconds;
        state.startedAt = Date.now();
        el("setup").hidden = true;
        el("active-test").hidden = false;
        drawPalette();
        showQuestion();
        updateTimer();
        state.timer = window.setInterval(function () {
            state.secondsLeft -= 1;
            updateTimer();
            if (state.secondsLeft <= 0) finishTest(true);
        }, 1000);
    }

    function drawPalette() {
        const palette = el("palette");
        palette.replaceChildren();
        state.questions.forEach(function (_question, index) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = String(index + 1);
            button.setAttribute("aria-label", "Go to question " + (index + 1) + (state.answers[index] === null ? ", unanswered" : ", answered"));
            button.addEventListener("click", function () { state.current = index; showQuestion(); });
            palette.appendChild(button);
        });
        updatePalette();
    }

    function updatePalette() {
        Array.from(el("palette").children).forEach(function (button, index) {
            button.classList.toggle("current", index === state.current);
            button.classList.toggle("attempted", state.answers[index] !== null);
            button.setAttribute("aria-current", index === state.current ? "step" : "false");
            button.setAttribute("aria-label", "Go to question " + (index + 1) + (state.answers[index] === null ? ", unanswered" : ", attempted"));
        });
    }

    function showQuestion() {
        const question = state.questions[state.current];
        el("progress").textContent = "Question " + (state.current + 1) + " of " + state.questions.length;
        el("question-meta").textContent = paper.code + " · " + chapterTitle(question.chapterId) + " · " + question.difficulty;
        el("question-en").textContent = question.questionEnglish || question.questionHindi || "Question text unavailable";
        el("question-hi").textContent = question.questionHindi || question.questionEnglish || "प्रश्न उपलब्ध नहीं है";
        const options = el("options");
        options.replaceChildren();
        question.options.forEach(function (option, index) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "option" + (state.answers[state.current] === option.id ? " selected" : "");
            const letter = document.createElement("span");
            letter.className = "option-letter";
            letter.textContent = String.fromCharCode(65 + index);
            const text = document.createElement("span");
            text.textContent = (option.en || option.hi) + (option.en && option.hi && option.en !== option.hi ? " / " + option.hi : "");
            button.append(letter, text);
            button.addEventListener("click", function () {
                if (state.submitted) return;
                state.answers[state.current] = option.id;
                showQuestion();
            });
            options.appendChild(button);
        });
        el("previous").disabled = state.current === 0;
        el("next").disabled = state.current === state.questions.length - 1;
        updatePalette();
    }

    function chapterTitle(chapterId) {
        const chapter = paper.chapters.find(function (entry) { return entry.id === chapterId; });
        return chapter ? chapter.title : "Unknown chapter";
    }

    function updateTimer() {
        const seconds = Math.max(0, state.secondsLeft);
        const minutesText = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secondsText = String(seconds % 60).padStart(2, "0");
        el("timer").textContent = "Time left " + minutesText + ":" + secondsText;
    }

    function finishTest(automatic, alreadyConfirmed) {
        if (state.submitted) return;
        if (!automatic && !alreadyConfirmed && !window.confirm("Submit this test now? You will not be able to change answers after submission.")) return;
        state.submitted = true;
        window.clearInterval(state.timer);
        const elapsedSeconds = Math.min(state.durationSeconds, Math.floor((Date.now() - state.startedAt) / 1000));
        const correct = state.questions.reduce(function (total, question, index) {
            return total + (state.answers[index] === question.correctOptionId ? 1 : 0);
        }, 0);
        const attempted = state.answers.filter(function (answer) { return answer !== null; }).length;
        const wrong = attempted - correct;
        const accuracy = attempted ? Math.round(correct / attempted * 100) : 0;
        const fmt = function (seconds) { return Math.floor(seconds / 60) + "m " + (seconds % 60) + "s"; };
        const stats = [
            ["Total questions", state.questions.length],
            ["Attempted", attempted],
            ["Unattempted", state.questions.length - attempted],
            ["Correct", correct],
            ["Wrong", wrong],
            ["Accuracy", accuracy + "%"],
            ["Time used", fmt(elapsedSeconds)],
            ["Score", correct + " / " + (state.questions.length === 100 ? "100" : state.questions.length)]
        ];
        el("result-stats").replaceChildren();
        stats.forEach(function (item) {
            const card = document.createElement("div");
            card.className = "stat";
            const value = document.createElement("strong");
            value.textContent = item[1];
            const label = document.createElement("span");
            label.textContent = item[0];
            card.append(value, label);
            el("result-stats").appendChild(card);
        });
        renderChapterStats();
        renderReviewLinks();
        renderReview("all");
        el("active-test").hidden = true;
        el("results").hidden = false;
        if (automatic) {
            const note = document.createElement("p");
            note.className = "notice";
            note.textContent = "Time expired. The test was submitted automatically.";
            el("result-stats").before(note);
        }
    }

    function renderChapterStats() {
        const host = el("chapter-results");
        host.replaceChildren();
        const results = new Map();
        state.questions.forEach(function (question, index) {
            const entry = results.get(question.chapterId) || { total: 0, correct: 0 };
            entry.total += 1;
            if (state.answers[index] === question.correctOptionId) entry.correct += 1;
            results.set(question.chapterId, entry);
        });
        results.forEach(function (entry, chapterId) {
            const line = document.createElement("p");
            line.textContent = chapterTitle(chapterId) + ": " + entry.correct + " correct of " + entry.total + " questions";
            host.appendChild(line);
        });
    }

    function renderReviewLinks() {
        const host = el("result-links");
        host.replaceChildren();
        [
            ["correct", "Correct Questions"],
            ["wrong", "Wrong Questions"],
            ["unanswered", "Unattempted Questions"],
            ["all", "Review All Answers"]
        ].forEach(function (item) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = item[1];
            button.addEventListener("click", function () { renderReview(item[0]); });
            host.appendChild(button);
        });
    }

    function renderReview(filter) {
        const host = el("review");
        host.replaceChildren();
        state.questions.forEach(function (question, index) {
            const selectedOptionId = state.answers[index];
            const selectedOption = question.options.find(function (option) { return option.id === selectedOptionId; });
            const correctOption = question.options.find(function (option) { return option.id === question.correctOptionId; });
            const kind = selectedOptionId === null ? "unanswered" : selectedOptionId === question.correctOptionId ? "correct" : "wrong";
            if (filter !== "all" && filter !== kind) return;
            const item = document.createElement("article");
            item.className = "review-item";
            const heading = document.createElement("h3");
            heading.textContent = "Q" + (index + 1) + " · " + chapterTitle(question.chapterId) + " · " + kind;
            const en = document.createElement("p");
            en.textContent = question.questionEnglish;
            const hi = document.createElement("p");
            hi.lang = "hi";
            hi.textContent = question.questionHindi || question.questionEnglish || "प्रश्न उपलब्ध नहीं है";
            const list = document.createElement("ol");
            question.options.forEach(function (option) {
                const line = document.createElement("li");
                line.textContent = (option.en || option.hi) + (option.en && option.hi && option.en !== option.hi ? " / " + option.hi : "");
                if (option.id === question.correctOptionId) line.classList.add("correct");
                if (option.id === selectedOptionId) line.classList.add("selected");
                list.appendChild(line);
            });
            const response = document.createElement("p");
            response.textContent = selectedOptionId === null ? "Your answer: Unattempted" : "Your answer: " + (selectedOption.en || selectedOption.hi);
            const answer = document.createElement("p");
            answer.textContent = "Correct answer: " + (correctOption.en || correctOption.hi);
            const explanationEn = document.createElement("p");
            explanationEn.textContent = "Explanation: " + (question.explanationEnglish || question.explanationHindi || "Not provided");
            const explanationHi = document.createElement("p");
            explanationHi.lang = "hi";
            explanationHi.textContent = "व्याख्या: " + (question.explanationHindi || question.explanationEnglish || "उपलब्ध नहीं");
            item.append(heading, en, hi, list, response, answer, explanationEn, explanationHi);
            host.appendChild(item);
        });
        if (!host.children.length) host.textContent = "No questions in this result category.";
    }

    el("mode").addEventListener("change", updateSetup);
    el("chapter-mode").addEventListener("change", updateSetup);
    el("chapter").addEventListener("change", updateAvailability);
    el("chapters").addEventListener("change", updateAvailability);
    el("count").addEventListener("change", updateAvailability);
    document.querySelectorAll('input[name="difficulty"]').forEach(function (input) { input.addEventListener("change", updateAvailability); });
    el("start").addEventListener("click", startTest);
    el("previous").addEventListener("click", function () { if (state.current > 0) { state.current -= 1; showQuestion(); } });
    el("next").addEventListener("click", function () { if (state.current < state.questions.length - 1) { state.current += 1; showQuestion(); } });
    el("save-next").addEventListener("click", function () {
        if (state.current < state.questions.length - 1) { state.current += 1; showQuestion(); }
        else if (window.confirm("You are on the last question. Submit the test?")) finishTest(false, true);
    });
    el("submit").addEventListener("click", function () { finishTest(false); });
    el("toggle-palette").addEventListener("click", function () {
        const palette = el("palette");
        palette.hidden = !palette.hidden;
        this.textContent = palette.hidden ? "Show question palette" : "Hide question palette";
        this.setAttribute("aria-expanded", String(!palette.hidden));
    });
}());
