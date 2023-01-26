"use strict";

var Product_model = require('../models/products/Products');

function is_product_in_cart(cart, product_id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product_id === product_id) {
      return true;
    }
  }

  return false;
}

function detect_product_in_the_cart(cart, product_id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product_id === product_id) {
      return i;
    }
  }

  return false;
}

function add_if_is_in_cart(cart, product) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product_id === product.product_id) {
      var add_new = {
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: cart[i].product_price + product.product_price * product.product_quantity,
        product_quantity: product.product_quantity + cart[i].product_quantity
      };
      cart.splice(cart.indexOf(i), 1);
      console.log(cart);
      return cart.push(add_new);
    }
  }
}

function calculate_amount(cart) {
  amount = 0;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product_price) {
      amount += cart[i].product_price;
    }
  }

  return amount;
} //* Return true or fale


function detect_stock(product) {
  var _ref, success, product_from_db, error;

  return regeneratorRuntime.async(function detect_stock$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product_model.get_product_by_id(product.product_id));

        case 2:
          _ref = _context.sent;
          success = _ref.success;
          product_from_db = _ref.data;
          error = _ref.error;

          if (!success) {
            _context.next = 12;
            break;
          }

          if (!(product.product_quantity <= product_from_db[0].stock)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", true);

        case 9:
          return _context.abrupt("return", false);

        case 12:
          return _context.abrupt("return", false);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function remove_stock_quantity(product_quantity, product_id) {
  var _ref2, success, product_stock_changed, error;

  return regeneratorRuntime.async(function remove_stock_quantity$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('!!!!!');
          console.log(product_quantity);
          console.log(product_id);
          console.log('!!!!!');
          _context2.next = 6;
          return regeneratorRuntime.awrap(Product_model.change_stock_products(product_quantity, product_id));

        case 6:
          _ref2 = _context2.sent;
          success = _ref2.success;
          product_stock_changed = _ref2.data;
          error = _ref2.error;
          console.log(product_stock_changed);

          if (!success) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", true);

        case 15:
          return _context2.abrupt("return", false);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
} // module.exports = is_product_in_cart, calculate_amount;


exports.is_product_in_cart = is_product_in_cart;
exports.calculate_amount = calculate_amount;
exports.add_if_is_in_cart = add_if_is_in_cart;
exports.detect_product_in_the_cart = detect_product_in_the_cart;
exports.detect_stock = detect_stock;
exports.remove_stock_quantity = remove_stock_quantity;