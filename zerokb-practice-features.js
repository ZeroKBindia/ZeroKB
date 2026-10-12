(function (global) {
    const bookmarkKey = "zerokb_bookmarked_questions";
    const mistakeKey = "zerokb_my_mistakes";
    const catalogKey = "zerokb_question_catalog_v1";
    const subjects = [
        { id: "computer-fundamentals", name: "Computer Fundamentals" },
        { id: "operating-system", name: "Operating System" },
        { id: "word-processing", name: "Word Processing" },
        { id: "spreadsheet", name: "Spreadsheet" },
        { id: "internet-email", name: "Internet & E-mail" },
        { id: "digital-financial-services", name: "Digital & Financial Services" },
        { id: "cyber-security", name: "Cyber Security" },
        { id: "future-skills", name: "Future Skills" }
    ];

    function read(key, fallback) {
        try {
            const value = global.localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (_error) {
            return fallback;
        }
    }

    function write(key, value) {
        try {
            global.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (_error) {
            return false;
        }
    }

    function questionText(question) {
        const raw = question.question || "";
        const parts = raw.split("\n");
        return {
            english: parts[0],
            hindi: question.questionHindi || parts.slice(1).join(" ")
        };
    }

    function getId(subjectId, index) {
        return subjectId + ":" + index;
    }

    function getCatalog() {
        const catalog = read(catalogKey, {});
        return catalog && typeof catalog === "object" ? catalog : {};
    }

    function register(subjectId, questions) {
        const catalog = getCatalog();
        catalog[subjectId] = questions.map(function (question, index) {
            const text = questionText(question);
            return {
                id: getId(subjectId, index),
                index: index,
                question: text.english,
                questionHindi: text.hindi,
                options: question.options,
                correctAnswer: question.correctAnswer === undefined ? question.answer : question.correctAnswer,
                explanation: question.explanation || "",
                topic: question.topic || ""
            };
        });
        write(catalogKey, catalog);
    }

    function findQuestion(id) {
        const separator = id.lastIndexOf(":");
        if (separator < 1) return null;
        const subjectId = id.slice(0, separator);
        const index = Number(id.slice(separator + 1));
        const list = getCatalog()[subjectId];
        return list && list[index] ? { question: list[index], subjectId: subjectId } : null;
    }

    function optionText(option) {
        if (typeof option === "string") return option;
        return option.en + " / " + option.hi;
    }

    function subjectName(id) {
        const subject = subjects.find(function (item) { return item.id === id; });
        return subject ? subject.name : id;
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function addFeatureNavigation() {
        const topbar = document.querySelector(".topbar");
        if (!topbar || topbar.querySelector(".practice-feature-links")) return;
        const nav = createElement("nav", "practice-feature-links");
        nav.setAttribute("aria-label", "Practice tools");
        const saved = createElement("a", "", "🔖 My Saved Questions");
        saved.href = "my-questions.html?view=saved";
        const mistakes = createElement("a", "", "❌ My Mistakes");
        mistakes.href = "my-questions.html?view=mistakes";
        nav.append(saved, mistakes);
        topbar.appendChild(nav);
    }

    function attach(config) {
        register(config.subjectId, config.questions);
        addFeatureNavigation();

        const button = createElement("button", "bookmark-toggle", "🔖 Save Question");
        button.type = "button";
        button.setAttribute("aria-pressed", "false");
        config.header.appendChild(button);

        function refreshBookmark() {
            const id = getId(config.subjectId, config.getCurrentQuestion());
            const saved = read(bookmarkKey, []);
            const isSaved = saved.indexOf(id) !== -1;
            button.textContent = isSaved ? "🔖 Saved" : "🔖 Save Question";
            button.setAttribute("aria-pressed", String(isSaved));
        }

        button.addEventListener("click", function () {
            const id = getId(config.subjectId, config.getCurrentQuestion());
            const saved = read(bookmarkKey, []);
            const position = saved.indexOf(id);
            if (position === -1) saved.push(id);
            else saved.splice(position, 1);
            write(bookmarkKey, saved);
            refreshBookmark();
        });

        config.questionCard.addEventListener("change", refreshBookmark);
        const numberElement = config.questionNumber || document.getElementById("question-number");
        if (numberElement) {
            const numberObserver = new MutationObserver(refreshBookmark);
            numberObserver.observe(numberElement, { childList: true, characterData: true, subtree: true });
        }
        global.addEventListener("storage", function (event) {
            if (event.key === bookmarkKey) refreshBookmark();
        });
        refreshBookmark();
    }

    function recordSubmission(subjectId, questions, answers, answerKey) {
        const mistakes = read(mistakeKey, {});
        questions.forEach(function (question, index) {
            const answer = answers[index];
            const correctAnswer = question[answerKey];
            if (answer === null || answer === undefined || answer === correctAnswer) return;
            const id = getId(subjectId, index);
            const existing = mistakes[id] || { id: id, count: 0 };
            existing.count += 1;
            existing.lastAnswer = answer;
            existing.updatedAt = Date.now();
            mistakes[id] = existing;
        });
        write(mistakeKey, mistakes);
    }

    function openQuestion(entry, subjectId, mistake) {
        const question = entry.question;
        const dialog = createElement("dialog", "practice-question-dialog");
        const title = createElement("h2", "", "Question " + (question.index + 1) + " / " + subjectName(subjectId));
        const english = createElement("p", "saved-question-english", question.question);
        const hindi = createElement("p", "saved-question-hindi", question.questionHindi);
        const options = createElement("ol", "saved-question-options");
        question.options.forEach(function (option, index) {
            const item = createElement("li", "", String.fromCharCode(65 + index) + ". " + optionText(option));
            if (index === question.correctAnswer) item.classList.add("is-correct");
            options.appendChild(item);
        });
        const explanation = createElement("p", "saved-question-explanation", "Explanation / व्याख्या: " + (question.explanation || "उपलब्ध नहीं है।"));
        const savedButton = createElement("button", "secondary", "🔖 Save Question");
        savedButton.type = "button";
        function refreshSaved() {
            savedButton.textContent = read(bookmarkKey, []).indexOf(question.id) !== -1 ? "🔖 Saved" : "🔖 Save Question";
        }
        savedButton.addEventListener("click", function () {
            const bookmarks = read(bookmarkKey, []);
            const index = bookmarks.indexOf(question.id);
            if (index === -1) bookmarks.push(question.id);
            else bookmarks.splice(index, 1);
            write(bookmarkKey, bookmarks);
            refreshSaved();
        });

        const practiceArea = createElement("div", "saved-practice-area");
        const practiceOptions = createElement("div", "saved-practice-options");
        const feedback = createElement("p", "saved-practice-feedback");
        const checkButton = createElement("button", "", "Check Answer");
        checkButton.type = "button";
        question.options.forEach(function (option, index) {
            const label = createElement("label", "option");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "saved-practice-answer";
            radio.value = String(index);
            const text = createElement("span", "", String.fromCharCode(65 + index) + ". " + optionText(option));
            label.append(radio, text);
            practiceOptions.appendChild(label);
        });
        checkButton.addEventListener("click", function () {
            const selected = practiceOptions.querySelector("input:checked");
            if (!selected) {
                feedback.textContent = "पहले एक विकल्प चुनें।";
                return;
            }
            feedback.textContent = Number(selected.value) === question.correctAnswer ?
                "Correct / सही उत्तर" : "Incorrect / गलत उत्तर. Correct answer: " + optionText(question.options[question.correctAnswer]);
        });
        practiceArea.append(practiceOptions, checkButton, feedback);

        const actions = createElement("div", "actions");
        const closeButton = createElement("button", "secondary", "Close");
        closeButton.type = "button";
        closeButton.addEventListener("click", function () { dialog.close(); });
        actions.append(savedButton, closeButton);
        const content = [title, english, hindi, options];
        if (mistake && mistake.lastAnswer !== undefined) {
            content.push(createElement("p", "", "Your previous answer / आपका पिछला उत्तर: " + optionText(question.options[mistake.lastAnswer])));
        }
        content.push(explanation, practiceArea, actions);
        dialog.append.apply(dialog, content);
        dialog.addEventListener("close", function () { dialog.remove(); });
        document.body.appendChild(dialog);
        refreshSaved();
        dialog.showModal();
    }

    function buildList() {
        const params = new URLSearchParams(global.location.search);
        const view = params.get("view") === "mistakes" ? "mistakes" : "saved";
        const isMistakes = view === "mistakes";
        const list = document.getElementById("question-list");
        const count = document.getElementById("question-count");
        const filter = document.getElementById("subject-filter");
        const clearButton = document.getElementById("clear-mistakes");

        document.title = "ZeroKB | " + (isMistakes ? "My Mistakes" : "My Saved Questions");
        document.getElementById("page-title").textContent = isMistakes ? "❌ My Mistakes" : "🔖 My Saved Questions";
        document.getElementById("saved-tab").setAttribute("aria-current", isMistakes ? "false" : "page");
        document.getElementById("mistakes-tab").setAttribute("aria-current", isMistakes ? "page" : "false");
        clearButton.hidden = !isMistakes;

        subjects.forEach(function (subject) {
            const option = document.createElement("option");
            option.value = subject.id;
            option.textContent = subject.name;
            filter.appendChild(option);
        });

        function refresh() {
            const records = isMistakes ? read(mistakeKey, {}) : read(bookmarkKey, []);
            const ids = isMistakes ? Object.keys(records) : records;
            const selectedSubject = filter.value;
            const visible = ids.map(function (id) {
                const found = findQuestion(id);
                if (!found || (selectedSubject && found.subjectId !== selectedSubject)) return null;
                return { id: id, question: found.question, subjectId: found.subjectId, mistake: isMistakes ? records[id] : null };
            }).filter(Boolean);
            count.textContent = (isMistakes ? "Questions to Improve: " : "Saved Questions: ") + visible.length;
            list.replaceChildren();
            if (!visible.length) {
                const empty = createElement("p", "saved-empty", isMistakes ?
                    "अभी कोई गलत attempted question नहीं है।" : "अभी कोई question save नहीं किया गया है।");
                const hint = createElement("p", "saved-empty-hint", isMistakes ?
                    "Quiz submit करने पर केवल attempted गलत प्रश्न यहाँ दिखाई देंगे।" :
                    "Practice करते समय difficult question को 🔖 Save कर सकते हैं।");
                list.append(empty, hint);
                return;
            }

            visible.forEach(function (record) {
                const card = createElement("article", "saved-question-card");
                const heading = createElement("h2", "", "Question " + (record.question.index + 1));
                const subject = createElement("p", "saved-question-subject", subjectName(record.subjectId) + (record.question.topic ? " · " + record.question.topic : ""));
                const english = createElement("p", "", record.question.question);
                const hindi = createElement("p", "saved-question-hindi", record.question.questionHindi);
                const button = createElement("button", "", isMistakes ? "Practice Again" : "Open Question");
                button.type = "button";
                button.addEventListener("click", function () { openQuestion(record, record.subjectId, record.mistake); });
                card.append(heading, subject, english, hindi);
                if (record.mistake) {
                    const options = createElement("ol", "saved-question-options");
                    record.question.options.forEach(function (option, index) {
                        const item = createElement("li", "", String.fromCharCode(65 + index) + ". " + optionText(option));
                        if (index === record.question.correctAnswer) item.classList.add("is-correct");
                        options.appendChild(item);
                    });
                    const answer = record.mistake.lastAnswer;
                    card.append(
                        options,
                        createElement("p", "", "Your Answer: " + (answer === undefined ? "Not recorded" : optionText(record.question.options[answer]))),
                        createElement("p", "review-correct-answer", "Correct Answer: " + optionText(record.question.options[record.question.correctAnswer])),
                        createElement("p", "", "Explanation: " + (record.question.explanation || "उपलब्ध नहीं है।")),
                        createElement("p", "mistake-count", "Mistaken: " + record.mistake.count + " times")
                    );
                }
                card.appendChild(button);
                list.appendChild(card);
            });
        }

        filter.addEventListener("change", refresh);
        clearButton.addEventListener("click", function () {
            if (!global.confirm("क्या आप सभी saved mistakes हटाना चाहते हैं?")) return;
            write(mistakeKey, {});
            refresh();
        });
        global.addEventListener("storage", function (event) {
            if ([bookmarkKey, mistakeKey, catalogKey].indexOf(event.key) !== -1) refresh();
        });
        refresh();
    }

    global.ZeroKBPracticeFeatures = {
        attach: attach,
        recordSubmission: recordSubmission,
        buildList: buildList
    };
})(window);