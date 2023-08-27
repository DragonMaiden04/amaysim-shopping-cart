const {PRODUCT_CODES, PRODUCT_NAMES} = require('./shopping-cart-constants');

class ShoppingCart {
    #priceRule;
    #currentPromoCode;
    #cart;
    #validPromo;
    constructor(priceRule, currentPromoCode='I<3AMAYSIM') {
        this.#priceRule = priceRule;
        this.#currentPromoCode = currentPromoCode;
        this.#cart = {};
        this.#validPromo = false;
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
        if (this.#cart[PRODUCT_CODE] === undefined) {
            return 0;
        }
        let totalPrice = this.#cart[PRODUCT_CODE] * this.#priceRule[PRODUCT_CODE];
        if (this.#cart[PRODUCT_CODE] > 2) {
            const totalPromo = Math.trunc(this.#cart[PRODUCT_CODE] / 3);
            const promoQuantity = this.#cart[PRODUCT_CODE] - totalPromo;
            totalPrice = promoQuantity * this.#priceRule[PRODUCT_CODE];
        }
        return +totalPrice.toFixed(2);
    }
    #checkTotalPriceUlt5() {
        const PRODUCT_CODE = PRODUCT_CODES["UNLI5GB"];
        const PROMO_PRICE = 39.90;
        if (this.#cart[PRODUCT_CODE] === undefined) {
            return 0;
        }
        let totalPrice = this.#cart[PRODUCT_CODE] * this.#priceRule[PRODUCT_CODE];
        if (this.#cart[PRODUCT_CODE] > 3) {
            totalPrice = this.#cart[PRODUCT_CODE] * PROMO_PRICE;
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
        const copiedCart = Object.assign({}, this.#cart);
        const UNLI2GB = PRODUCT_CODES["UNLI2GB"];
        const DATAPACK1GB = PRODUCT_CODES["1GBDATAPACK"];
        if (copiedCart[UNLI2GB]) {
            copiedCart[DATAPACK1GB] = copiedCart[DATAPACK1GB] !== undefined ?  copiedCart[DATAPACK1GB] + copiedCart[UNLI2GB] : copiedCart[UNLI2GB];
            return copiedCart;
        }
        return copiedCart
    }
}
module.exports = ShoppingCart