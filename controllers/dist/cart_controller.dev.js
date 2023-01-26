"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User_model = require('../models/users/UserManagment_model');

var Product_model = require('../models/products/Products');

var cart_helper = require('../helpers/cart_helper');

var mail_helper = require('../helpers/mail_helper');

var Cart =
/*#__PURE__*/
function () {
  function Cart() {
    _classCallCheck(this, Cart);
  }

  _createClass(Cart, null, [{
    key: "index",
    value: function index(req, res) {
      var errorMessage, user, _ref, success, carrito, error, products, _products;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              errorMessage = '';
              user = req.user;
              _context.next = 4;
              return regeneratorRuntime.awrap(User_model.get_cart_by_user_id(user[0].id));

            case 4:
              _ref = _context.sent;
              success = _ref.success;
              carrito = _ref.data;
              error = _ref.error;

              if (!success) {
                _context.next = 14;
                break;
              }

              products = JSON.parse(carrito[0].products);
              console.log(carrito);
              return _context.abrupt("return", res.render('./cart/cart.ejs', {
                title: "Carrito - Bouvier Artesanal",
                products: products,
                user: user,
                carrito: carrito,
                errorMessage: errorMessage
              }));

            case 14:
              _products = false;
              return _context.abrupt("return", res.render('./cart/cart.ejs', {
                products: _products,
                title: "Carrito - Bouvier Artesanal",
                user: user
              }));

            case 16:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "add_to_cart",
    value: function add_to_cart(req, res) {
      var cart, user, _ref2, success, data, error, _ref3, second_success, last_cart, second_error, product, amount, _ref4, third_success, response, third_error;

      return regeneratorRuntime.async(function add_to_cart$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cart = [];
              _context2.prev = 1;
              user = req.user;

              if (!(user[0].cart_created === 0)) {
                _context2.next = 14;
                break;
              }

              _context2.next = 6;
              return regeneratorRuntime.awrap(User_model.create_cart_by_guid(user[0].guid, user[0].id));

            case 6:
              _ref2 = _context2.sent;
              success = _ref2.success;
              data = _ref2.data;
              error = _ref2.error;

              if (success) {
                _context2.next = 13;
                break;
              }

              res.send(error);
              return _context2.abrupt("return");

            case 13:
              console.log(data);

            case 14:
              _context2.next = 16;
              return regeneratorRuntime.awrap(User_model.get_cart_by_user_id(user[0].id));

            case 16:
              _ref3 = _context2.sent;
              second_success = _ref3.success;
              last_cart = _ref3.data;
              second_error = _ref3.error;

              if (last_cart[0].products !== null) {
                cart = JSON.parse(last_cart[0].products);
              } //** starting to work with the new objects to add to the cart */


              product = req.body;
              _context2.next = 24;
              return regeneratorRuntime.awrap(cart_helper.detect_stock(product));

            case 24:
              _context2.t0 = _context2.sent;

              if (!(_context2.t0 !== true)) {
                _context2.next = 27;
                break;
              }

              return _context2.abrupt("return", res.status(404).send('No hay stock de ese producto'));

            case 27:
              _context2.next = 29;
              return regeneratorRuntime.awrap(!cart_helper.is_product_in_cart(cart, product.product_id));

            case 29:
              if (!_context2.sent) {
                _context2.next = 34;
                break;
              }

              product.product_price *= product.product_quantity;
              cart.push(product);
              _context2.next = 35;
              break;

            case 34:
              cart_helper.add_if_is_in_cart(cart, product);

            case 35:
              ;
              amount = cart_helper.calculate_amount(cart); // cart.push(product)

              console.log(cart);
              cart = JSON.stringify(cart);
              cart = cart.replace(/[\[\]]/g, '');
              console.log('CART REPLACED []');
              cart = '[' + cart + ']';
              console.log(cart);
              _context2.next = 45;
              return regeneratorRuntime.awrap(User_model.add_to_cart_by_user_id(cart, amount, user[0].id));

            case 45:
              _ref4 = _context2.sent;
              third_success = _ref4.success;
              response = _ref4.data;
              third_error = _ref4.error;

              if (!third_success) {
                _context2.next = 54;
                break;
              }

              console.log(response);
              return _context2.abrupt("return", res.send({
                user: user,
                product: product
              }));

            case 54:
              res.status(404).send('Algo salió mal');

            case 55:
              _context2.next = 61;
              break;

            case 57:
              _context2.prev = 57;
              _context2.t1 = _context2["catch"](1);
              console.log(_context2.t1);
              res.send({
                error: _context2.t1
              });

            case 61:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 57]]);
    }
  }, {
    key: "remove_from_cart",
    value: function remove_from_cart(req, res) {
      var cart, user, _req$params, product_id_q, product_quantity_q, _ref5, success, last_cart, error, position_match, _ref6, success_two, product_by_id, error_two, amount, _ref7, success_third, response, third_error;

      return regeneratorRuntime.async(function remove_from_cart$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cart = [];
              _context3.prev = 1;
              user = req.user;

              if (!(user[0].cart_created === 0)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(401).send('No tienes un carrito'));

            case 5:
              _req$params = req.params, product_id_q = _req$params.id, product_quantity_q = _req$params.quantity;
              product_id_q = parseFloat(product_id_q);
              product_quantity_q = parseFloat(product_quantity_q);
              _context3.next = 10;
              return regeneratorRuntime.awrap(User_model.get_cart_by_user_id(user[0].id));

            case 10:
              _ref5 = _context3.sent;
              success = _ref5.success;
              last_cart = _ref5.data;
              error = _ref5.error;

              if (!(isNaN(product_id_q) || isNaN(product_quantity_q))) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('Introduce caracteres validos'));

            case 16:
              if (!success) {
                _context3.next = 52;
                break;
              }

              if (!(last_cart[0].products === null || last_cart[0].products.length <= 0)) {
                _context3.next = 19;
                break;
              }

              return _context3.abrupt("return", res.send('No tienes elementos para eliminar del carrito'));

            case 19:
              cart = JSON.parse(last_cart[0].products);
              console.log(cart);

              if (cart_helper.is_product_in_cart(cart, product_id_q)) {
                _context3.next = 23;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('No tienes ese producto para quitar del carrito'));

            case 23:
              position_match = cart_helper.detect_product_in_the_cart(cart, product_id_q);
              _context3.next = 26;
              return regeneratorRuntime.awrap(Product_model.get_product_by_id(product_id_q));

            case 26:
              _ref6 = _context3.sent;
              success_two = _ref6.success;
              product_by_id = _ref6.data;
              error_two = _ref6.error;

              if (!success_two) {
                _context3.next = 49;
                break;
              }

              console.log(product_by_id);

              if (!(cart[position_match].product_quantity < product_quantity_q)) {
                _context3.next = 34;
                break;
              }

              return _context3.abrupt("return", res.send('No puedes eliminar más elementos de los que posees'));

            case 34:
              if (cart[position_match].product_quantity <= product_quantity_q) {
                console.log('Hay una sola cantidad y el producto se va a eliminar completamente del carrito');
                cart.splice(position_match, 1);
              } else if (cart[position_match].product_quantity === product_quantity_q) {
                console.log('El producto debe ser eliminado completamente ya que se van a eliminar la totalidad de sus cantidades');
                cart.splice(position_match, 1);
              } else {
                cart[position_match].product_quantity -= product_quantity_q;
                cart[position_match].product_price -= parseFloat(product_by_id[0].price) * product_quantity_q;
              }

              console.log(cart);
              amount = cart_helper.calculate_amount(cart);
              cart = JSON.stringify(cart);
              cart = cart.replace(/[\[\]]/g, '');
              cart = '[' + cart + ']';
              _context3.next = 42;
              return regeneratorRuntime.awrap(User_model.add_to_cart_by_user_id(cart, amount, user[0].id));

            case 42:
              _ref7 = _context3.sent;
              success_third = _ref7.success;
              response = _ref7.data;
              third_error = _ref7.error;

              if (success_third) {
                console.log(response);
                res.send({
                  user: user,
                  cart: JSON.parse(cart)
                });
              } else {
                res.status(404).send('Algo salió mal');
              }

              _context3.next = 50;
              break;

            case 49:
              res.status(404).send({
                'Algo salio mal 2': error_two
              });

            case 50:
              _context3.next = 53;
              break;

            case 52:
              res.status(404).send('Algo salio mal');

            case 53:
              _context3.next = 58;
              break;

            case 55:
              _context3.prev = 55;
              _context3.t0 = _context3["catch"](1);
              res.status(404).send(_context3.t0);

            case 58:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 55]]);
    }
  }, {
    key: "create_order",
    value: function create_order(req, res) {
      var errorMessage, user, _ref8, success, cart, error, cart_stock, i, _i, order_items, order_keys, order_values, _ref9, success_two, order_created, error_two, _ref10, success_three, cart_updated, error_three, _ref11, success_mail, mail_data, error_mail;

      return regeneratorRuntime.async(function create_order$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              errorMessage = '';
              user = req.user;
              _context4.next = 5;
              return regeneratorRuntime.awrap(User_model.get_cart_by_user_id(user[0].id));

            case 5:
              _ref8 = _context4.sent;
              success = _ref8.success;
              cart = _ref8.data;
              error = _ref8.error;

              if (!success) {
                _context4.next = 75;
                break;
              }

              _context4.next = 12;
              return regeneratorRuntime.awrap(JSON.parse(cart[0].products));

            case 12:
              cart_stock = _context4.sent;
              i = 0;

            case 14:
              if (!(i < cart_stock.length)) {
                _context4.next = 25;
                break;
              }

              console.log(cart_stock[i]);
              _context4.next = 18;
              return regeneratorRuntime.awrap(cart_helper.detect_stock(cart_stock[i]));

            case 18:
              _context4.t0 = _context4.sent;

              if (!(_context4.t0 !== true)) {
                _context4.next = 22;
                break;
              }

              errorMessage = 'No hay suficiente stock de ese producto';
              return _context4.abrupt("return", res.redirect("../carrito?error=".concat(errorMessage)));

            case 22:
              i++;
              _context4.next = 14;
              break;

            case 25:
              _i = 0;

            case 26:
              if (!(_i < cart_stock.length)) {
                _context4.next = 36;
                break;
              }

              _context4.next = 29;
              return regeneratorRuntime.awrap(cart_helper.remove_stock_quantity(cart_stock[_i].product_quantity, cart_stock[_i].product_id));

            case 29:
              _context4.t1 = _context4.sent;

              if (!(_context4.t1 !== true)) {
                _context4.next = 32;
                break;
              }

              return _context4.abrupt("return", res.status(404).send('No se pudo descontar el stock'));

            case 32:
              ;

            case 33:
              _i++;
              _context4.next = 26;
              break;

            case 36:
              order_items = {
                user_id: user[0].id,
                // method: req.body.method,
                products: cart[0].products,
                total: cart[0].amount
              };
              order_keys = Object.keys(order_items);
              order_values = Object.values(order_items);
              _context4.next = 41;
              return regeneratorRuntime.awrap(User_model.create_order(order_keys, order_values));

            case 41:
              _ref9 = _context4.sent;
              success_two = _ref9.success;
              order_created = _ref9.data;
              error_two = _ref9.error;

              if (!success_two) {
                _context4.next = 71;
                break;
              }

              _context4.next = 48;
              return regeneratorRuntime.awrap(User_model.emtpy_cart_when_order_by_user_id(user[0].id));

            case 48:
              _ref10 = _context4.sent;
              success_three = _ref10.success;
              cart_updated = _ref10.data;
              error_three = _ref10.error;

              if (!success_three) {
                _context4.next = 67;
                break;
              }

              _context4.next = 55;
              return regeneratorRuntime.awrap(mail_helper.order_created(user[0].email));

            case 55:
              _ref11 = _context4.sent;
              success_mail = _ref11.success;
              mail_data = _ref11.data;
              error_mail = _ref11.error;

              if (!success_mail) {
                _context4.next = 64;
                break;
              }

              console.log(order_created, cart_updated, mail_data);
              return _context4.abrupt("return", res.redirect("../perfil/orden/00000".concat(order_created.insertId)));

            case 64:
              return _context4.abrupt("return", res.status(404).send({
                error: error_mail,
                message: 'No se pudo enviar el mail'
              }));

            case 65:
              _context4.next = 69;
              break;

            case 67:
              console.log(error_three);
              return _context4.abrupt("return", res.status(403).send('No se pudo crear la orden'));

            case 69:
              _context4.next = 73;
              break;

            case 71:
              console.log(error_two);
              return _context4.abrupt("return", res.status(404).send('No se pudo crear la orden.'));

            case 73:
              _context4.next = 76;
              break;

            case 75:
              return _context4.abrupt("return", res.status(404).send('No se encontró un carrito con ese id'));

            case 76:
              _context4.next = 82;
              break;

            case 78:
              _context4.prev = 78;
              _context4.t2 = _context4["catch"](0);
              console.log(_context4.t2);
              res.status(404).send({
                message: 'Algo salió mal',
                error: _context4.t2
              });

            case 82:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 78]]);
    }
  }]);

  return Cart;
}();

module.exports = Cart;