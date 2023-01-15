const Product_model = require('../models/products/Products')

function is_product_in_cart(cart, product_id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product_id) {
            return true;
        }
    }
    return false;
}

function detect_product_in_the_cart(cart, product_id){
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product_id) {
            return i;
        }
    }
    return false;
}

function add_if_is_in_cart(cart, product){
    for(let i = 0; i < cart.length; i++){
        if (cart[i].product_id === product.product_id){
            let add_new = {
                product_id: product.product_id,
                product_name: product.product_name,
                product_price: cart[i].product_price + product.product_price * product.product_quantity,
                product_quantity: product.product_quantity + cart[i].product_quantity
            }
            cart.splice(cart.indexOf(i), 1);
            console.log(cart)
            return cart.push(add_new)
        }
    }
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
//* Return true or fale
async function detect_stock(product){
    const { success, data:product_from_db, error } = await Product_model.get_product_by_id(product.product_id);
    if(success){
        if (product.product_quantity <= product_from_db[0].stock) {
            return true;
        }
        return false;
    } else {
        return false;
    }
}

// module.exports = is_product_in_cart, calculate_amount;
exports.is_product_in_cart = is_product_in_cart;
exports.calculate_amount = calculate_amount;
exports.add_if_is_in_cart = add_if_is_in_cart;
exports.detect_product_in_the_cart = detect_product_in_the_cart;
exports.detect_stock = detect_stock;