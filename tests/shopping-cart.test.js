const ShoppingCart = require('../shopping-cart');

describe('test shopping cart', () => {
    test('Scenario 1', () => {
        let priceRules = {
            "ult_small"  : 24.90,
            "ult_medium" : 29.90,
            "ult_large"  : 44.90,
            "1gb"        : 9.90
        };
        let cart = new ShoppingCart(priceRules, 'I<3AMAYSIM');
        cart.add('ult_small');
        console.log(cart.checkPromotionForUlt1());
    });
});