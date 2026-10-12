(function (global) {
    const categories = {
        right: { title: "Right Questions / सही प्रश्न", stat: "Correct" },
        wrong: { title: "Wrong Questions / गलत प्रश्न", stat: "Wrong" },
        unattempted: { title: "Unattempted Questions / छोड़े गए प्रश्न", stat: "Unattempted" }
    };

    function answerText(question, answer) {
        if (answer === null || answer === undefined) return "Not Attempted / प्रयास नहीं किया";
        const option = question.options[answer];
        if (typeof option === "string") return String.fromCharCode(65 + answer) + ". " + option;
        return String.fromCharCode(65 + answer) + ". " + option.en + " / " + option.hi;
    }

    function optionText(option) {
        if (typeof option === "string") return option;
        return option.en + " / " + option.hi;
    }

    function renderQuestion(question, index, answer, correctAnswer) {
        const article = document.createElement("article");
        article.className = "review-item category-review-item";
        const questionText = document.createElement("h3");
        questionText.textContent = (index + 1) + ". " + question.question;
        article.appendChild(questionText);

        if (question.questionHindi) {
            const hindiQuestion = document.createElement("p");
            hindiQuestion.className = "review-question-hindi";
            hindiQuestion.textContent = question.questionHindi;
            article.appendChild(hindiQuestion);
        } else {
            questionText.style.whiteSpace = "pre-line";
        }

        const options = document.createElement("ol");
        options.className = "review-options";
        question.options.forEach(function (option, optionIndex) {
            const item = document.createElement("li");
            item.className = "review-option";
            if (optionIndex === correctAnswer) item.classList.add("is-correct");
            if (optionIndex === answer) item.classList.add("is-selected");
            item.textContent = String.fromCharCode(65 + optionIndex) + ". " + optionText(option);
            if (optionIndex === correctAnswer) item.append(" - Correct answer / सही उत्तर");
            if (optionIndex === answer) item.append(" - Your answer / आपका उत्तर");
            options.appendChild(item);
        });
        article.appendChild(options);

        const selectedAnswer = document.createElement("p");
        selectedAnswer.textContent = "Your Answer / आपका उत्तर: " + answerText(question, answer);
        const correctAnswerText = document.createElement("p");
        correctAnswerText.className = "review-correct-answer";
        correctAnswerText.textContent = "Correct Answer / सही उत्तर: " + answerText(question, correctAnswer);
        const explanation = document.createElement("p");
        explanation.textContent = "Explanation / व्याख्या: " + (question.explanation || "Explanation is not available for this question. / इस प्रश्न का explanation उपलब्ध नहीं है।");
        article.append(selectedAnswer, correctAnswerText, explanation);
        return article;
    }

    function attach(stats, questions, answers, correctAnswerKey) {
        const review = document.createElement("section");
        review.className = "category-review";
        review.id = "category-review";
        review.hidden = true;

        const heading = document.createElement("h3");
        heading.className = "category-review-title";
        const backButton = document.createElement("button");
        backButton.type = "button";
        backButton.className = "secondary category-review-back";
        backButton.textContent = "Back to Result / परिणाम पर वापस जाएँ";
        const list = document.createElement("div");
        list.className = "category-review-list";
        review.append(heading, backButton, list);

        const cards = {};
        Array.from(stats.children).forEach(function (stat) {
            const label = stat.querySelector("span");
            const value = stat.querySelector("strong");
            if (!label || !value) return;
            const key = Object.keys(categories).find(function (categoryKey) {
                return categories[categoryKey].stat === label.textContent;
            });
            if (!key) return;

            const card = document.createElement("button");
            card.type = "button";
            card.className = "result-category";
            card.setAttribute("aria-controls", review.id);
            card.append(value, label);
            label.textContent = categories[key].title;
            stat.replaceWith(card);
            cards[key] = card;

            card.addEventListener("click", function () {
                const matches = questions.map(function (question, index) {
                    const answer = answers[index];
                    const correctAnswer = question[correctAnswerKey];
                    const isUnattempted = answer === null || answer === undefined;
                    const matchesCategory = key === "unattempted" ? isUnattempted :
                        key === "right" ? !isUnattempted && answer === correctAnswer :
                            !isUnattempted && answer !== correctAnswer;
                    return matchesCategory ? { question: question, index: index, answer: answer, correctAnswer: correctAnswer } : null;
                }).filter(Boolean);

                heading.textContent = categories[key].title + " (" + matches.length + ")";
                list.replaceChildren();
                if (matches.length) {
                    matches.forEach(function (match) {
                        list.appendChild(renderQuestion(match.question, match.index, match.answer, match.correctAnswer));
                    });
                } else {
                    const empty = document.createElement("p");
                    empty.className = "category-review-empty";
                    empty.textContent = "No questions in this category. / इस श्रेणी में कोई प्रश्न नहीं है।";
                    list.appendChild(empty);
                }
                review.hidden = false;
                review.scrollIntoView({ behavior: "smooth", block: "start" });
                backButton.focus({ preventScroll: true });
            });
        });

        backButton.addEventListener("click", function () {
            review.hidden = true;
            const focusedCard = Object.values(cards).find(function (card) { return card === document.activeElement; });
            (focusedCard || cards.right || cards.wrong || cards.unattempted).focus({ preventScroll: true });
        });

        return review;
    }

    global.ZeroKBQuestionReview = { attach: attach };
        function attachPalette(header, questionCard, questions, answers, getCurrentQuestion, navigateToQuestion) {
            const container = document.createElement("div");
            container.className = "question-palette";

            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "secondary question-palette-toggle";
            toggle.textContent = "Question Palette / Questions";
            toggle.setAttribute("aria-expanded", "false");

            const panel = document.createElement("section");
            panel.className = "question-palette-panel";
            panel.hidden = true;
            panel.setAttribute("aria-label", "Question Palette");

            const panelHeader = document.createElement("div");
            panelHeader.className = "question-palette-header";
            const title = document.createElement("h2");
            title.textContent = "Question Palette";
            const close = document.createElement("button");
            close.type = "button";
            close.className = "secondary question-palette-close";
            close.textContent = "Close";
            panelHeader.append(title, close);

            const grid = document.createElement("div");
            grid.className = "question-palette-grid";
            grid.setAttribute("role", "group");
            grid.setAttribute("aria-label", "Questions");

            const legend = document.createElement("div");
            legend.className = "question-palette-legend";
            legend.innerHTML = '<span><i class="is-attempted"></i>Attempted</span><span><i class="is-unattempted"></i>Unattempted / Skipped</span>';
            panel.append(panelHeader, grid, legend);
            container.append(toggle, panel);
            header.appendChild(container);

            function closePalette() {
                panel.hidden = true;
                toggle.setAttribute("aria-expanded", "false");
            }

            function refresh() {
                const currentQuestion = getCurrentQuestion();
                grid.replaceChildren();
                questions.forEach(function (_question, index) {
                    const button = document.createElement("button");
                    const attempted = answers[index] !== null && answers[index] !== undefined;
                    button.type = "button";
                    button.className = "question-palette-number " + (attempted ? "is-attempted" : "is-unattempted");
                    if (index === currentQuestion) button.classList.add("is-current");
                    button.textContent = String(index + 1);
                    button.setAttribute("aria-label", "Question " + (index + 1) + (attempted ? ", Attempted" : ", Unattempted"));
                    if (index === currentQuestion) button.setAttribute("aria-current", "step");
                    button.addEventListener("click", function () {
                        closePalette();
                        navigateToQuestion(index);
                    });
                    grid.appendChild(button);
                });
            }

            toggle.addEventListener("click", function () {
                panel.hidden = !panel.hidden;
                toggle.setAttribute("aria-expanded", String(!panel.hidden));
                if (!panel.hidden) refresh();
            });
            close.addEventListener("click", closePalette);
            questionCard.addEventListener("change", refresh);
            refresh();
            return { refresh: refresh };
        }

        global.ZeroKBQuestionReview = { attach: attach, attachPalette: attachPalette };
})(window);