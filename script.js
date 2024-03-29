// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie value
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to close the popup
function closePopup() {
  document.getElementById("popup-overlay").style.display = "none";
}

// Function to show the thank you section
function showThankYouSection() {
  document.getElementById("thank-you-section").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  var popupOverlay = document.getElementById("popup-overlay");
  console.log("Popup Overlay Element:", popupOverlay);
  var closePopupButton = document.getElementById("close-popup");
  var emailSubscriptionSection = document.querySelector(".email-subscription-section");
  var signupForm = document.getElementById("popup-form");
  var thankYouMessage = document.getElementById("thank-you-section");

  // Function to check if the popup should be shown
  function shouldShowPopup() {
      // Retrieve the value of the 'subscribed' cookie
      var subscribedCookie = getCookie("subscribed");

      // Log the value of the retrieved cookie to the console
      console.log("Value of 'subscribed' cookie:", subscribedCookie);

      // Check if the value of the 'subscribed' cookie is not 'true'
      var showPopup = subscribedCookie !== "true";

      // Log whether the popup should be shown based on the cookie value
      console.log("Show Popup:", showPopup);

      // Return the result indicating whether the popup should be shown
      return showPopup;
  }

  // Check if the popup should be shown and show it
  if (shouldShowPopup()) {
      // Show the popup when the page loads
      popupOverlay.style.display = "block";
  } else {
      // If the user is already subscribed, show the thank you section instead of the popup
      showThankYouSection();
  }

  // Add event listener to the popup subscription form
  signupForm.addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();

      // Perform any additional validation if needed

      // Set a cookie when the user submits the popup subscription form
      setCookie("subscribed", "true", 365); // Set the cookie to remember that the user has subscribed for 365 days

      // Hide the signup form
      signupForm.style.display = "none";
      
      // Display the thank you message
      thankYouMessage.style.display = "block";

      // Close the popup after setting the cookie
      closePopup();

      // Show the thank you section
      showThankYouSection();
  });

  // Close the popup when the close button is clicked
  closePopupButton.addEventListener("click", function () {
      closePopup();
      // Show the email subscription section
      emailSubscriptionSection.style.display = "block";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelector('.carousel-slides');
  const slides2 = document.querySelector('.carousel-slides2');

  let slideIndex = 0;
  const slideWidth = carousel.offsetWidth; // Width of each slide

  // Function to move the slides
  function moveSlides() {
      slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
      console.log('Slide index:', slideIndex);
      console.log('Slide position:', slides.style.transform);
  }

  function moveSlides2() {
      const slideWidth2 = slides2.children[0].offsetWidth; // Width of the first slide in the second set
      const slideIndex2 = slideIndex * (window.innerWidth > 1024 ? 3 : 3.2); // Adjust based on screen width
      slides2.style.transform = `translateX(-${slideIndex2 * slideWidth2}px)`; // Update position
      console.log("Second carousel slide position:", slides2.style.transform);
  }

  // Event listener for the next button
  nextButton.addEventListener('click', function() {
      slideIndex++;
      if (slideIndex >= slides.children.length) {
          slideIndex = 0; // Reset index if it exceeds the number of slides
      }
      moveSlides();
      moveSlides2();
  });

  // Event listener for the previous button
  prevButton.addEventListener('click', function() {
      slideIndex--;
      if (slideIndex < 0) {
          slideIndex = slides.children.length - 1; // Set index to the last slide if it goes below 0
      }
      moveSlides();
      moveSlides2();
  });
});