const {PRODUCT_CODES, PRODUCT_NAMES, PROMO_PRICE_5GB} = require('./shopping-cart-constants');
/**
 * Shopping Cart
 * @author Alyssa Mae Basalo
 * @since August 25 2023
 */
class ShoppingCart {
    #priceRule;
    #currentPromoCode;
    #cart;
    #validPromo;
    #isFirstMonth;
    /**
     * Shopping Cart constructor
     * @param {object} priceRule - Price rule that will be used
     * @param {string} currentPromoCode - Promo code rule
     * @param {boolean} isFirstMonth - Is the computation will be based on the first month
     */
    constructor(priceRule, currentPromoCode='I<3AMAYSIM', isFirstMonth=true) {
        this.#priceRule = priceRule;
        this.#currentPromoCode = currentPromoCode;
        this.#cart = {};
        this.#validPromo = false;
        this.#isFirstMonth = isFirstMonth;
    }
    /**
     * Adds 1 quantity on the passed product code
     * @param {string} productCode 
     * @returns void
     */
    addToCart(productCode) {
        if (this.#cart[productCode] === undefined) {
            this.#cart[productCode] = 1;
            return
        }
        this.#cart[productCode]++;
    }
    /**
     * Removes 1 quantity on the passed product code
     * @param {string} productCode 
     * @returns 
     */
    removeFromCart(productCode) {
        if (this.#cart[productCode] === undefined) {
            return
        }
        if (this.#cart[productCode] > 1) {
            this.#cart[productCode]--;
            return
        }
        delete this.#cart[productCode];
    }
    /**
     * Returns the all products added in the cart by the user
     * @returns {object}
     */
    viewCart() {
        return this.#cart;
    }
    /**
     * Checks if input promo code is valid
     * @param {string} inputCode 
     * @returns void
     */
    applyPromoCode(inputCode) {
        if (inputCode === this.#currentPromoCode) {
            this.#validPromo = true;
            return
        }
        this.#validPromo = false;
    }
    /**
     * Show expected cart items
     * @returns {array}
     */
    showItems() {
        const expectedItems = this.#addPromoItems();
        let itemList = [];
        for (const key in expectedItems) {
            itemList.push({
                "product_code" : key,
                "product_name" : PRODUCT_NAMES[key],
                "count"        : expectedItems[key]
            });
        }
        return itemList;
    }
    /**
     * Returns expected total price of the cart
     * @returns {string} 
     */
    getTotalPrice() {
        if (Object.keys(this.#cart).length === 0) {
            return 'Cart is empty';
        }
        const totalUlt1 = this.#checkTotalPriceUlt1();
        const totalUlt2 = this.#checkPriceWithoutPromo(PRODUCT_CODES["UNLI2GB"]);
        const totalUlt5 = this.#checkTotalPriceUlt5();
        const totalDataPack = this.#checkPriceWithoutPromo(PRODUCT_CODES["1GBDATAPACK"]);
        let totalprice = totalUlt1 + totalUlt2 + totalUlt5 + totalDataPack;

        if (this.#validPromo === true) {
            const discount = .1;
            const totalDiscount = totalprice * discount;
            totalprice = totalprice - totalDiscount;
        }
        return `$${totalprice.toFixed(2)}`;
    }
    /**
     * Gets the total price for Unlimited 1GB based on the special offers
     * @returns {Number}
     */
    #checkTotalPriceUlt1() {
        const PRODUCT_CODE = PRODUCT_CODES["UNLI1GB"];
        const productQuantity = this.#cart[PRODUCT_CODE];
        const price = this.#priceRule[PRODUCT_CODE];
        if (productQuantity === undefined) {
            return 0;
        }
        let totalPrice = productQuantity * price;
        if (productQuantity > 2 && this.#isFirstMonth === true) {
            const quotient = Math.trunc(productQuantity / 3);
            const promoQuantity = productQuantity - quotient;
            totalPrice = promoQuantity * price;
        }
        return +totalPrice.toFixed(2);
    }
    /**
     * Gets the total price for Unlimited 5GB based on the special offers
     * @returns {Number}
     */
    #checkTotalPriceUlt5() {
        const PRODUCT_CODE = PRODUCT_CODES["UNLI5GB"];
        const productQuantity = this.#cart[PRODUCT_CODE];
        const price = this.#priceRule[PRODUCT_CODE];
        if (productQuantity === undefined) {
            return 0;
        }
        let totalPrice = productQuantity * price;
        if (productQuantity > 3 && this.#isFirstMonth === true) {
            totalPrice = productQuantity * PROMO_PRICE_5GB;
        }
        return +totalPrice.toFixed(2);
    }
    /**
     * Gets the total price for the passed product Code
     * @param {string} productCode 
     * @returns {Number}
     */
    #checkPriceWithoutPromo(productCode) {
        if (this.#cart[productCode] === undefined) {
            return 0;
        }
        let totalPrice = this.#cart[productCode] * this.#priceRule[productCode];
        return +totalPrice.toFixed(2);
    }
    /**
     * Returns expected product list and count based on the special offers
     * @returns {object}
     */
    #addPromoItems() {
        let expectedCart = Object.assign({}, this.#cart);
        const UNLI2GB = PRODUCT_CODES["UNLI2GB"];
        const DATAPACK1GB = PRODUCT_CODES["1GBDATAPACK"];
        if (expectedCart[UNLI2GB]) {
            expectedCart[DATAPACK1GB] = expectedCart[DATAPACK1GB] !== undefined ?  expectedCart[DATAPACK1GB] + expectedCart[UNLI2GB] : expectedCart[UNLI2GB];
            return expectedCart;
        }
        return expectedCart
    }
}
module.exports = ShoppingCart