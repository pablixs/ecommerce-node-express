function is_product_in_cart(cart, product_id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product_id) {
            return true;
        }
    }
    return false;
}


function calculate_amount(cart) {
    amount = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_price) {
            amount += (cart[i].product_price);
        }
    }
    return amount;
}


// module.exports = is_product_in_cart, calculate_amount;
exports.is_product_in_cart = is_product_in_cart;
exports.calculate_amount = calculate_amount;