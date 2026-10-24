
    document.getElementById('search').addEventListener('input', function () {
        const cards = document.querySelectorAll('.character-card');
        const value = this.value.toLowerCase();

        cards.forEach(card => {
            const name = card.querySelector('h2').textContent.toLowerCase();
            card.style.display = name.includes(value) ? 'block' : 'none';
        });
    });



  const randomButton = document.getElementById("random-button");
  const loader = document.getElementById("loader");
  const flash = document.getElementById("flash-effect");

  randomButton.addEventListener("click", () => {
    const pages = [
      "luffy.html", "zoro.html", "sanji.html", "mihawk.html", "boa.html", "buggy.html", "chopper.html", "franky.html",
      "kuzan.html", "ace.html", "crocodile.html", "katakuri.html", "blackbeard.html", "kid.html", "nami.html","brook.html",
      "jimbey.html", "joker.html", "law.html", "robin.html", "roger.html", "shanks.html", "usopp.html", "whitebeard.html",
      "yamato.html", "kaido.html", "bigmom.html", "sabo.html", "carrot.html", "bepo.html", "lucci.html", "marco.html",
       "bonney.html", "rayleigh.html", "bartolomeo.html", "ivankov.html", "oden.html", "moria.html", "bonclay.html",
        "kuma.html",  
    ];
    loader.style.display = "block";
    flash.style.opacity = "1";
    setTimeout(() => flash.style.opacity = "0", 1000);
     setTimeout(() => {
      const random = pages[Math.floor(Math.random() * pages.length)];
      window.location.href = random;
    }, 1100);
  });

// Загружаем избранное из localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Помечаем сердечки на старте
document.querySelectorAll('.character-card').forEach(card => {
  const name = card.dataset.name;
  const btn = card.querySelector('.favorite-btn');
  if (favorites.includes(name)) {
    btn.classList.add('favorited');
    btn.textContent = "❤️";
  }
});

// Добавляем обработчик клика
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.character-card');
    const name = card.dataset.name;

    if (favorites.includes(name)) {
      // Удалить из избранного
      favorites = favorites.filter(n => n !== name);
      btn.classList.remove('favorited');
      btn.textContent = "🤍";
    } else {
      // Добавить
      favorites.push(name);
      btn.classList.add('favorited');
      btn.textContent = "❤️";
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});

let showingFavorites = false;

document.getElementById('show-favorites').addEventListener('click', () => {
  const cards = document.querySelectorAll('.character-card');
  const message = document.getElementById('no-favorites-message');

  if (!showingFavorites) {
    if (favorites.length === 0) {
      // Нет любимых → показать сообщение
      message.style.display = 'block';
      cards.forEach(card => card.style.display = 'none');
    } else {
      // Показать только избранных
      message.style.display = 'none';
      cards.forEach(card => {
        const name = card.dataset.name;
        if (favorites.includes(name)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    document.getElementById('show-favorites').textContent = '💖 Показать всех';
    showingFavorites = true;
  } else {
    // Показать всех
    message.style.display = 'none';
    cards.forEach(card => card.style.display = 'block');
    document.getElementById('show-favorites').textContent = '💖 Показать любимых';
    showingFavorites = false;
  }
});
let ageAscending = true;
let nameAscending = true;

document.getElementById("sort-select").addEventListener("change", (e) => {
  const sortType = e.target.value;
  const container = document.getElementById("OnePiece");
  const cards = Array.from(container.querySelectorAll(".character-card"));

  if (sortType === "age") {
    // Сортировка по возрасту
    cards.sort((a, b) => {
      const ageA = parseInt(a.dataset.age) || 0;
      const ageB = parseInt(b.dataset.age) || 0;
      return ageAscending ? ageA - ageB : ageB - ageA;
    });
    ageAscending = !ageAscending;
  } else if (sortType === "name") {
    // Сортировка по алфавиту
    cards.sort((a, b) => {
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();
      if (nameA < nameB) return nameAscending ? -1 : 1;
      if (nameA > nameB) return nameAscending ? 1 : -1;
      return 0;
    });
    nameAscending = !nameAscending;
  }

  cards.forEach(card => container.appendChild(card));
  // Сбрасываем выбранный элемент обратно на "📊 Сортировка"
  e.target.value = "";
});


const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
const achievementList = document.getElementById("achievement-list");

function unlockAchievement(name) {
  if (!achievements.includes(name)) {
    achievements.push(name);
    localStorage.setItem("achievements", JSON.stringify(achievements));
    showAchievementPopup(name);
    updateAchievementList();
  }
}

function updateAchievementList() {
  if (achievements.length === 0) {
    achievementList.innerHTML = "<li>Нет достижений... пока 👀</li>";
  } else {
    achievementList.innerHTML = achievements.map(a => `<li>${a}</li>`).join("");
  }
}

function showAchievementPopup(name) {
  const popup = document.createElement("div");
  popup.textContent = `🎖 Новое достижение: ${name}!`;
  popup.className = "achievement-popup";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 4000);
}

// Всплывающее уведомление
const style = document.createElement("style");
style.textContent = `
  .achievement-popup {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ffcc00;
    color: black;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px 20px;
    font-family: 'Permanent Marker', cursive;
    box-shadow: -3px 3px 0 black;
    animation: fadeInOut 4s ease forwards;
  }
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px) translateX(-50%); }
    10%, 90% { opacity: 1; transform: translateY(0) translateX(-50%); }
    100% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
  }
`;
document.head.appendChild(style);

// Открытие / закрытие окна
document.getElementById("achievements-btn").onclick = () => {
  document.getElementById("achievements-panel").style.display = "block";
};
document.getElementById("close-achievements").onclick = () => {
  document.getElementById("achievements-panel").style.display = "none";
};

updateAchievementList();

unlockAchievement("📚 Открыл Энциклопедию Фруктов");
unlockAchievement("💖 Добавил персонажа в избранное");
unlockAchievement("🎯 Угадал цитату");
unlockAchievement("⚙️ Сменил тему");
unlockAchievement("👒 Посмотрел 10 персонажей");

let secretKeys = [];
const secretCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

window.addEventListener('keydown', e => {
  secretKeys.push(e.key);
  secretKeys.splice(-secretCode.length - 1, secretKeys.length - secretCode.length);

  if (secretKeys.join('').toLowerCase() === secretCode.join('').toLowerCase()) {
    toggleGearFifth();
  }
});

function toggleGearFifth() {
  document.body.classList.toggle('gear-fifth');
  const gearOn = document.body.classList.contains('gear-fifth');
  
  // Звук активации (по желанию)
  if (gearOn) {
    showGearPopup("🔥 Gear Fifth активирован! 🔥");
  } else {
    showGearPopup("💤 Gear Fifth деактивирован");
  }
}

function showGearPopup(text) {
  const popup = document.createElement("div");
  popup.textContent = text;
  popup.className = "gear-popup";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 4000);
}

// Мини-стиль уведомления
const gearStyle = document.createElement("style");
gearStyle.textContent = `
.gear-popup {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff3366;
  color: white;
  border: 3px solid black;
  border-radius: 10px;
  padding: 12px 25px;
  font-family: 'Permanent Marker', cursive;
  box-shadow: -4px 4px 0 black;
  animation: gearfade 4s ease;
}
@keyframes gearfade {
  0% { opacity: 0; transform: translateY(20px) translateX(-50%); }
  10%, 90% { opacity: 1; transform: translateY(0) translateX(-50%); }
  100% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
}`;
document.head.appendChild(gearStyle);
