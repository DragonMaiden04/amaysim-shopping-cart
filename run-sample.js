const ShoppingCart = require('./shopping-cart');
//default price, promo code and firt month computation will be applied on cart
let cart = new ShoppingCart();

// Pass the product code you desire to add
cart.addToCart('ult_small');
cart.addToCart('ult_small');
cart.addToCart('ult_small');
cart.addToCart('ult_large');
cart.removeFromCart('ult_large');
cart.removeFromCart('ult_large');
cart.removeFromCart('ult_large');
cart.addToCart('ult_large');
cart.addToCart('ult_medium');
cart.addToCart('1gb');
console.log(`Total: ${cart.getTotalPrice()}`);
console.log(cart.showItems());
console.log(cart.viewCart());