(function () {
    "use strict";

    const header = document.querySelector(".topbar");
    if (!header || document.body.classList.contains("zkb-dashboard-active")) return;
    document.body.classList.add("zkb-dashboard-active");

    const create = function (tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    };
    const routes = [
        { key: "home", label: "Home", icon: "⌂", href: "index.html#top", aliases: ["#top", "index.html", "index.html#top"] },
        { key: "ccc", label: "CCC", icon: "▣", href: "ccc.html", aliases: ["ccc.html"] },
        { key: "olevel", label: "O Level", icon: "◇", href: "olevel.html", aliases: ["olevel.html"] },
        { key: "mock", label: "Mock Tests", icon: "◷", href: "olevel.html#papers", aliases: ["olevel.html#papers"] },
        { key: "practice", label: "Practice Tests", icon: "◎", href: "olevel.html#chapter-tests", aliases: ["olevel.html#chapter-tests"] },
        { key: "study", label: "Study Materials", icon: "▧", href: "ccc.html#study-material", aliases: ["ccc.html#study-material"] },
        { key: "results", label: "Customize Test", icon: "⚙", href: "customize-test.html", aliases: ["customize-test.html"] }
    ];
    const subjects = [
        { label: "Computer Fundamentals", href: "practice-computer.html" },
        { label: "Operating System", href: "practice-operating-system.html" },
        { label: "Word Processing", href: "practice-word-processing.html" },
        { label: "Spreadsheet", href: "practice-spreadsheet.html" },
        { label: "Internet & E-mail", href: "practice-internet-email.html" },
        { label: "Digital Financial Services", href: "practice-digital-financial-services.html" },
        { label: "Cyber Security", href: "practice-cyber-security.html" },
        { label: "Future Skills", href: "practice-future-skills.html" }
    ];
    const normalize = function (href) {
        const url = new URL(href, window.location.href);
        return url.pathname.toLowerCase() + url.search + url.hash;
    };
    const legacyAnchors = Array.from(header.querySelectorAll("nav a"));
    const routeAliases = new Map();
    legacyAnchors.forEach(function (anchor) {
        routeAliases.set(normalize(anchor.getAttribute("href")), anchor);
    });

    const sidebar = create("aside", "zkb-sidebar");
    sidebar.setAttribute("aria-label", "Main navigation");
    const sidebarBrand = create("div", "zkb-sidebar-brand");
    sidebarBrand.append(create("span", "zkb-sidebar-mark", "Z"), create("span", "", "Learning paths"));
    sidebar.appendChild(sidebarBrand);
    const sidebarNav = create("nav", "zkb-sidebar-nav");
    sidebarNav.setAttribute("aria-label", "Main navigation");
    const primaryGroup = create("div", "zkb-sidebar-group");
    primaryGroup.appendChild(create("p", "zkb-sidebar-heading", "LEARN"));

    function makeLink(route, existing) {
        const anchor = existing || create("a", "zkb-sidebar-link");
        if (!existing) anchor.href = route.href;
        anchor.classList.add("zkb-sidebar-link");
        anchor.dataset.navKey = route.key || "extra";
        const visibleLabel = route.label || (existing && existing.textContent.trim());
        const icon = create("span", "zkb-sidebar-icon", route.icon || "↗");
        icon.setAttribute("aria-hidden", "true");
        const label = create("span", "zkb-sidebar-label", visibleLabel || route.label);
        anchor.replaceChildren(icon, label);
        return anchor;
    }

    routes.forEach(function (route) {
        let existing;
        for (const alias of route.aliases) {
            existing = routeAliases.get(normalize(alias));
            if (existing) break;
        }
        primaryGroup.appendChild(makeLink(route, existing));
    });
    sidebarNav.appendChild(primaryGroup);
    sidebar.appendChild(sidebarNav);

    const search = create("div", "zkb-search");
    const searchLabel = create("label", "zkb-search-label");
    searchLabel.htmlFor = "zkb-site-search";
    searchLabel.setAttribute("aria-label", "Search ZeroKB");
    searchLabel.textContent = "⌕";
    const searchInput = document.createElement("input");
    searchInput.id = "zkb-site-search";
    searchInput.type = "search";
    searchInput.placeholder = "Search topics, questions, or anything...";
    searchInput.setAttribute("autocomplete", "off");
    const searchResults = create("div", "zkb-search-results");
    searchResults.hidden = true;
    searchResults.setAttribute("role", "listbox");
    search.append(searchLabel, searchInput, searchResults);
    const userControl = header.querySelector(".zkb-user-control");
    const userParent = userControl && userControl.parentElement.classList.contains("header-tools") ? userControl.parentElement : userControl;
    if (userParent) {
        header.insertBefore(search, userParent);
    }
    else header.appendChild(search);
    header.querySelectorAll("nav").forEach(function (nav) { nav.remove(); });

    const pageNodes = Array.from(document.body.children).filter(function (element) {
        return element !== header && !element.matches("script, style, link, dialog");
    });
    const layout = create("div", "zkb-dashboard-layout");
    const column = create("div", "zkb-page-column");
    pageNodes.forEach(function (element) { column.appendChild(element); });
    const isHome = Boolean(column.querySelector(".hero#top"));
    let infoColumn;
    if (isHome) {
        infoColumn = create("aside", "zkb-info-column");
        infoColumn.setAttribute("aria-label", "Profile and activity");
        layout.classList.add("has-info-column");
    }
    layout.append(sidebar, column);
    if (infoColumn) layout.appendChild(infoColumn);
    header.after(layout);

    const footer = column.querySelector("footer");
    if (footer && !footer.dataset.dashboardFooter) {
        const existingFooterText = footer.textContent.trim();
        footer.replaceChildren(create("span", "zkb-footer-copy", existingFooterText));
        footer.dataset.dashboardFooter = "true";
    }

    function buildInfoColumn() {
        const progressCard = create("section", "zkb-info-card");
        progressCard.append(create("p", "zkb-info-eyebrow", "USER PROGRESS"), create("h2", "", "Test results"));
        progressCard.appendChild(create("p", "zkb-info-copy", "Results are shown after each test. A saved results history is not available yet."));
        const progressLink = create("a", "zkb-info-link", "Start a practice test");
        progressLink.href = "olevel.html#chapter-tests";
        progressCard.appendChild(progressLink);

        const quickLinksCard = create("section", "zkb-info-card");
        quickLinksCard.appendChild(create("p", "zkb-info-eyebrow", "QUICK LINKS"));
        const quickLinks = create("div", "zkb-info-links");
        [
            ["Full Mock Tests", "olevel.html#papers"],
            ["Chapter-wise Test", "olevel.html#chapter-tests"],
            ["Paper-wise Test", "olevel.html#papers"],
            ["NIELIT Syllabus", "https://nielit.gov.in/sites/default/files/headquarter/pdf/20220905_5_1_revised_O_Level_IT.pdf"]
        ].forEach(function (item) {
            const link = create("a", "", item[0]);
            link.href = item[1];
            if (/^https:/.test(item[1])) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            quickLinks.appendChild(link);
        });
        quickLinksCard.appendChild(quickLinks);
        infoColumn.append(progressCard, quickLinksCard);
    }
    if (infoColumn) buildInfoColumn();

    function setActiveNavigation() {
        const pathname = window.location.pathname.toLowerCase();
        const query = new URLSearchParams(window.location.search);
        let activeKey = "";
        if (/practice-/.test(pathname)) activeKey = "practice";
        else if (pathname.endsWith("/ccc.html")) activeKey = "ccc";
        else if (pathname.endsWith("/olevel.html")) activeKey = window.location.hash === "#chapter-tests" ? "practice" : window.location.hash === "#papers" ? "mock" : "olevel";
        else if (pathname.endsWith("/olevel-test.html")) activeKey = query.get("mode") === "chapter" ? "practice" : "mock";
        else if (pathname.endsWith("/customize-test.html")) activeKey = "results";
        else if (pathname.endsWith("/my-questions.html")) activeKey = "practice";
        else if (pathname.endsWith("/index.html") || pathname.endsWith("/")) activeKey = "home";
        sidebar.querySelectorAll("[data-nav-key]").forEach(function (item) {
            if (item.dataset.navKey === activeKey) item.setAttribute("aria-current", "page");
        });
    }
    setActiveNavigation();

    const moreDialog = create("dialog", "zkb-more-dialog");
    moreDialog.setAttribute("aria-labelledby", "zkb-more-title");
    const morePanel = create("section", "zkb-more-panel");
    const moreHeader = create("div", "zkb-more-header");
    moreHeader.append(create("h2", "", "More"));
    const closeMore = create("button", "zkb-more-close", "×");
    closeMore.type = "button";
    closeMore.setAttribute("aria-label", "Close More menu");
    moreHeader.appendChild(closeMore);
    morePanel.appendChild(moreHeader);
    const moreTitle = moreHeader.querySelector("h2");
    moreTitle.id = "zkb-more-title";
    const moreList = create("div", "zkb-more-links");
    sidebarNav.querySelectorAll("a, button").forEach(function (item) {
        const copy = item.cloneNode(true);
        copy.classList.add("zkb-more-link");
        copy.removeAttribute("aria-current");
        if (copy.classList.contains("zkb-about-link")) {
            copy.addEventListener("click", function () {
                moreDialog.close();
                const brand = header.querySelector(".brand");
                if (brand) brand.click();
            });
        } else if (copy.tagName === "A") {
            copy.addEventListener("click", function () { moreDialog.close(); });
        }
        moreList.appendChild(copy);
    });
    morePanel.appendChild(moreList);
    moreDialog.appendChild(morePanel);
    document.body.appendChild(moreDialog);
    closeMore.addEventListener("click", function () { moreDialog.close(); });
    moreDialog.addEventListener("click", function (event) { if (event.target === moreDialog) moreDialog.close(); });

    const mobileNav = create("nav", "zkb-mobile-nav");
    mobileNav.setAttribute("aria-label", "Mobile navigation");
    [
        { label: "Home", icon: "⌂", href: "index.html#top", key: "home" },
        { label: "CCC", icon: "▣", href: "ccc.html", key: "ccc" },
        { label: "O Level", icon: "◇", href: "olevel.html", key: "olevel" },
        { label: "Practice", icon: "◎", href: "olevel.html#chapter-tests", key: "practice" }
    ].forEach(function (item) {
        const link = create("a", "zkb-mobile-link");
        link.href = item.href;
        link.dataset.navKey = item.key;
        link.append(create("span", "zkb-mobile-icon", item.icon), create("span", "", item.label));
        if (item.key === activeMobileKey()) link.setAttribute("aria-current", "page");
        mobileNav.appendChild(link);
    });
    const moreButton = create("button", "zkb-mobile-link zkb-mobile-more");
    moreButton.type = "button";
    moreButton.append(create("span", "zkb-mobile-icon", "☰"), create("span", "", "More"));
    moreButton.addEventListener("click", function () { if (!moreDialog.open) moreDialog.showModal(); });
    mobileNav.appendChild(moreButton);
    document.body.appendChild(mobileNav);

    function activeMobileKey() {
        const pathname = window.location.pathname.toLowerCase();
        if (/practice-/.test(pathname)) return "practice";
        if (pathname.endsWith("/ccc.html")) return "ccc";
        if (pathname.endsWith("/olevel.html")) return window.location.hash === "#chapter-tests" ? "practice" : window.location.hash === "#papers" ? "mock" : "olevel";
        if (pathname.endsWith("/olevel-test.html")) return new URLSearchParams(window.location.search).get("mode") === "chapter" ? "practice" : "mock";
        if (pathname.endsWith("/customize-test.html")) return "results";
        if (pathname.endsWith("/index.html") || pathname.endsWith("/")) return "home";
        return "";
    }

    const searchItems = [
        { label: "CCC Computer Course", description: "Course overview", href: "ccc.html", keywords: "ccc computer course" },
        { label: "O Level", description: "O Level papers and practice tests", href: "olevel.html", keywords: "o level course mock paper" },
        { label: "Chapter-wise Test", description: "Choose an O Level module and chapter", href: "olevel.html#chapter-tests", keywords: "practice tests chapter mixed questions" },
        { label: "Paper-wise Test", description: "Practice within one O Level paper", href: "olevel.html#papers", keywords: "paper practice tests" },
        { label: "Full Mock Tests", description: "Check full mock availability by paper", href: "olevel.html#papers", keywords: "mock exam 100 questions" },
        { label: "Study Materials", description: "Open CCC study material", href: "ccc.html#study-material", keywords: "study material pdf notes" },
        { label: "Customize Test", description: "Create a test with selected chapters, difficulty, and time limit", href: "customize-test.html", keywords: "customize test questions results analysis score review" },
        { label: "NIELIT O Level Syllabus", description: "Open Revision 5.1 syllabus", href: "https://nielit.gov.in/sites/default/files/headquarter/pdf/20220905_5_1_revised_O_Level_IT.pdf", keywords: "nielit syllabus o level" }
    ].concat(subjects.map(function (subject) {
        return { label: subject.label, description: "Practice topic", href: subject.href, keywords: subject.label.toLowerCase() + " practice" };
    }));

    function renderSearchResults() {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.replaceChildren();
        if (!query) {
            searchResults.hidden = true;
            return;
        }
        const matches = searchItems.filter(function (item) {
            return (item.label + " " + item.description + " " + item.keywords).toLowerCase().includes(query);
        }).slice(0, 6);
        if (!matches.length) {
            searchResults.appendChild(create("p", "zkb-search-empty", "No matching ZeroKB pages."));
        } else {
            matches.forEach(function (item) {
                const result = create("a", "zkb-search-result");
                result.href = item.href;
                result.setAttribute("role", "option");
                result.append(create("strong", "", item.label), create("span", "", item.description));
                searchResults.appendChild(result);
            });
        }
        searchResults.hidden = false;
    }
    searchInput.addEventListener("input", renderSearchResults);
    searchLabel.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            search.classList.add("is-open");
            searchInput.focus();
        }
    });
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchResults.hidden = true;
            searchInput.blur();
        }
        if (event.key === "Enter") {
            const firstResult = searchResults.querySelector("a");
            if (firstResult) window.location.href = firstResult.href;
        }
    });
    document.addEventListener("pointerdown", function (event) {
        if (!search.contains(event.target)) {
            searchResults.hidden = true;
            search.classList.remove("is-open");
        }
    });
})();
