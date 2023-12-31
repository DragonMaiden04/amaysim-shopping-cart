const PRODUCT_CODES = {
    "UNLI1GB"     : "ult_small",
    "UNLI2GB"     : "ult_medium",
    "UNLI5GB"     : "ult_large",
    "1GBDATAPACK" : "1gb"
}

const PRODUCT_NAMES =  {
    "ult_small"  : "Unlimited 1GB",
    "ult_medium" : "Unlimited 2GB",
    "ult_large"  : "Unlimited 5GB",
    "1gb"        : "1 GB Data-pack"
}

const PROMO_PRICE_5GB = 39.90;

const DEFAULT_PRICE_RULES = {
    "ult_small"  : 24.90,
    "ult_medium" : 29.90,
    "ult_large"  : 44.90,
    "1gb"        : 9.90
}; 
module.exports = {
    PRODUCT_CODES, 
    PRODUCT_NAMES,
    PROMO_PRICE_5GB,
    DEFAULT_PRICE_RULES
}