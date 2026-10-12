(function () {
    "use strict";

    const catalog = window.OLEVEL_CATALOG || [];
    const chapters = document.getElementById("chapter-cards");
    const papers = document.getElementById("paper-cards");
    const homeModules = document.getElementById("home-modules");

    function linkFor(paper, mode) {
        return "olevel-test.html?paper=" + encodeURIComponent(paper.shortCode) + "&mode=" + encodeURIComponent(mode);
    }

    const moduleIllustrations = [
        '<svg viewBox="0 0 80 64" aria-hidden="true"><rect x="23" y="17" width="34" height="30" rx="5"/><path d="M31 25h18M31 31h18M31 37h8M40 9v8M40 47v8M15 32h8M57 32h8M21 18l-6-6M59 18l6-6M21 46l-6 6M59 46l6 6"/></svg>',
        '<svg viewBox="0 0 80 64" aria-hidden="true"><path d="m27 19-13 13 13 13M53 19l13 13-13 13M46 13 34 51"/><rect x="7" y="8" width="66" height="48" rx="9"/></svg>',
        '<svg viewBox="0 0 80 64" aria-hidden="true"><path d="M22 20c0-6 5-11 11-11h8v12h8c6 0 11 5 11 11v13c0 6-5 11-11 11H22c-6 0-11-5-11-11V31c0-6 5-11 11-11z"/><circle cx="26" cy="35" r="3"/><circle cx="49" cy="35" r="3"/><path d="M24 46h24"/></svg>',
        '<svg viewBox="0 0 80 64" aria-hidden="true"><rect x="24" y="16" width="32" height="32" rx="5"/><path d="M31 24h18v16H31zM40 8v8M40 48v8M16 32h8M56 32h8M22 20l-6-6M58 20l6-6M22 44l-6 6M58 44l6 6"/><circle cx="40" cy="32" r="4"/></svg>'
    ];

    if (homeModules) {
        catalog.forEach(function (paper, index) {
            const card = document.createElement("article");
            card.className = "module-card module-accent-" + (index + 1);

            const art = document.createElement("div");
            art.className = "module-art";
            art.setAttribute("aria-hidden", "true");
            art.innerHTML = moduleIllustrations[index];

            const code = document.createElement("span");
            code.className = "module-code";
            code.textContent = "Paper " + (index + 1) + " · " + paper.code;

            const title = document.createElement("h3");
            title.textContent = paper.title;

            const description = document.createElement("p");
            description.textContent = paper.description;

            const link = document.createElement("a");
            link.className = "module-link";
            link.href = linkFor(paper, "chapter");
            link.textContent = "Explore Module";
            link.setAttribute("aria-label", "Explore Paper " + (index + 1) + " — " + paper.title);

            card.append(art, code, title, description, link);
            homeModules.appendChild(card);
        });
    }

    if (!chapters || !papers) return;
    catalog.forEach(function (paper, index) {
        const chapterCard = document.createElement("article");
        chapterCard.className = "paper-card module-accent-" + (index + 1);
        chapterCard.innerHTML =
            '<div class="module-art" aria-hidden="true">' + moduleIllustrations[index] + '</div>' +
            '<span class="paper-code">' + paper.code + '</span>' +
            '<h3>' + paper.title + '</h3>' +
            '<p>' + paper.description + '</p>' +
            '<details><summary>Chapters and syllabus topics</summary><ul>' +
            paper.chapters.map(function (chapter) {
                return "<li><strong>" + chapter.title + "</strong><ul>" +
                    chapter.topics.map(function (topic) { return "<li>" + topic + "</li>"; }).join("") +
                    "</ul></li>";
            }).join("") +
            '</ul></details>' +
            '<a class="button" href="' + linkFor(paper, "chapter") + '">Choose chapter / mixed chapters</a>';
        chapters.appendChild(chapterCard);

        const paperCard = document.createElement("article");
        paperCard.className = "paper-card paper-card-accent module-accent-" + (index + 1);
        paperCard.innerHTML =
            '<div class="module-art" aria-hidden="true">' + moduleIllustrations[index] + '</div>' +
            '<span class="paper-code">' + paper.code + '</span>' +
            '<h3>' + paper.title + '</h3>' +
            '<p>' + paper.description + '</p>' +
            '<p class="exam-pattern">Official theory pattern: 100 MCQs · 100 marks · 120 minutes</p>' +
            '<a class="button" href="' + linkFor(paper, "paper") + '">Configure paper practice</a>' +
            '<a class="text-link" href="' + linkFor(paper, "mock") + '">Full mock test availability</a>';
        papers.appendChild(paperCard);
    });

    document.getElementById("coverage-note").textContent =
        "Question bank coverage is an initial original-question batch. Use the Bank report for exact module, chapter, difficulty and source counts. Available counts are shown before every test; no missing questions are filled from another chapter or paper.";
}());
