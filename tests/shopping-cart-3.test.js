const ShoppingCart = require('../shopping-cart');
describe('shopping cart - not 1st month', () => {
    const priceRules = {
        "ult_small"  : 24.90,
        "ult_medium" : 29.90,
        "ult_large"  : 44.90,
        "1gb"        : 9.90
    };
    const expectedItems = [
        {
            "product_name": "Unlimited 1GB",
            "product_code": "ult_small",
            "count": 4
        },
        {
            "product_name": "Unlimited 5GB",
            "product_code": "ult_large",
            "count": 4
        },
        {
            "product_name": "Unlimited 2GB",
            "product_code": "ult_medium",
            "count": 1
        },
        {
            "product_name": "1 GB Data-pack",
            "product_code": "1gb",
            "count": 1
        }
    ];
    test('Default price rules without promo', () => {
        let cart = new ShoppingCart(priceRules, undefined, false);
        //4 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //4 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        // 1 Unli 2GB
        cart.addToCart('ult_medium');
        expect(cart.getTotalPrice()).toEqual('$309.10');
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Default price rules with promo', () => {
        let cart = new ShoppingCart(priceRules, undefined, false);
        //4 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //4 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        // 1 Unli 2GB
        cart.addToCart('ult_medium');
        cart.applyPromoCode("I<3AMAYSIM");
        expect(cart.getTotalPrice()).toEqual('$278.19');
        expect(cart.showItems()).toEqual(expectedItems);
    });
});