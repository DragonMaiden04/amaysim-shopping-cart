const ShoppingCart = require('../shopping-cart');
describe('shopping cart - Different price rule, 1st month', () => {
    const priceRules = {
        "ult_small"  : 30.65,
        "ult_medium" : 35.90,
        "ult_large"  : 46.75,
        "1gb"        : 12.50
    };
    const expectedItems = [
        {
            "product_name": "Unlimited 1GB",
            "product_code": "ult_small",
            "count": 3
        },
        {
            "product_name": "Unlimited 5GB",
            "product_code": "ult_large",
            "count": 2
        },
        {
            "product_name": "Unlimited 2GB",
            "product_code": "ult_medium",
            "count": 3
        },
        {
            "product_name": "1 GB Data-pack",
            "product_code": "1gb",
            "count": 5
        }
    ];
    test('without promo', () => {
        let cart = new ShoppingCart(priceRules);
        //3 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //2 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        //5 Unli 2GB
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        //2 1gb Data pack
        cart.addToCart('1gb');
        cart.addToCart('1gb');
        cart.getTotalPrice();
        cart.showItems();
        //remove 2 Unli 2GB
        cart.removeFromCart('ult_medium');
        cart.removeFromCart('ult_medium');
        expect(cart.getTotalPrice()).toEqual('$287.50');
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('with promo', () => {
        let cart = new ShoppingCart(priceRules);
        //3 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //2 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        //3 Unli 2GB
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        //2 1gb Data pack
        cart.addToCart('1gb');
        cart.addToCart('1gb');
        cart.applyPromoCode("I<3AMAYSIM");
        expect(cart.getTotalPrice()).toEqual('$258.75');
        expect(cart.showItems()).toEqual(expectedItems);
    });
});
describe('shopping cart - Different price rule, not 1st month', () => {
    const priceRules = {
        "ult_small"  : 33.05,
        "ult_medium" : 40.90,
        "ult_large"  : 50.15,
        "1gb"        : 15.75
    };
    const expectedItems = [
        {
            "product_name": "Unlimited 1GB",
            "product_code": "ult_small",
            "count": 3
        },
        {
            "product_name": "Unlimited 5GB",
            "product_code": "ult_large",
            "count": 5
        },
        {
            "product_name": "Unlimited 2GB",
            "product_code": "ult_medium",
            "count": 1
        },
        {
            "product_name": "1 GB Data-pack",
            "product_code": "1gb",
            "count": 3
        }
    ];
    test('with promo', () => {
        let cart = new ShoppingCart(priceRules, undefined, false);
        //3 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        //2 Unli 5GB
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        cart.addToCart('ult_large');
        //1 Unli 2GB
        cart.addToCart('ult_medium');
        //2 1gb Data pack
        cart.addToCart('1gb');
        cart.addToCart('1gb');
        cart.applyPromoCode("I<3AMAYSIM");
        expect(cart.getTotalPrice()).toEqual('$380.07');
        expect(cart.showItems()).toEqual(expectedItems);
    });
});
