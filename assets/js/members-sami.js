const html = document.documentElement;

const themeButtons = [
  {
    button: document.getElementById("themeToggle"),
    label: document.getElementById("themeToggleLabel"),
  },
  {
    button: document.getElementById("themeToggleDesktop"),
    label: document.getElementById("themeToggleDesktopLabel"),
  },
].filter(({ button }) => button);

function updateThemeButtons(theme) {
  const isDark = theme === "dark";
  themeButtons.forEach(({ button, label }) => {
    button.setAttribute("aria-pressed", String(isDark));
    if (label) {
      label.textContent = isDark ? "Light" : "Dark";
    }
  });
}

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeButtons(theme);
}

setTheme(localStorage.getItem("theme") || "light");

themeButtons.forEach(({ button }) => {
  button.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme") || "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) {
      return;
    }

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
