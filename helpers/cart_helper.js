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

function add_if_is_in_cart(cart, product_body){
    let index = cart.findIndex(product => product.product_id === product_body.product_id);

    let add_new = {
        product_id: product_body.product_id,
        product_name: product_body.product_name,
        product_price: cart[index].product_price + product_body.product_price * product_body.product_quantity,
        product_quantity: product_body.product_quantity + cart[index].product_quantity
    }

    if(index !== -1){
       return cart.splice(index, 1, add_new)
    }

}

function calculate_amount(cart) {
    amount = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_price) {
            amount += (cart[i].product_price) * cart[i].product_quantity;
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

async function remove_stock_quantity(product_quantity, product_id){
    console.log('!!!!!')
    console.log(product_quantity)
    console.log(product_id)
    console.log('!!!!!')
    const { success, data:product_stock_changed, error } = await Product_model.change_stock_products(product_quantity, product_id);
    console.log(product_stock_changed)
    if(success){
        return true
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
exports.remove_stock_quantity = remove_stock_quantity;