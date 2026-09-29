"use strict";

/* =========================================================
   ELEMENTS
========================================================= */

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const mobileMenu = document.getElementById("mobile-menu");

const navLinks = document.querySelectorAll("[data-nav-link]");

const sections = document.querySelectorAll("main section[id]");


/* =========================================================
   THEME
========================================================= */

const savedTheme = localStorage.getItem("theme");

const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;


function applyTheme(theme) {

    root.setAttribute("data-theme", theme);

    const isDark = theme === "dark";

    themeToggle.textContent = isDark
        ? "Light"
        : "Dark";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
    );
}


/* Initial theme */

if (savedTheme === "dark" || savedTheme === "light") {

    applyTheme(savedTheme);

} else {

    applyTheme(
        systemPrefersDark
            ? "dark"
            : "light"
    );
}


/* Theme button */

themeToggle.addEventListener("click", () => {

    const currentTheme =
        root.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    applyTheme(newTheme);

    localStorage.setItem(
        "theme",
        newTheme
    );

});


/* 
   MOBILE MENU*/

function openMenu() {

    mobileMenu.classList.remove("hidden");

    mobileMenu.classList.add("flex");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    menuToggle.textContent = "Close";
}


function closeMenu() {

    mobileMenu.classList.add("hidden");

    mobileMenu.classList.remove("flex");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuToggle.textContent = "Menu";
}


menuToggle.addEventListener("click", () => {

    const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {

        closeMenu();

    } else {

        openMenu();

    }

});


/* Close menu after clicking navigation */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (window.innerWidth < 768) {

            closeMenu();

        }

    });

});


/* Close with Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* Close menu when resized to desktop */

window.addEventListener("resize", () => {

    if (window.innerWidth >= 768) {

        closeMenu();

    }

});


/*
   ACTIVE NAVIGATION */

function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 160;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        const isActive =
            href === `#${currentSection}`;

        link.classList.toggle(
            "text-black",
            isActive
        );

        link.classList.toggle(
            "dark:text-white",
            isActive
        );

        link.classList.toggle(
            "text-black/60",
            !isActive
        );

        link.classList.toggle(
            "dark:text-white/60",
            !isActive
        );

    });

}


/* Scroll */

window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


/* Initial */

updateActiveNav();


/* 
   SMOOTH SCROLL
 */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }

        const target =
            document.querySelector(targetId);

        if (!target) {

            return;

        }

        event.preventDefault();

        target.scrollIntoView({
            behavior:
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"
        });

    });

});