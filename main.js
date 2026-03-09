// ======================================================
// Бургер-меню (для мобільної навігації)
// ======================================================
const burger = document.querySelector(".burger");
const navbar = document.querySelector(".navbar");

// Обробник кліку по бургеру: відкриває/закриває меню
burger.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

// ======================================================
// Firebase імпорт і ініціалізація
// ======================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ======================================================
// Конфігурація Firebase
// ======================================================
const firebaseConfig = {
    apiKey: "AIzaSyB4b8F6FY4Sx-D8EoEfMq9xwSjZ8mFxYqI",
    authDomain: "pinkwave-news.firebaseapp.com",
    projectId: "pinkwave-news",
    storageBucket: "pinkwave-news.firebasestorage.app",
    messagingSenderId: "918042852758",
    appId: "1:918042852758:web:c3c2bbc8589225e2e8b1b7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM елемент, куди будуть додаватись новини
const newsGrid = document.getElementById("newsGrid");

// ======================================================
// Функція завантаження новин з Firestore
// ======================================================
async function loadNews() {
    newsGrid.innerHTML = "";

    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach((docItem) => {
        const news = docItem.data();
        const article = document.createElement("article");
        article.className = "news-card";

        const formattedDate = news.createdAt?.toDate
            ? news.createdAt.toDate().toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            : "";

        article.innerHTML = `
      <div class="media">
        ${news.mediaURL
                ? news.mediaType && news.mediaType.startsWith("video/")
                    ? `<video src="${news.mediaURL}" controls></video>`
                    : `<img src="${news.mediaURL}" alt="${news.title}" />`
                : ""
            }
      </div>

      <div class="content">
        <div class="news-meta">
          <span class="news-category">${news.category}</span>
          <span class="news-date">${formattedDate}</span>
        </div>

        <h3 class="card-title">${news.title}</h3>
        <p class="card-desc">${news.content}</p>
      </div>
    `;

        // Додаємо готовий елемент у DOM
        newsGrid.appendChild(article);
    });
}

// Викликаємо функцію для завантаження новин при завантаженні сторінки
loadNews();