/*
  9.5 DOM - Image Slider (Carousel)

  ASSUMED HTML:

    <div class="slider">
      <div class="track" id="track">
        <div class="slide">1</div>
        <div class="slide">2</div>
        <div class="slide">3</div>
        <div class="slide">4</div>
      </div>
    </div>

    <button id="prevBtn">‹ Prev</button>
    <button id="nextBtn">Next ›</button>
    <div class="dots" id="dots"></div>

  ASSUMED CSS: ".track" uses display:flex with each ".slide" at
  min-width:100%, and ".track" has a CSS transition on "transform" so
  the slide movement animates smoothly.

  CORE IDEA: keep a "currentIndex" variable tracking which image is
  showing. Next/Prev buttons change that index, and we move the track
  strip left/right using CSS transform based on the index.
*/

const track = document.getElementById("track");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0; // tracks which slide is currently shown

// Step 1: create one "dot" per slide, dynamically.
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

// Step 2: function that moves the track and updates the active dot.
function updateSlide() {
  // Move the track LEFT by (index * 100%) using CSS transform.
  // Example: index 2 -> translateX(-200%) shows the 3rd slide.
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update which dot looks "active".
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlide();
}

// Step 3: next/prev buttons change the index, wrapping around with %
nextBtn.addEventListener("click", () => {
  // % (modulo) wraps back to 0 after the last slide.
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  // Adding slides.length before % handles negative numbers correctly.
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
});
