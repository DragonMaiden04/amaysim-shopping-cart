# Amaysim shopping cart exercise - Alyssa Mae Basalo

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
1. `priceRule` (Class parameter) - Object
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
2. Expected Cart Total - String
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
3. Expected Cart Items - Array of objects
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
4. Items Added by the user - Object
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

