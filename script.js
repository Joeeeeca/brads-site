document.addEventListener("DOMContentLoaded", function () {
  var popupOverlay = document.getElementById("popup-overlay");
  var closePopupButton = document.getElementById("close-popup");
  var emailSubscriptionSection = document.querySelector(".email-subscription-section");
  var popupForm = document.getElementById("popup-form");
  var subscriptionForm = document.getElementById("mc-embedded-subscribe-form");
  var thankYouSection = document.getElementById("thank-you-section");

  function showThankYouSection() {
      console.log("Showing thank you section");
      thankYouSection.style.display = "block";
  }

  // Function to set a cookie
  function setCookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
      console.log("Cookie set:", name, value);
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
      console.log("Closing popup");
      popupOverlay.style.display = "none";
  }

  // Function to check if the popup should be shown
  function shouldShowPopup() {
      var subscribedCookie = getCookie("subscribed");
      console.log("Subscribed cookie:", subscribedCookie);
      return subscribedCookie !== "true";
  }

  // Check if the popup should be shown and show it
  if (shouldShowPopup()) {
      console.log("Showing popup");
      popupOverlay.style.display = "block";
  } else {
      showThankYouSection();
  }

  // Close the popup when the close button is clicked
  closePopupButton.addEventListener("click", function () {
      closePopup();
      if (!getCookie("subscribed")) {
          emailSubscriptionSection.style.display = "block"; // Show email subscription section if user closes popup
      }
  });

  // Add event listener to the popup subscription form
  popupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      

      setCookie("subscribed", "true", 365);
      closePopup();
      showThankYouSection();
  });

  // Add event listener to the subscription form
  subscriptionForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
    console.log("Subscription form submitted");

      setCookie("subscribed", "true", 365);
      console.log("Cookie set for subscription");
      showThankYouSection();
      console.log("Thank you section shown");
      emailSubscriptionSection.style.display = "none"; // Hide email subscription section after successful subscription
      console.log("Email subscription section hidden after successful subscription");
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




  
  
  
  