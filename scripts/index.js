// Getting dom elements:
const ctaButton = document.getElementById("cta");
const img = document.querySelector("img");
const nav = document.querySelector("nav");
const textContainer = document.getElementById("text-container");

auth.onAuthStateChanged((u) => {
  if (u != null) {
    ctaButton.innerText = "Go to app";
    ctaButton.addEventListener("click", (e) => {
      window.location.href = "moods.html";
    });
  } else {
    ctaButton.innerText = "Login";
    ctaButton.addEventListener("click", (e) => {
      window.location.href = "auth.html";
    });
  }
});

window.addEventListener("load", () => {
  textContainer.style.transform = "translateX(0)";
  img.style.transform = "translateY(0)";
  nav.style.transform = "translateY(0)";
});
