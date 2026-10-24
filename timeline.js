const events = document.querySelectorAll(".event");
const backTop = document.getElementById("back-top");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  events.forEach(event => {
    const top = event.getBoundingClientRect().top;
    if (top < trigger) {
      event.classList.add("show");
    }
  });

  backTop.style.display = window.scrollY > 500 ? "block" : "none";
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
