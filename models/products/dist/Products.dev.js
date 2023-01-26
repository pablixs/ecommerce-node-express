"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../../config/db'),
    query = _require.query;

var Products =
/*#__PURE__*/
function () {
  function Products() {
    _classCallCheck(this, Products);
  }

  _createClass(Products, null, [{
    key: "get_categories",
    value: function get_categories() {
      var data;
      return regeneratorRuntime.async(function get_categories$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(query('SELECT * FROM product_category'));

            case 2:
              data = _context.sent;

              if (!(data.length === 0)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", {
                success: false,
                error: 'No se encontraron categorias'
              });

            case 5:
              _context.prev = 5;
              return _context.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](5);
              return _context.abrupt("return", {
                success: false,
                error: _context.t0
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[5, 9]]);
    }
  }, {
    key: "get_product_by_category",
    value: function get_product_by_category(id) {
      var data;
      return regeneratorRuntime.async(function get_product_by_category$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(query('SELECT * FROM products WHERE category_id = ?', [id]));

            case 2:
              data = _context2.sent;
              _context2.prev = 3;

              if (!(data.length === 0)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", {
                success: false,
                error: 'No se encontraron categorias'
              });

            case 6:
              return _context2.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", {
                success: false,
                error: _context2.t0
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[3, 9]]);
    }
  }, {
    key: "new_product",
    value: function new_product(name, short_description, category_id, stock, price) {
      var convert, data;
      return regeneratorRuntime.async(function new_product$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              convert = function convert() {
                return name.toLowerCase().replace(/[á]/g, 'a').replace(/[é]/g, 'e').replace(/[í]/g, 'i').replace(/[ó]/g, 'o').replace(/[ú]/g, 'u').replace(/[\s]/g, '-').replace(/[^\w ]+/g, '-');
              };

              console.log(convert());
              _context3.next = 4;
              return regeneratorRuntime.awrap(query('INSERT INTO products(name,name_url,short_description,category_id,stock,price) VALUES (?,?,?,?,?,?)', [name, convert(), short_description, category_id, stock, price]));

            case 4:
              data = _context3.sent;
              _context3.prev = 5;

              if (!(data.length === 0)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", {
                success: false,
                error: 'No se encontraron categorias'
              });

            case 8:
              return _context3.abrupt("return", {
                success: true,
                data: data
              });

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](5);
              return _context3.abrupt("return", {
                success: false,
                error: _context3.t0
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[5, 11]]);
    }
  }, {
    key: "get_product_by_id",
    value: function get_product_by_id(id) {
      var data;
      return regeneratorRuntime.async(function get_product_by_id$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(query('SELECT * FROM products WHERE id = ?', [id]));

            case 2:
              data = _context4.sent;
              _context4.prev = 3;

              if (!(data.length === 0)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", {
                success: false,
                error: 'No se encontro producto con ese id'
              });

            case 6:
              return _context4.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", {
                success: false,
                error: _context4.t0
              });

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[3, 9]]);
    }
  }, {
    key: "get_randoms_products",
    value: function get_randoms_products(quantity) {
      var data;
      return regeneratorRuntime.async(function get_randoms_products$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM products ORDER BY RAND() LIMIT ?', [quantity]));

            case 3:
              data = _context5.sent;

              if (!(data.length === 0)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", {
                success: false,
                error: 'No se pudieron encontrar los productos.'
              });

            case 6:
              return _context5.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", {
                success: false,
                error: _context5.t0
              });

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "change_stock_products",
    value: function change_stock_products(product_quantity, product_id) {
      var data;
      return regeneratorRuntime.async(function change_stock_products$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return regeneratorRuntime.awrap(query('UPDATE products SET stock = stock - ? WHERE id = ?', [product_quantity, product_id]));

            case 3:
              data = _context6.sent;

              if (!(data.length === 0 || data.affectedRows === 0)) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", {
                success: false,
                error: 'No se pudo restar el stock de ese producto.'
              });

            case 6:
              return _context6.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", {
                success: false,
                error: _context6.t0
              });

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return Products;
}();

;
module.exports = Products;