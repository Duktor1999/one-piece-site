const themeBtn = document.getElementById("theme-toggle"),
          body = document.body;
    function setTheme(t){ body.className = t; localStorage.setItem("theme", t); themeBtn.textContent = t==='dark-mode'? '☀️ Светлая тема':'🌙 Тёмная тема'; }
    themeBtn.addEventListener('click',()=>setTheme(body.className==='dark-mode'?'light-mode':'dark-mode'));
    setTheme(localStorage.getItem('theme')||'light-mode');
    document.getElementById('back-button').addEventListener('click',()=>window.location.href='index.html');