# Amaysim shopping cart exercise - Alyssa Mae Basalo
Contents:
- [Prerequisites](#prerequisites)
- [How to run or use the application](#how-to-run-or-use-the-application)
- [How to run test cases](#how-to-run-test-cases)
- [Input and Expected Result Formats](#input-and-expected-result-formats)
- [Other Sample Usage](#other-sample-usage)
## Prerequisites
- **Node.js:** [Node.js](https://nodejs.org/) version 18.16.0 or higher is required.
- **npm:** [npm](https://www.npmjs.com/) version 9.5 or higher is required.
- **jest:** [jest](https://github.com/jestjs/jest) version 29.6.4 or higher is required.

## How to run or use the application
- I have created a sample js file that utilizes the class created. 
- You can freely modify the file to perform desired test scenarios
- To run the sample js file, use this command:
    ```
    node run-sample.js
    ```
-  Alternatively, you can also add test case scenarios on the test files. You can locate the test files inside the folder **"tests"**.

## How to run test cases
- Make sure to install dependencies first which is Jest (for testing purposes only)
    ```
    npm i
    ```
- To run the test cases, you can use this command:
    ```
    npm run test
    ```
- To run the test cases with coverage result,  you can use this command:
    ```
    npm run test:coverage
    ```
    - Coverage result (index.html) will be at `./coverage/lcov-report` folder

## Input and Expected Result Formats
1. **`priceRule` (Class parameter) - Object**
    - Make sure to have a price for all 4 products
    - object key should be the price code
    - object value should be a number
    - Sample:
        ```javascript
        const priceRules = {
            "ult_small"  : 30.65,
            "ult_medium" : 35.90,
            "ult_large"  : 46.75,
            "1gb"        : 12.50
        };

        let cart = new ShoppingCart(priceRules);
        // If no price rule is passed on class, it will use the default price object declared in `shopping-cart-constants.js`
        ```
2. **Expected Cart Total - String**
    - Sample Usage:
        ```javascript
            const ShoppingCart = require('./shopping-cart');
            let cart = new ShoppingCart();
            // Pass the product code you desire to add
            cart.addToCart('ult_small');
            console.log(`Total: ${cart.getTotalPrice()}`);
        ```
    - Result:
        ```
        Total: $24.90
        ```
3. **Expected Cart Items - Array of objects**
    - Sample Usage:
        ```javascript
            const ShoppingCart = require('./shopping-cart');
            let cart = new ShoppingCart();
            // Pass the product code you desire to add
            cart.addToCart('ult_small');
            cart.addToCart('ult_large');
            console.log(cart.showItems());
        ```
    - Sample Result:
        ```javascript
            [
                {
                    "product_name": "Unlimited 1GB",
                    "product_code": "ult_small",
                    "count": 1
                },
                {
                    "product_name": "Unlimited 5GB",
                    "product_code": "ult_large",
                    "count": 1
                }
            ];
        ```
4. **Items Added by the user - Object**
    - Object key is the product code
    - Object value is the product quantity or count
    - Sample Usage:
        ```javascript
            const ShoppingCart = require('./shopping-cart');
            let cart = new ShoppingCart();
            // Pass the product code you desire to add
            cart.addToCart('ult_small');
            cart.addToCart('ult_medium');
            console.log(cart.viewCart());
        ```
    - Sample Result:
        ```javascript
            {
                "ult_small"  : 1,
                "ult_medium" : 1,
            };
        ```
## Other Sample Usage
- Flexible price rule, promo code rule for 10% discount is 'I<3AMAYSIM' and firt month computation will be applied on cart.
```javascript
        const priceRules = {
            "ult_small"  : 30.65,
            "ult_medium" : 35.90,
            "ult_large"  : 46.75,
            "1gb"        : 12.50
        };

        let cart = new ShoppingCart(priceRules);
        cart.addToCart('ult_small');
        //Customer adds promocode
        cart.applyPromoCode("I<3AMAYSIM");

        //...
```
- Flexible price rule, promo code rule for 10% discount is 'AMAZING' and firt month computation will be applied on cart.
```javascript
        const priceRules = {
            "ult_small"  : 30.65,
            "ult_medium" : 35.90,
            "ult_large"  : 46.75,
            "1gb"        : 12.50
        };

        let cart = new ShoppingCart(priceRules, "AMAZING");
        cart.addToCart('ult_small');
        cart.addToCart('ult_large');
        //Customer adds promocode
        cart.applyPromoCode("TEST"); // no 10% discount is applied since promo code rule is set to "AMAZING"
        console.log(cart.showItems());
        console.log(`Total: ${cart.getTotalPrice()}`);
```
- **Default** price rule, promo code rule for 10% discount is 'I<3AMAYSIM' and special offers with first month rule will not be applied on cart.
```javascript
        let cart = new ShoppingCart(undefined, undefined, false); // Default price and Default Promo code is used
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_small');
        cart.addToCart('ult_large');
        //Customer adds promocode
        cart.applyPromoCode("I<3AMAYSIM"); //10% discount is applied since default promo code rule is 'I<3AMAYSIM'
        console.log(cart.showItems());
        console.log(`Total: ${cart.getTotalPrice()}`); // 3 for 2 rule for UNLI 1gb is not applied since its only applicable on the first month
```
