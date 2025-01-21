const slideshowTrack = document.querySelector("#slideshow-track");
const slides = document.querySelectorAll(".slide");
const slideCount = slides.length;

let currentIndex = 0;

// Auto-slide every 7 seconds
setInterval(() => {
  currentIndex++;

  // Reset position to create a seamless loop
  if (currentIndex >= slideCount) {
    currentIndex = 0;
    slideshowTrack.style.transition = "none"; // Disable transition for seamless reset
    slideshowTrack.style.transform = `translateX(0)`;
    
    // Allow some time for the reset before continuing
    setTimeout(() => {
      slideshowTrack.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
    });
  } else {
    // Normal sliding
    slideshowTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}, 7000);
