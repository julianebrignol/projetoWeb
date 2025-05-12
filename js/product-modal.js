import { addToCart } from "./cart.js";

function handleProductModal() {
  // get modal elements
  const productModal = document.getElementById("productModal");
  const modalTitle = document.getElementById("productModalLabel");
  const modalPrice = document.getElementById("productModalPrice");
  const modalDescription = document.getElementById("productModalDescription");
  const quantityInput = document.getElementById("quantityInput");
  const decreaseBtn = document.getElementById("decreaseQuantity");
  const increaseBtn = document.getElementById("increaseQuantity");
  const sizeSelect = document.getElementById("sizeSelect");
  const addToCartBtn = document.getElementById("addToCartBtn");

  // Remove existing event listeners before adding new ones
  // when change page and new products are loaded
  const oldButtons = document.querySelectorAll(".modal-product");
  oldButtons.forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });

  // instantiate current product object
  let currentProduct = null;

  // handle product click and update modal content
  document.querySelectorAll(".modal-product").forEach((product) => {
    product.addEventListener("click", function () {
      // get data from data attributes (data-*)
      // update current product object properties
      currentProduct = {
        title: this.dataset.productTitle,
        id: this.dataset.productId, // unique product ID for cart operations
        price: this.dataset.productPrice,
        description: this.dataset.productDescription,
        image: this.dataset.productImage,
        discount: this.dataset.productDiscount,
        oldPrice: this.dataset.productPriceOld,
      };

      // update modal title and description
      modalTitle.textContent = currentProduct.title;
      modalDescription.textContent = currentProduct.description;

      // set default quantity to 1
      quantityInput.value = "1";

      // update modal image
      const modalImage = productModal.querySelector(".img-fluid");
      if (modalImage && currentProduct.image) {
        modalImage.src = currentProduct.image;
      }

      // handle price display
      modalPrice.textContent = `${currentProduct.price} EUR`;

      // handle old price display
      const modalOldPrice = productModal.querySelector("#productModalOldPrice");

      // if old price exists, show it and update color
      if (currentProduct.oldPrice) {
        modalOldPrice.textContent = `${currentProduct.oldPrice} EUR`;

        // show old price
        modalOldPrice.classList.add("d-block");
        modalOldPrice.classList.remove("d-none");

        // update modal price color
        modalPrice.classList.add("text-special-price");
      } else {
        // if old price doesn't exist, hide it
        modalOldPrice.classList.add("d-none");
        modalOldPrice.classList.remove("d-block");

        // update modal price color
        modalPrice.classList.remove("text-special-price");
      }

      // handle discount element
      const discountElement = productModal.querySelector(
        "#productModalDiscount"
      );

      if (currentProduct.discount) {
        discountElement.textContent = `menos ${currentProduct.discount}%`;
        discountElement.classList.add("d-block");
        discountElement.classList.remove("d-none");
      } else {
        discountElement.classList.add("d-none");
        discountElement.classList.remove("d-block");
      }
    });
  });

  // Create a single instance of the quantity handlers
  const handleDecrease = function () {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  };

  const handleIncrease = function () {
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  };

  // Remove old listeners and add new ones for quantity buttons
  decreaseBtn.replaceWith(decreaseBtn.cloneNode(true));
  increaseBtn.replaceWith(increaseBtn.cloneNode(true));
  
  // Get fresh references after cloning
  document.getElementById("decreaseQuantity").addEventListener("click", handleDecrease);
  document.getElementById("increaseQuantity").addEventListener("click", handleIncrease);

  // handle add to cart button click
  addToCartBtn.addEventListener("click", function () {
    const selectedSize = sizeSelect.value;
    const quantity = parseInt(quantityInput.value);

    // check if size is selected
    if (!selectedSize) {
      // Add validation class to show the select in red
      sizeSelect.classList.add('is-invalid');
      
      // Focus on the size select to draw attention
      sizeSelect.focus();
  
      return;
    }
    
    // Remove validation class if size is selected
    sizeSelect.classList.remove('is-invalid');

    // create cart item object with product details, selected size and quantity
    const modalItem = {
      ...currentProduct,
      size: selectedSize,
      quantity: quantity,
    };

    // map cartItem to match expected format
    const cartItem = {
      id: modalItem.id,
      title: modalItem.title,
      description: modalItem.title,
      price: parseFloat(modalItem.price), // convert string price to number
      image: modalItem.image.replace("../", "/"), // remove the first two dots from the path
      size: modalItem.size,
      quantity: modalItem.quantity,
    };

    // add item to cart
    addToCart(cartItem);

    // reset modal values
    sizeSelect.value = ""; // reset size select
    quantityInput.value = "1"; // reset quantity
    currentProduct = null; // reset current product

    // close the modal after successful add to cart item
    const modalInstance = bootstrap.Modal.getInstance(productModal);
    modalInstance.hide();
  });

  // Add event listener to remove validation styling when user selects a size
  sizeSelect.addEventListener('change', function() {
    if (this.value) {
      this.classList.remove('is-invalid');
    }
  });
}

export { handleProductModal };
