const ShoppingCart = require('../shopping-cart');
const priceRules = {
    "ult_small"  : 24.90,
    "ult_medium" : 29.90,
    "ult_large"  : 44.90,
    "1gb"        : 9.90
};
describe('test shopping cart', () => {
    test('Scenario 1', () => {
        let cart = new ShoppingCart(priceRules);
        //3 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        // 1 Unli 5GB
        cart.addToCart('ult_large');
        expect(cart.getTotalPrice()).toEqual('$94.70');
    });
    test('Scenario 2', () => {
        let cart = new ShoppingCart(priceRules);
        //2 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //4 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        expect(cart.getTotalPrice()).toEqual('$209.40');
    });
    test('Scenario 3', () => {
        let cart = new ShoppingCart(priceRules);
        //1 Unli 1GB
        cart.addToCart('ult_small');
        //2 Unli 2GB
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        expect(cart.getTotalPrice()).toEqual('$84.70');
    });
    test('Scenario 4', () => {
        let cart = new ShoppingCart(priceRules);
        //1 Unli 1GB
        cart.addToCart('ult_small');
        //1 1GB data pack
        cart.addToCart('1gb');
        cart.applyPromoCode('I<3AMAYSIM');
        expect(cart.getTotalPrice()).toEqual('$31.32');
    });
    test('Additional Scenario with valid promo code', () => {
        let cart = new ShoppingCart(priceRules);
        //2 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //4 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.applyPromoCode('I<3AMAYSIM');
        expect(cart.getTotalPrice()).toEqual('$188.46');
    });
    test('Additional Scenario with invalid promo code', () => {
        let cart = new ShoppingCart(priceRules);
        //2 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //3 Unli 5GB only
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.applyPromoCode('JETT');
        expect(cart.getTotalPrice()).toEqual('$184.50');
    });
    test('Additional Scenario with new promo code', () => {
        let cart = new ShoppingCart(priceRules, 'AMAZING');
        //2 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //3 Unli 5GB only
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.applyPromoCode('AMAZING');
        expect(cart.getTotalPrice()).toEqual('$166.05');
    });
    test('test', () => {
        let cart = new ShoppingCart(priceRules, 'AMAZING');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('1gb');
        //3 Unli 5GB only
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        console.log(cart.showItems());
    });
});