const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    function setTheme(theme) {
      body.className = theme;
      localStorage.setItem("theme", theme);
      themeBtn.textContent = theme === "dark-mode" ? "☀️ Светлая тема" : "🌙 Тёмная тема";
    }
    themeBtn.addEventListener("click", () => {
      const newTheme = body.className === "dark-mode" ? "light-mode" : "dark-mode";
      setTheme(newTheme);
    });
    setTheme(localStorage.getItem("theme") || "light-mode");

    document.getElementById("back-button").addEventListener("click", () => {
      window.location.href = "index.html";
    });