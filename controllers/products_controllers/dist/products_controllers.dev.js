"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../../config/db'),
    query = _require.query;

var Products_model = require('../../models/products/Products.js');

var handleQueryResult = require('../../helpers/handleQueryResult');

var Products =
/*#__PURE__*/
function () {
  function Products() {
    _classCallCheck(this, Products);
  }

  _createClass(Products, null, [{
    key: "index",
    value: function index(req, res) {
      var _ref, success, data, error;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Products_model.get_categories());

            case 2:
              _ref = _context.sent;
              success = _ref.success;
              data = _ref.data;
              error = _ref.error;
              console.log(data);

              if (success) {
                // res.send(data)
                res.render('./index/productos.ejs', {
                  title: "Productos - Bouvier Artesanal"
                });
              } else {
                res.send(error);
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "category",
    value: function category(req, res) {
      var _ref2, success, categories, error, query_category, categorias, coincidences, _ref3, newSuccess, products, newError, products_handled;

      return regeneratorRuntime.async(function category$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(Products_model.get_categories());

            case 3:
              _ref2 = _context2.sent;
              success = _ref2.success;
              categories = _ref2.data;
              error = _ref2.error;
              query_category = req.params.category;
              categorias = handleQueryResult(success, categories, error);
              console.log(categorias);
              coincidences = categorias.findIndex(function (categorias) {
                return categorias.name === query_category;
              });

              if (!(coincidences !== -1)) {
                _context2.next = 22;
                break;
              }

              _context2.next = 14;
              return regeneratorRuntime.awrap(Products_model.get_product_by_category(categories[coincidences].id));

            case 14:
              _ref3 = _context2.sent;
              newSuccess = _ref3.success;
              products = _ref3.data;
              newError = _ref3.error;
              products_handled = handleQueryResult(newSuccess, products, newError);
              res.send({
                'Esta es la categoria que coincide': categories[coincidences],
                'Estos son los productos que coinciden con la categoria': products_handled
              });
              _context2.next = 23;
              break;

            case 22:
              res.send({
                "message": "No hubo categorias con ese nombre"
              });

            case 23:
              _context2.next = 28;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](0);
              res.sendStatus(404);

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 25]]);
    }
  }, {
    key: "category_product",
    value: function category_product(req, res) {
      var _ref4, success, categories, error, categories_handled, _req$params, query_category, query_product, coincidences, _ref5, newSuccess, product, newError, product_handled, final_product;

      return regeneratorRuntime.async(function category_product$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(Products_model.get_categories());

            case 3:
              _ref4 = _context3.sent;
              success = _ref4.success;
              categories = _ref4.data;
              error = _ref4.error;
              categories_handled = handleQueryResult(success, categories, error);
              _req$params = req.params, query_category = _req$params.category, query_product = _req$params.product;
              coincidences = categories_handled.findIndex(function (categories_handled) {
                return categories_handled.name === query_category;
              });

              if (!(coincidences !== -1)) {
                _context3.next = 22;
                break;
              }

              _context3.next = 13;
              return regeneratorRuntime.awrap(Products_model.get_product_by_category(categories[coincidences].id));

            case 13:
              _ref5 = _context3.sent;
              newSuccess = _ref5.success;
              product = _ref5.data;
              newError = _ref5.error;
              product_handled = handleQueryResult(newSuccess, product, newError);
              final_product = product_handled.findIndex(function (product_handled) {
                return product_handled.name_url === query_product;
              });

              if (final_product !== -1) {
                res.status(200).send({
                  'Esta es la categoria que coincide': categories[coincidences],
                  'Estos son los productos que coinciden con la url': product_handled[final_product]
                });
              } else {
                res.status(404).send('No se encontró un producto con ese url');
              }

              _context3.next = 23;
              break;

            case 22:
              res.send({
                "message": "No hubo categorias con ese nombre"
              });

            case 23:
              _context3.next = 29;
              break;

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              res.status(404).send(_context3.t0);

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 25]]);
    }
  }, {
    key: "add_product",
    value: function add_product(req, res) {
      var _req$body, name, short_description, category_id, stock, price, _ref6, success, data, error;

      return regeneratorRuntime.async(function add_product$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, short_description = _req$body.short_description, category_id = _req$body.category_id, stock = _req$body.stock, price = _req$body.price;
              _context4.next = 3;
              return regeneratorRuntime.awrap(Products_model.new_product(name, short_description, category_id, stock, price));

            case 3:
              _ref6 = _context4.sent;
              success = _ref6.success;
              data = _ref6.data;
              error = _ref6.error;

              if (success) {
                res.send(data);
              } else {
                res.sendStatus(404).send({
                  "message": "No se pudo añadir el nuevo producto",
                  error: error
                });
              }

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return Products;
}();

;
module.exports = Products;