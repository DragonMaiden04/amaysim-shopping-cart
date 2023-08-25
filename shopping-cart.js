class ShoppingCart {
    constructor(priceRule, currentPromoCode) {
        this.priceRule = priceRule;
        this.currentPromoCode = currentPromoCode;
        this.cart = {};
        this.validPromo = false;
    }
    new() {
        return this.priceRule;
    }
    add(productCode) {
        if (this.cart[productCode] === undefined) {
            this.cart[productCode] = 1;
            return
        }
        this.cart[productCode]++;
    }
    remove(productCode) {
        if (this.cart[productCode] === undefined) {
            return
        }
        if (this.cart[productCode] > 1) {
            this.cart[productCode]--;
            return
        }
        delete this.cart[productCode];
    }
    addPromoCode(inputCode) {
        if (inputCode === this.currentPromoCode) {
            this.validPromo = true;
            return
        }
        this.validPromo = false;
    }
    viewCart() {
        return this.cart;
    }
    total() {
        if (Object.keys(this.cart).length === 0) {
            return 'Cart is empty';
        }
        return this.cart;
    }
    items() {

    }
    checkPromotionForUlt1() {
        const productCode = 'ult_small';
        if (this.cart[productCode] > 2) {
            let totalPromo = Math.trunc(this.cart[productCode] / 3);
            let promoQuantity = this.cart[productCode] - totalPromo;
            let totalPrice = promoQuantity * this.priceRule[productCode];
            return totalPrice.toFixed(2);
        }
        let totalPrice = this.cart[productCode] * this.priceRule[productCode];
        return totalPrice.toFixed(2);
    }
}
module.exports = ShoppingCart