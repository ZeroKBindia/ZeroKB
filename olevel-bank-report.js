(function () {
    "use strict";

    const report = window.OLEVEL_QUESTION_UTILS.validate(window.OLEVEL_CATALOG, window.OLEVEL_BANKS);
    const summary = document.getElementById("report-summary");
    summary.textContent = report.validCount + " of " + report.totalLoaded + " loaded questions pass automated schema validation; " +
        report.errors.length + " validation error(s), " + report.duplicateIds + " duplicate ID(s), " +
        report.exactDuplicates + " exact normalized duplicate(s), " + report.nearDuplicates.length + " near-duplicate candidate(s), " +
        report.warnings.length + " warning(s).";
    const tables = document.getElementById("report-tables");

    function addTable(title, headers, rows) {
        const section = document.createElement("section");
        section.className = "panel";
        const heading = document.createElement("h2");
        heading.textContent = title;
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headers.forEach(function (header) {
            const cell = document.createElement("th");
            cell.scope = "col";
            cell.textContent = header;
            headerRow.appendChild(cell);
        });
        thead.appendChild(headerRow);
        const tbody = document.createElement("tbody");
        rows.forEach(function (row) {
            const tr = document.createElement("tr");
            row.forEach(function (value) {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.append(thead, tbody);
        section.append(heading, table);
        tables.appendChild(section);
    }

    function countsText(counts) {
        return Object.keys(counts).sort().map(function (key) { return key + ": " + counts[key]; }).join(" · ") || "—";
    }

    function chapterIssueCounts(module, chapter) {
        const paper = window.OLEVEL_CATALOG.find(function (entry) { return entry.code === module.id; });
        const questions = paper && window.OLEVEL_BANKS[paper.shortCode] || [];
        const questionIds = new Set(questions.filter(function (question) {
            return question && question.chapterId === chapter.id;
        }).map(function (question) { return question.id; }));
        const errors = report.errors.filter(function (item) { return questionIds.has(item.id); });
        function countMatching(prefix) {
            return errors.filter(function (item) { return item.reason.indexOf(prefix) === 0; }).length;
        }
        return {
            duplicateIds: countMatching("duplicate question ID"),
            exactDuplicates: countMatching("duplicate normalized question text"),
            missingOptions: countMatching("exactly four options required") + countMatching("option has missing"),
            missingAnswers: countMatching("invalid correct option ID"),
            missingChapters: countMatching("invalid chapter ID"),
            missingDifficulties: countMatching("invalid difficulty")
        };
    }

    addTable("Counts by module", ["Module", "Loaded", "Valid", "Difficulty", "Source type", "Correct answer positions A/B/C/D"], report.modules.map(function (module) {
        return [module.id, module.total, module.valid, countsText(module.difficulties), countsText(module.sources), module.answerPositions.join(" / ")];
    }));

    report.modules.forEach(function (module) {
        addTable("Chapter coverage — " + module.id, ["Chapter ID", "Chapter", "Loaded", "Valid", "Excluded by validation", "Difficulty", "Duplicate IDs", "Exact duplicates", "Missing options", "Missing answer keys", "Invalid chapter IDs", "Missing difficulty labels", "Source type"], module.chapters.map(function (chapter) {
            const issues = chapterIssueCounts(module, chapter);
            return [
                chapter.id, chapter.title, chapter.total, chapter.valid, chapter.total - chapter.valid,
                countsText(chapter.difficulties), issues.duplicateIds, issues.exactDuplicates, issues.missingOptions,
                issues.missingAnswers, issues.missingChapters, issues.missingDifficulties, countsText(chapter.sources)
            ];
        }));
    });

    document.getElementById("report-issues").textContent = JSON.stringify({
        errors: report.errors,
        warnings: report.warnings,
        nearDuplicateCandidates: report.nearDuplicates,
        semanticReview: report.automatedLimit
    }, null, 2);
}());
