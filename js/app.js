const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300}px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

const statusBox = document.getElementById("action-status");
let statusTimer;

const showStatus = (message) => {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.classList.add("show");
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => statusBox.classList.remove("show"), 2200);
};

const sendMovieAction = async (movie, action) => {
  try {
    const response = await fetch("actions.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie, action }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Action failed");
    }
    showStatus(data.message);
  } catch (error) {
    showStatus(`Error: ${error.message}`);
  }
};

const getMovieTitle = (button) => {
  const card = button.closest(".movie-list-item");
  if (card) {
    return card.querySelector(".movie-list-item-title")?.textContent?.trim() || "Selected movie";
  }
  return "Featured movie";
};

document.querySelectorAll(".movie-list-item-button, .featured-button").forEach((button) => {
  button.addEventListener("click", () => {
    const title = getMovieTitle(button);
    const action = button.classList.contains("featured-button") ? "play" : "watchlist";
    sendMovieAction(title, action);
  });
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 10) {
    // scrolling down
    header.classList.add("hide");
  } else {
    // scrolling up
    header.classList.remove("hide");
  }
  lastScrollY = currentScrollY;
});
