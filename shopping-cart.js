const {PRODUCT_CODES, PRODUCT_NAMES, PROMO_PRICE_5GB} = require('./shopping-cart-constants');

class ShoppingCart {
    #priceRule;
    #currentPromoCode;
    #cart;
    #validPromo;
    #isFirstMonth;
    constructor(priceRule, currentPromoCode='I<3AMAYSIM', isFirstMonth=true) {
        this.#priceRule = priceRule;
        this.#currentPromoCode = currentPromoCode;
        this.#cart = {};
        this.#validPromo = false;
        this.#isFirstMonth = isFirstMonth;
    }
    addToCart(productCode) {
        if (this.#cart[productCode] === undefined) {
            this.#cart[productCode] = 1;
            return
        }
        this.#cart[productCode]++;
    }
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
    viewCart() {
        return this.#cart;
    }
    applyPromoCode(inputCode) {
        if (inputCode === this.#currentPromoCode) {
            this.#validPromo = true;
            return
        }
        this.#validPromo = false;
    }
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
    #checkPriceWithoutPromo(productCode) {
        if (this.#cart[productCode] === undefined) {
            return 0;
        }
        let totalPrice = this.#cart[productCode] * this.#priceRule[productCode];
        return +totalPrice.toFixed(2);
    }
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