// JavaScript to handle adding items to the basket
var basketItems = {}; // Object to store basket items
var basketCount = 0; // Initial count of items in the basket

// Function to update the basket count
function updateBasketCount(count) {
    var basketElement = document.getElementById('basket');
    basketElement.innerText = count;
}

// Function to update the basket count
function updateBasketCount(count) {
    var basketElement = document.getElementById('basket');
    basketElement.innerHTML = ''; // Clear existing content
    
    // Create a span element for the counter
    var counterSpan = document.createElement('span');
    counterSpan.textContent = count;
    counterSpan.style.fontSize = '16px';
    
    // Create a wrapper div for the counter
    var counterWrapper = document.createElement('div');
    counterWrapper.style.marginLeft = '10px'; // Add margin to the wrapper for spacing
    
    // Append the counter span to the wrapper
    counterWrapper.appendChild(counterSpan);
    
    // Append the wrapper to the basket icon
    basketElement.appendChild(counterWrapper);
    
    // Update the width of the container to accommodate the wider basket icon
    var basketWidth = basketElement.offsetWidth;
    var container = document.querySelector('.container');
    container.style.paddingRight = basketWidth + 'px';
}

// Function to open the basket side menu
function openBasketMenu() {
    document.getElementById('basket-menu').classList.add('active');
    document.body.classList.add('menu-open'); // Add menu-open class to body
}

// Function to close the basket side menu
function closeBasketMenu() {
    document.getElementById('basket-menu').classList.remove('active');
    document.body.classList.remove('menu-open'); // Remove menu-open class from body
}

// Function to remove item from basket
function removeFromBasket(itemName) {
    delete basketItems[itemName]; // Remove item from basketItems object
    var listItem = document.querySelector('li[data-name="' + itemName + '"]');
    if (listItem) {
        listItem.remove(); // Remove corresponding HTML element from basket menu
    }
}

// Function to render basket items
function renderBasketItems() {
    var basketList = document.getElementById('basket-items');
    var subtotal = 0;
    basketList.innerHTML = ''; // Clear previous items

    // Loop through basket items
    for (var itemName in basketItems) {
        if (basketItems.hasOwnProperty(itemName)) {
            var item = basketItems[itemName];
            var itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            // Create HTML elements for basket item
            var listItem = document.createElement('li');
            listItem.classList.add('basket-item');
            listItem.dataset.name = itemName;
            var itemImageContainer = document.createElement('div');
            itemImageContainer.classList.add('basket-item-image-container');
            var itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = itemName;
            var itemDetails = document.createElement('div');
            itemDetails.classList.add('basket-item-details');
            var itemNameElement = document.createElement('span');
            itemNameElement.classList.add('basket-item-name');
            itemNameElement.innerText = itemName;
            var itemQuantity = document.createElement('span');
            itemQuantity.innerText = 'x' + item.quantity;
            var itemPrice = document.createElement('span');
            itemPrice.classList.add('basket-item-price');
            itemPrice.innerText = '$' + itemTotal.toFixed(2);
            var removeButton = document.createElement('button');
            removeButton.innerText = 'Remove';
            removeButton.addEventListener('click', function() {
                var itemNameToRemove = this.parentNode.dataset.name;
                removeFromBasket(itemNameToRemove);
                basketCount--; // Decrement basket count when item is removed
                updateBasketCount(basketCount); // Update the basket count display
                renderBasketItems(); // Re-render basket items
            });

            // Append elements to the basket list item
            itemImageContainer.appendChild(itemImage);
            listItem.appendChild(itemImageContainer);
            itemDetails.appendChild(itemNameElement);
            itemDetails.appendChild(itemQuantity);
            listItem.appendChild(itemDetails);
            listItem.appendChild(itemPrice);
            listItem.appendChild(removeButton);
            basketList.appendChild(listItem);
        }
    }

    // Update subtotal
    var subtotalElement = document.getElementById('subtotal');
    subtotalElement.innerText = 'Subtotal: $' + subtotal.toFixed(2);
}

// Function to handle search functionality
function handleSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.trim().toLowerCase(); // Get the search term and convert to lowercase

    var productContainer = document.querySelector('.product-container');
    var container = document.querySelector('.container');
    var homeBanner = document.querySelector('.home-banner');

    // Check if the search term is empty
    if (searchTerm === '') {
        container.style.display = 'flex'; // Show the container with the row and box divs
        homeBanner.style.display = 'block'; // Show the home banner
        productContainer.style.display = 'none'; // Hide the product container
    } else {
        container.style.display = 'none'; // Hide the container with the row and box divs
        homeBanner.style.display = 'none'; // Hide the home banner
        productContainer.style.display = 'flex'; // Show the product container
    }

    var productItems = document.querySelectorAll('.product-item'); // Get all product items

    // Loop through each product item
    productItems.forEach(function(item) {
        var productName = item.dataset.name.toLowerCase(); // Get the product name and convert to lowercase

        // Check if the product name contains the search term
        if (productName.includes(searchTerm)) {
            item.style.display = 'flex'; // Show the product item if it matches the search term
        } else {
            item.style.display = 'none'; // Hide the product item if it doesn't match the search term
        }
    });
}

// Attach event listener to the search input field
document.getElementById('searchInput').addEventListener('input', handleSearch);

// Add to Basket button click event handler
var addToBasketButtons = document.querySelectorAll('.add-to-basket');
addToBasketButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var productItem = button.closest('.product-item');
        var productName = productItem.dataset.name;
        var productPrice = parseFloat(productItem.dataset.price);
        var productImage = productItem.querySelector('.product-image').src;

        // Check if the product is already in the basket
        if (basketItems.hasOwnProperty(productName)) {
            basketItems[productName].quantity++; // Increase quantity if product already exists
        } else {
            basketItems[productName] = {
                price: productPrice,
                image: productImage,
                quantity: 1
            };
        }

        basketCount++; // Increment the basket count
        updateBasketCount(basketCount); // Update the basket count display
        openBasketMenu(); // Open the basket menu when an item is added
        renderBasketItems(); // Render basket items
    });
});



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
  
    // Close the popup when the close button is clicked
    closePopupButton.addEventListener("click", function () {
      closePopup();
      // Show the email subscription section
      emailSubscriptionSection.style.display = "block";
    });
  
    // Add event listener to the popup subscription form
    document.getElementById("popup-form").addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();
  
      // Perform any additional validation if needed
  
      // Set a cookie when the user submits the popup subscription form
      setCookie("subscribed", "true", 365); // Set the cookie to remember that the user has subscribed for 365 days
  
      // Close the popup after setting the cookie
      closePopup();
  
      // Show the thank you section
      showThankYouSection();
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
        const slideIndex2 = slideIndex * 3; // Calculate the index for the second set of slides
        slides2.style.transform = `translateX(-${slideIndex2 * (slideWidth2)}px)`; // Add padding or margin width
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
  
  
  
  
  