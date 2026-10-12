(function () {
    "use strict";

    const USER_KEY = "zerokb_user";
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;

    const welcomeDialog = document.createElement("dialog");
    welcomeDialog.className = "zkb-user-dialog";
    welcomeDialog.setAttribute("aria-labelledby", "zkb-welcome-title");
    welcomeDialog.innerHTML = `
        <form class="zkb-user-dialog-card" id="zkb-welcome-form">
            <p class="zkb-user-eyebrow">ZeroKB</p>
            <h2 id="zkb-welcome-title">Welcome to ZeroKB</h2>
            <p class="zkb-user-subtitle">Learn • Practice • Master</p>
            <p class="zkb-user-copy">Enter your name or nickname to personalize your ZeroKB experience.</p>
            <label class="zkb-user-label" for="zkb-welcome-name">Name or nickname</label>
            <input class="zkb-user-input" id="zkb-welcome-name" name="displayName" type="text" autocomplete="nickname" placeholder="Enter your name" required>
            <p class="zkb-user-error" id="zkb-welcome-error" role="alert" hidden></p>
            <button class="zkb-user-primary" type="submit">Continue</button>
        </form>`;

    const profileDialog = document.createElement("dialog");
    profileDialog.className = "zkb-user-dialog";
    profileDialog.setAttribute("aria-labelledby", "zkb-profile-title");
    profileDialog.innerHTML = `
        <section class="zkb-user-dialog-card">
            <button class="zkb-user-dialog-close" type="button" aria-label="Close profile">×</button>
            <p class="zkb-user-eyebrow">ZeroKB</p>
            <h2 id="zkb-profile-title">ZeroKB Profile</h2>
            <dl class="zkb-user-details">
                <div><dt>Name</dt><dd data-profile-name></dd></div>
                <div><dt>User ID</dt><dd data-profile-id></dd></div>
                <div><dt>Member Since</dt><dd data-profile-date></dd></div>
            </dl>
            <p class="zkb-user-privacy">Your Phase 1 profile is stored locally on this device.</p>
            <button class="zkb-user-primary" type="button" data-close-profile>Close</button>
        </section>`;

    const changeDialog = document.createElement("dialog");
    changeDialog.className = "zkb-user-dialog";
    changeDialog.setAttribute("aria-labelledby", "zkb-change-title");
    changeDialog.innerHTML = `
        <form class="zkb-user-dialog-card" id="zkb-change-form">
            <button class="zkb-user-dialog-close" type="button" aria-label="Close change name">×</button>
            <p class="zkb-user-eyebrow">ZeroKB</p>
            <h2 id="zkb-change-title">Change Name</h2>
            <p class="zkb-user-current"><strong>Current Name</strong><span data-current-name></span></p>
            <label class="zkb-user-label" for="zkb-new-name">New Name</label>
            <input class="zkb-user-input" id="zkb-new-name" name="displayName" type="text" autocomplete="nickname" placeholder="Enter your new name" required>
            <p class="zkb-user-error" id="zkb-change-error" role="alert" hidden></p>
            <div class="zkb-user-actions">
                <button class="zkb-user-secondary" type="button" data-cancel-change>Cancel</button>
                <button class="zkb-user-primary" type="submit">Save Name</button>
            </div>
        </form>`;

    const resetDialog = document.createElement("dialog");
    resetDialog.className = "zkb-user-dialog";
    resetDialog.setAttribute("aria-labelledby", "zkb-reset-title");
    resetDialog.innerHTML = `
        <section class="zkb-user-dialog-card">
            <button class="zkb-user-dialog-close" type="button" aria-label="Close reset confirmation">×</button>
            <p class="zkb-user-eyebrow">ZeroKB</p>
            <h2 id="zkb-reset-title">Reset Local Profile</h2>
            <p class="zkb-user-copy">Are you sure you want to reset your local ZeroKB profile?</p>
            <p class="zkb-user-error" data-reset-error role="alert" hidden></p>
            <div class="zkb-user-actions">
                <button class="zkb-user-secondary" type="button" data-cancel-reset>Cancel</button>
                <button class="zkb-user-danger" type="button" data-confirm-reset>Reset</button>
            </div>
        </section>`;

    document.body.append(welcomeDialog, profileDialog, changeDialog, resetDialog);

    const welcomeForm = welcomeDialog.querySelector("#zkb-welcome-form");
    const welcomeInput = welcomeDialog.querySelector("#zkb-welcome-name");
    const welcomeError = welcomeDialog.querySelector("#zkb-welcome-error");
    const changeForm = changeDialog.querySelector("#zkb-change-form");
    const changeInput = changeDialog.querySelector("#zkb-new-name");
    const changeError = changeDialog.querySelector("#zkb-change-error");
    const menu = document.createElement("div");
    menu.className = "zkb-user-menu";
    menu.id = "zkb-user-menu";
    menu.hidden = true;
    menu.setAttribute("aria-label", "User profile menu");

    const existingChip = topbar.querySelector(".student-chip");
    const control = document.createElement("div");
    control.className = "zkb-user-control";
    const userButton = document.createElement("button");
    userButton.className = "zkb-user-button";
    userButton.type = "button";
    userButton.setAttribute("aria-controls", menu.id);
    userButton.setAttribute("aria-expanded", "false");
    const avatar = document.createElement("span");
    avatar.className = "zkb-user-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const buttonName = document.createElement("span");
    buttonName.className = "zkb-user-button-name";
    userButton.append(avatar, buttonName);
    control.append(userButton, menu);
    if (existingChip) existingChip.replaceWith(control);
    else topbar.append(control);

    let user = readUser();

    function readUser() {
        let serialized;
        try {
            serialized = window.localStorage.getItem(USER_KEY);
        } catch (error) {
            return null;
        }
        if (serialized === null) return null;

        try {
            const parsed = JSON.parse(serialized);
            if (!parsed || typeof parsed.userId !== "string" || !parsed.userId.trim() ||
                typeof parsed.displayName !== "string" || !parsed.displayName.trim() ||
                typeof parsed.createdAt !== "string" || !Number.isFinite(Date.parse(parsed.createdAt))) {
                throw new Error("Invalid local profile");
            }
            return {
                userId: parsed.userId.trim(),
                displayName: parsed.displayName.trim(),
                createdAt: parsed.createdAt
            };
        } catch (error) {
            try { window.localStorage.removeItem(USER_KEY); } catch (removeError) {}
            return null;
        }
    }

    function createUserId() {
        const bytes = new Uint8Array(6);
        if (window.crypto && typeof window.crypto.getRandomValues === "function") {
            window.crypto.getRandomValues(bytes);
        } else {
            for (let index = 0; index < bytes.length; index += 1) {
                bytes[index] = Math.floor(Math.random() * 256);
            }
        }
        const suffix = Array.from(bytes, function (byte) {
            return byte.toString(16).padStart(2, "0");
        }).join("").toUpperCase();
        return "ZKB-" + suffix;
    }

    function saveUser(nextUser) {
        try {
            window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
            user = nextUser;
            renderUser();
            return true;
        } catch (error) {
            return false;
        }
    }

    function renderUser() {
        const displayName = user ? user.displayName : "Your Profile";
        avatar.textContent = user ? displayName.trim().slice(0, 2).toUpperCase() : "👤";
        buttonName.textContent = displayName;
        userButton.setAttribute("aria-label", user ? "Open profile for " + displayName : "Open ZeroKB profile");
        menu.replaceChildren();

        if (user) {
            const welcome = document.createElement("p");
            welcome.className = "zkb-user-menu-welcome";
            welcome.textContent = "Welcome, " + user.displayName;
            const nameLine = createMenuDetail("Name", user.displayName);
            const idLine = createMenuDetail("User ID", user.userId);
            const actions = document.createElement("div");
            actions.className = "zkb-user-menu-actions";
            actions.append(
                createMenuButton("My Profile", "profile"),
                createMenuButton("Change Name", "change"),
                createMenuButton("Reset Local Profile", "reset", true)
            );
            menu.append(welcome, nameLine, idLine, actions);
        }
    }

    function createMenuDetail(label, value) {
        const detail = document.createElement("p");
        detail.className = "zkb-user-menu-detail";
        const term = document.createElement("strong");
        term.textContent = label;
        const content = document.createElement("span");
        content.textContent = value;
        detail.append(term, content);
        return detail;
    }

    function createMenuButton(label, action, danger) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = danger ? "zkb-user-menu-action is-danger" : "zkb-user-menu-action";
        button.dataset.userAction = action;
        button.textContent = label;
        return button;
    }

    function setError(element, message) {
        element.textContent = message;
        element.hidden = !message;
    }

    function openDialog(dialog, focusTarget) {
        if (!dialog.open) dialog.showModal();
        if (focusTarget) window.requestAnimationFrame(function () { focusTarget.focus(); });
    }

    function formatMemberSince(value) {
        return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
    }

    function syncProfileDialog() {
        profileDialog.querySelector("[data-profile-name]").textContent = user.displayName;
        profileDialog.querySelector("[data-profile-id]").textContent = user.userId;
        profileDialog.querySelector("[data-profile-date]").textContent = formatMemberSince(user.createdAt);
        changeDialog.querySelector("[data-current-name]").textContent = user.displayName;
    }

    userButton.addEventListener("click", function () {
        if (!user) {
            openDialog(welcomeDialog, welcomeInput);
            return;
        }
        menu.hidden = !menu.hidden;
        userButton.setAttribute("aria-expanded", String(!menu.hidden));
    });

    menu.addEventListener("click", function (event) {
        const action = event.target.closest("[data-user-action]");
        if (!action) return;
        menu.hidden = true;
        userButton.setAttribute("aria-expanded", "false");
        if (action.dataset.userAction === "profile") {
            syncProfileDialog();
            openDialog(profileDialog);
        } else if (action.dataset.userAction === "change") {
            syncProfileDialog();
            changeInput.value = "";
            setError(changeError, "");
            openDialog(changeDialog, changeInput);
        } else if (action.dataset.userAction === "reset") {
            setError(resetDialog.querySelector("[data-reset-error]"), "");
            openDialog(resetDialog);
        }
    });

    document.addEventListener("pointerdown", function (event) {
        if (!control.contains(event.target)) {
            menu.hidden = true;
            userButton.setAttribute("aria-expanded", "false");
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !menu.hidden) {
            menu.hidden = true;
            userButton.setAttribute("aria-expanded", "false");
            userButton.focus();
        }
    });

    welcomeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const displayName = welcomeInput.value.trim();
        if (!displayName) {
            setError(welcomeError, "Please enter your name or nickname.");
            welcomeInput.focus();
            return;
        }
        const newUser = { userId: createUserId(), displayName: displayName, createdAt: new Date().toISOString() };
        if (!saveUser(newUser)) {
            setError(welcomeError, "Your profile could not be saved in this browser. Check local storage settings and try again.");
            return;
        }
        welcomeDialog.close();
        welcomeForm.reset();
        setError(welcomeError, "");
    });

    changeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const displayName = changeInput.value.trim();
        if (!displayName) {
            setError(changeError, "Please enter your name or nickname.");
            changeInput.focus();
            return;
        }
        const updatedUser = { userId: user.userId, displayName: displayName, createdAt: user.createdAt };
        if (!saveUser(updatedUser)) {
            setError(changeError, "Your name could not be saved in this browser. Check local storage settings and try again.");
            return;
        }
        changeDialog.close();
        setError(changeError, "");
    });

    [profileDialog, changeDialog, resetDialog].forEach(function (dialog) {
        dialog.addEventListener("click", function (event) {
            if (event.target.matches(".zkb-user-dialog-close, [data-close-profile], [data-cancel-change], [data-cancel-reset]")) dialog.close();
        });
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) dialog.close();
        });
    });

    resetDialog.querySelector("[data-confirm-reset]").addEventListener("click", function () {
        try {
            window.localStorage.removeItem(USER_KEY);
            window.location.reload();
        } catch (error) {
            setError(resetDialog.querySelector("[data-reset-error]"), "The local profile could not be reset in this browser.");
        }
    });

    welcomeDialog.addEventListener("cancel", function (event) { event.preventDefault(); });
    renderUser();
    if (!user) openDialog(welcomeDialog, welcomeInput);
})();
