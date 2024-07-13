// This document contains the functionality to enable the shopping cart page. 

// Create an array for the products for the storefront. Here are 3 products.
const products = [
    {
      name: "cherry",
      price: 5,
      quantity: 0,
      productId: 100,
      image: 'images/cherry.jpg',
    },
    {
      name: "orange",
      price: 6,
      quantity: 0,
      productId: 200,
      image: 'images/orange.jpg',
    },
    {
      name: "strawberry",
      price: 7,
      quantity: 0,
      productId: 300,
      image: 'images/strawberry.jpg',
    }
]; 

// Create the shopping cart
const cart = [];

// Helper function to get the product object from the id
function productObjectLookup(id) {
  return products.find(({ productId }) => productId === id)
}

// Matches the product based on ID and adds 1 to the quantity
function addProductToCart(id) {
  products.forEach(function(prod, index) {
    if(prod.productId === id) {
      prod.quantity += 1;
    };
  });

  // Check if the product is already in the cart. If it is not, then add it to the cart
  if(!cart.some(function(prod){
    return prod.productId === id;
  })) {
    cart.push(productObjectLookup(id));
  };
}

// Enable the "+" button to increase the quantity total of each item in the shopping cart
function increaseQuantity(id) {
  productObjectLookup(id).quantity += 1;
}

// Enable the "-" button to decrease the quantity total of each item in the shopping cart
function decreaseQuantity(id) {
  if(productObjectLookup(id).quantity > 0){
    productObjectLookup(id).quantity -= 1
  }
  if(productObjectLookup(id).quantity === 0) {
    removeFromCart(id);
  }
}

// Helper function to remove a product from the shopping cart
function removeFromCart(id) {
  let index = cart.findIndex(function(prod){return prod.productId === id}) // find the item in the array
  if(index !== -1) {
    cart.splice(index, 1); 
  }; // remove the item
}

// Removes a product from the shopping cart and sets the quantity to 0 
function removeProductFromCart(id) {
  productObjectLookup(id).quantity = 0;
  removeFromCart(id);
}

// Calculates the total price of the items in the shopping cart
function cartTotal() {
  let totalPrice = 0;
  cart.forEach(function(item, index) {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}


// Empties the entire cart
function emptyCart() {
  cart.splice(0, cart.length); // Empties cart
  products.forEach(function(prod, index) {
    products.quantity = 0;
  }); // Resets the quantities
}

// Payment flow to enable users to pay the bill
let totalPaid = 0;

function pay(amount) {
  totalPaid += amount;
  const remaining = totalPaid - cartTotal();
  if (remaining >= 0) {
    emptyCart();
    totalPaid = 0;
  } // Empties the cart and resets the cart once the bill gets to 0
  return remaining;
}

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
}
