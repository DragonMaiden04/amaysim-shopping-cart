const ShoppingCart = require('../shopping-cart');
const priceRules = {
    "ult_small"  : 24.90,
    "ult_medium" : 29.90,
    "ult_large"  : 44.90,
    "1gb"        : 9.90
};
describe('shopping cart - 1st month', () => {
    test('Scenario 1', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 3
            },
            {
                "product_name": "Unlimited 5GB",
                "product_code": "ult_large",
                "count": 1
            }
        ];
        let cart = new ShoppingCart(priceRules);
        //3 Unli 1GB
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        // 1 Unli 5GB
        cart.addToCart('ult_large');
        expect(cart.getTotalPrice()).toEqual('$94.70');
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Scenario 2', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 2
            },
            {
                "product_name": "Unlimited 5GB",
                "product_code": "ult_large",
                "count": 4
            }
        ];
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
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Scenario 3', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 1
            },
            {
                "product_name": "Unlimited 2GB",
                "product_code": "ult_medium",
                "count": 2
            },
            {
                "product_name": "1 GB Data-pack",
                "product_code": "1gb",
                "count": 2
            }
        ];
        let cart = new ShoppingCart(priceRules);
        //1 Unli 1GB
        cart.addToCart('ult_small');
        //2 Unli 2GB
        cart.addToCart('ult_medium');
        cart.addToCart('ult_medium');
        expect(cart.getTotalPrice()).toEqual('$84.70');
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Scenario 4', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 1
            },
            {
                "product_name": "1 GB Data-pack",
                "product_code": "1gb",
                "count": 1
            }
        ];
        let cart = new ShoppingCart(priceRules);
        //1 Unli 1GB
        cart.addToCart('ult_small');
        //1 1GB data pack
        cart.addToCart('1gb');
        cart.applyPromoCode('I<3AMAYSIM');
        expect(cart.getTotalPrice()).toEqual('$31.32');
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Additional Scenario with valid promo code', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 2
            },
            {
                "product_name": "Unlimited 5GB",
                "product_code": "ult_large",
                "count": 4
            }
        ];
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
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Additional Scenario with invalid promo code', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 2
            },
            {
                "product_name": "Unlimited 5GB",
                "product_code": "ult_large",
                "count": 3
            }
        ];
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
        expect(cart.showItems()).toEqual(expectedItems);
    });
    test('Additional Scenario with new promo code rule', () => {
        const expectedItems = [
            {
                "product_name": "Unlimited 1GB",
                "product_code": "ult_small",
                "count": 2
            },
            {
                "product_name": "Unlimited 5GB",
                "product_code": "ult_large",
                "count": 3
            }
        ];
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
        expect(cart.showItems()).toEqual(expectedItems);
    });
});