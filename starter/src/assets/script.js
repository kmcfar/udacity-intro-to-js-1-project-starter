/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

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
]; // we have 3 products in our shop

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

//helper function to get the product object from the id
function productObjectLookup(id) {
  return products.find(({ productId }) => productId === id)
}

function addProductToCart(id) {
  //Get the product from the product id
  //increase the quantity of the product
  products.forEach(function(prod, index) {
    if(prod.productId === id) {
      prod.quantity += 1;
    };
  });
  //check if the product is already in the cart. If it is not, then add it to the cart
  if(!cart.some(function(prod){
    return prod.productId === id;
  })) {
    cart.push(productObjectLookup(id));
  };
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(id) {
  productObjectLookup(id).quantity += 1;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function removeFromCart(id) {
  let index = cart.findIndex(function(prod){return prod.productId === id}) // find the item in the array
  if(index !== -1) {
    cart.splice(index, 1); 
  }; // remove the item
}

function decreaseQuantity(id) {
  if(productObjectLookup(id).quantity > 0){
    productObjectLookup(id).quantity -= 1
  }
  if(productObjectLookup(id).quantity === 0) {
    removeFromCart(id);
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(id) {
  productObjectLookup(id).quantity = 0;
  removeFromCart(id);
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

function cartTotal() {
  let totalPrice = 0;
  cart.forEach(function(item, index) {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  cart.splice(0, cart.length); // empties cart
  products.forEach(function(prod, index) {
    products.quantity = 0;
  }); // resets the quantities
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

let totalPaid = 0;

// enable users to continue to pay down the bill
function pay(amount) {
  totalPaid += amount;
  const remaining = totalPaid - cartTotal();
  if (remaining >= 0) {
    emptyCart();
    totalPaid = 0;
  } //empties the cart and resets the cart
  return remaining;
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/
//pay function "fails" the tests, but works in functionality. the code that works in functionality doesn't pass the tests. It looks like the tests may be using only a single action: i.e. the code that passes doesn't work if the user inputs a second payment. 

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

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
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
