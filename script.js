document.addEventListener("DOMContentLoaded", function () {
  const text = "Full Stack Developer | AI/ML Engineer | Cybersecurity & Quantum computing enthusiast.";
  const typedTextElement = document.getElementById("typedText");

  let index = 0;
  let cursor = document.createElement("span"); // Create the cursor element
  cursor.classList.add("cursor"); // Add the cursor class for animation

  // Function to type text character by character
  function typeText() {
      if (index < text.length) {
          typedTextElement.textContent += text[index];
          index++;
          typedTextElement.appendChild(cursor); // Initially append the cursor to the element
          setTimeout(typeText, 100); // Adjust this value to control typing speed
      }
  }

  // Start the typing effect after a slight delay
  setTimeout(typeText, 500);
});

// Project Carousel functionality
let currentIndex = 0;
const projectCards = document.querySelectorAll(".project-card");
const totalProjects = projectCards.length;
const carousel = document.querySelector(".carousel");

// Adjusting the transition for infinite scrolling effect
function updateCarousel() {
  // Ensure the offset starts from the first project
  const offset = -(currentIndex - totalProjects/2 + 0.5) * (projectCards[0].offsetWidth + 30); // 30px is the margin between the cards
  carousel.style.transition = "transform 0.5s ease";
  carousel.style.transform = `translateX(${offset}px)`;
}

// Function to move to the next project
function moveToNext() {
  currentIndex++;
  if (currentIndex >= totalProjects) {
      currentIndex = 0; // Reset to the first project
      updateCarousel();
  } else {
      updateCarousel();
  }
}

// Function to move to the previous project
function moveToPrevious() {
  currentIndex--;
  if (currentIndex < 0) {
      currentIndex = totalProjects - 1; // Set to the last project
      updateCarousel();
  } else {
      updateCarousel();
  }
}

// Event listeners for arrows
document.getElementById("next").addEventListener("click", moveToNext);
document.getElementById("prev").addEventListener("click", moveToPrevious);

// Event listener for mouse wheel scroll
carousel.addEventListener("wheel", function(event) {
event.preventDefault();
if (event.deltaY > 0) {
  // Scroll Down -> Move to next project
  moveToNext();
} else if (event.deltaY < 0) {
  // Scroll Up -> Move to previous project
  moveToPrevious();
}
});

// Ensure the carousel starts correctly on page load
document.addEventListener("DOMContentLoaded", function () {
  // Reset the carousel to the first item before updating
  currentIndex = 0; // Ensure we start at the first project
  updateCarousel(); // Update carousel to start at the first project
});

// IntersectionObserver to add 'visible' class when sections come into view
const observer = new IntersectionObserver(
  (entries, observer) => {
      entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting) {
              target.classList.add("visible"); // Add 'visible' class when in view

              // Trigger the animation for the skills items each time the skills section is in view
              if (target.id === "skills") {
                  const skillItems = document.querySelectorAll("#skills li");
                  skillItems.forEach((li, index) => {
                      // Remove previous visible class to reset animation
                      li.classList.remove("visible");

                      // Reapply the visible class with a delay
                      setTimeout(() => {
                          li.classList.add("visible");
                      }, index * 300); // Adjust delay (300ms)
                  });
              }

              // Trigger animation for experience boxes
              if (target.id === "experience") {
                  const experienceBoxes = document.querySelectorAll(".experience-box");
                  experienceBoxes.forEach((box, index) => {
                      // Add the 'visible' class to trigger the transition
                      setTimeout(() => {
                          box.classList.add("visible");
                      }, index * 300); // Delay each box's appearance
                  });
              }

              // Trigger animation for education boxes (left and right sliding)
              if (target.id === "education") {
                  const educationBoxes = document.querySelectorAll(".education-box");
                  educationBoxes.forEach((box, index) => {
                      // Add the 'visible' class to trigger the transition with a delay
                      setTimeout(() => {
                          box.classList.add("visible");
                      }, index * 300); // Delay each box's appearance
                  });
              }
          } else {
              target.classList.remove("visible"); // Remove 'visible' class when out of view

              // Reset the transform and opacity when out of view
              if (target.id === "experience") {
                  const experienceBoxes = document.querySelectorAll(".experience-box");
                  experienceBoxes.forEach((box) => {
                      box.classList.remove("visible"); // Reset each experience box
                  });
              }

              // Reset the transform and opacity when out of view
              if (target.id === "education") {
                  const educationBoxes = document.querySelectorAll(".education-box");
                  educationBoxes.forEach((box) => {
                      box.classList.remove("visible"); // Reset each experience box
                  });
              }
          }
      });
  },
  { threshold: 0.15 } // Trigger when 15% of the element is visible
); 

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});
