// =========================================================
// THEME TOGGLE
// =========================================================

const themeToggle = document.getElementById("themeToggle");

// Check previously saved theme
const savedTheme = localStorage.getItem("theme");

// Apply saved theme
if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Light";
} else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "Dark";
}


// =========================================================
// CHANGE THEME ON CLICK
// =========================================================

themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {

        // Dark → Light
        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        themeToggle.textContent = "Dark";

        localStorage.setItem("theme", "light");

    } else {

        // Light → Dark
        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeToggle.textContent = "Light";

        localStorage.setItem("theme", "dark");
    }

});

// =========================================================
// SCROLL BASED NAVIGATION
// =========================================================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(
    '.nav-links > a:not(.nav-cta)'
);

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });
}


// Run when user scrolls
window.addEventListener("scroll", updateActiveNav);

// Run once when page loads
updateActiveNav();