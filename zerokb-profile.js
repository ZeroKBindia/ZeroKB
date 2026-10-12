(function () {
    const logo = document.querySelector(".brand");
    if (!logo) return;

    const dialog = document.createElement("dialog");
    dialog.className = "profile-dialog";
    dialog.id = "founder-profile";
    dialog.setAttribute("aria-labelledby", "founder-profile-title");

    const card = document.createElement("div");
    card.className = "profile-dialog-card";

    const header = document.createElement("header");
    header.className = "profile-dialog-header";

    const brand = document.createElement("div");
    brand.className = "profile-brand-lockup";
    const mark = document.createElement("span");
    mark.className = "profile-brand-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = "Z";
    const brandCopy = document.createElement("span");
    brandCopy.className = "profile-brand-copy";
    const brandName = document.createElement("strong");
    brandName.textContent = "ZeroKB";
    brandCopy.append(brandName);
    brand.append(mark, brandCopy);

    const iconButton = document.createElement("button");
    iconButton.className = "profile-icon-close";
    iconButton.type = "button";
    iconButton.setAttribute("aria-label", "Close About ZeroKB");
    iconButton.autofocus = true;
    iconButton.textContent = "×";
    header.append(brand, iconButton);

    const title = document.createElement("h2");
    title.id = "founder-profile-title";
    title.textContent = "About ZeroKB";

    const profiles = document.createElement("section");
    profiles.className = "profile-grid";
    profiles.setAttribute("aria-label", "ZeroKB founders");

    function createProfileCard(label, nameText, roleText) {
        const profile = document.createElement("article");
        profile.className = "profile-person-card";

        const profileLabel = document.createElement("h3");
        profileLabel.className = "profile-person-label";
        profileLabel.textContent = label;

        const name = document.createElement("p");
        name.className = "profile-founder-name";
        name.textContent = nameText;

        const role = document.createElement("p");
        role.className = "profile-role";
        role.textContent = roleText;

        profile.append(profileLabel, name, role);
        return profile;
    }

    profiles.append(
        createProfileCard(
            "Founder",
            "Suryansh Maddheshiya",
            "Founder"
        ),
        createProfileCard(
            "Co-founder",
            "Piyush Yadav",
            "Co-founder / Investor"
        )
    );

    const footer = document.createElement("footer");
    footer.className = "profile-dialog-actions";
    const closeButton = document.createElement("button");
    closeButton.className = "profile-close-button";
    closeButton.type = "button";
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", function () { dialog.close(); });

    footer.append(closeButton);

    card.append(header, title, profiles, footer);
    dialog.append(card);
    document.body.append(dialog);

    logo.setAttribute("aria-haspopup", "dialog");
    logo.setAttribute("aria-controls", dialog.id);
    logo.addEventListener("click", function (event) {
        event.preventDefault();
        if (!dialog.open) dialog.showModal();
    });
    iconButton.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
    });
})();
