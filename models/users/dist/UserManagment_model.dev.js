"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../../config/db'),
    query = _require.query;

var UserManagment =
/*#__PURE__*/
function () {
  function UserManagment() {
    _classCallCheck(this, UserManagment);
  }

  _createClass(UserManagment, null, [{
    key: "users_list",
    value: function users_list() {
      var data;
      return regeneratorRuntime.async(function users_list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM users'));

            case 3:
              data = _context.sent;
              return _context.abrupt("return", {
                success: true,
                data: data
              });

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", {
                success: false,
                error: _context.t0
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "new_user",
    value: function new_user(keys, values) {
      var data;
      return regeneratorRuntime.async(function new_user$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(query("INSERT INTO users (".concat(keys.join(', '), ") VALUES (?)"), [values]));

            case 3:
              data = _context2.sent;
              return _context2.abrupt("return", {
                success: true,
                data: data
              });

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                success: false,
                error: _context2.t0
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "search_user",
    value: function search_user(email) {
      var data;
      return regeneratorRuntime.async(function search_user$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM users WHERE email = ?', [email]));

            case 3:
              data = _context3.sent;

              if (!(data.length === 0)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", {
                success: false,
                error: 'No se encontró un usuario con ese email'
              });

            case 6:
              return _context3.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", {
                success: false,
                error: _context3.t0
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "search_user_by_guid",
    value: function search_user_by_guid(guid) {
      var data;
      return regeneratorRuntime.async(function search_user_by_guid$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM users WHERE guid = ? LIMIT 1', [guid]));

            case 3:
              data = _context4.sent;

              if (!(data.length === 0)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", {
                success: false,
                error: 'No se encontró un usuario con ese email'
              });

            case 6:
              return _context4.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", {
                success: false,
                error: _context4.t0
              });

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "search_user_by_id",
    value: function search_user_by_id(id) {
      var data;
      return regeneratorRuntime.async(function search_user_by_id$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]));

            case 3:
              data = _context5.sent;

              if (!(data.length === 0)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", {
                success: false,
                error: 'No se encontró un usuario con ese email'
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
    key: "create_cart_by_guid",
    value: function create_cart_by_guid(guid, id) {
      var data, cart_created;
      return regeneratorRuntime.async(function create_cart_by_guid$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return regeneratorRuntime.awrap(query('UPDATE users SET cart_created = 1 WHERE guid = (?);', [guid]));

            case 3:
              data = _context6.sent;
              console.log(data.affectedRows);

              if (!(data.affectedRows !== 0)) {
                _context6.next = 12;
                break;
              }

              _context6.next = 8;
              return regeneratorRuntime.awrap(query('INSERT INTO user_cart(user_id, products, amount) VALUES(?,?,?)', [id, null, null]));

            case 8:
              cart_created = _context6.sent;

              if (!(data.length === 0 && cart_created.length === 0)) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", {
                success: false,
                error: 'No se encontró un usuario con ese guid'
              });

            case 11:
              return _context6.abrupt("return", {
                success: true,
                data: {
                  data: data,
                  cart_created: cart_created
                }
              });

            case 12:
              return _context6.abrupt("return", {
                success: false,
                error: 'No se encontró un usuario con ese guid'
              });

            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", {
                success: false,
                error: _context6.t0
              });

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 15]]);
    }
  }, {
    key: "add_to_cart_by_user_id",
    value: function add_to_cart_by_user_id(products, amount, user_id) {
      var data;
      return regeneratorRuntime.async(function add_to_cart_by_user_id$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(query("UPDATE user_cart SET products = (?), amount = ? WHERE user_id = ? ", [products, amount, user_id]));

            case 3:
              data = _context7.sent;

              if (!(data.affectedRows === 0)) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", {
                success: false,
                error: 'No se encontró un carrito con ese user_id'
              });

            case 6:
              return _context7.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", {
                success: false,
                error: _context7.t0
              });

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "get_cart_by_user_id",
    value: function get_cart_by_user_id(user_id) {
      var data;
      return regeneratorRuntime.async(function get_cart_by_user_id$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM user_cart WHERE user_id = ?', [user_id]));

            case 3:
              data = _context8.sent;

              if (!(data.length === 0)) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", {
                success: false,
                error: 'No se encontró un carrito con ese id'
              });

            case 6:
              return _context8.abrupt("return", {
                success: true,
                data: data
              });

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", {
                success: false,
                error: _context8.t0
              });

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "create_order",
    value: function create_order(keys, values) {
      var data;
      return regeneratorRuntime.async(function create_order$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return regeneratorRuntime.awrap(query("INSERT INTO orders(".concat(keys.join(', '), ") VALUES(?)"), [values]));

            case 3:
              data = _context9.sent;

              if (!(data.length === 0)) {
                _context9.next = 6;
                break;
              }

              return _context9.abrupt("return", {
                success: false,
                error: 'No se pudo crear la orden. Intenta nuevamente'
              });

            case 6:
              return _context9.abrupt("return", {
                success: true,
                data: data,
                error: false
              });

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", {
                success: false,
                error: _context9.t0
              });

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "emtpy_cart_when_order_by_user_id",
    value: function emtpy_cart_when_order_by_user_id(user_id) {
      var empty, data;
      return regeneratorRuntime.async(function emtpy_cart_when_order_by_user_id$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              empty = null;
              _context10.next = 4;
              return regeneratorRuntime.awrap(query('UPDATE user_cart SET products = ?, amount = 0 WHERE user_id = ?', [empty, user_id]));

            case 4:
              data = _context10.sent;

              if (!(data.lenght === 0)) {
                _context10.next = 7;
                break;
              }

              return _context10.abrupt("return", {
                success: false,
                error: 'No se pudo actualizar el estado final del carrito'
              });

            case 7:
              return _context10.abrupt("return", {
                success: true,
                data: data,
                error: false
              });

            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", {
                success: false,
                error: _context10.t0
              });

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }, {
    key: "get_orders_by_user_id",
    value: function get_orders_by_user_id(user_id) {
      var data;
      return regeneratorRuntime.async(function get_orders_by_user_id$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM orders WHERE user_id = ?', [user_id]));

            case 3:
              data = _context11.sent;

              if (!(data.length === 0)) {
                _context11.next = 6;
                break;
              }

              return _context11.abrupt("return", {
                success: false,
                error: 'No se encontraron ordenes para ese usuario'
              });

            case 6:
              return _context11.abrupt("return", {
                success: true,
                data: data,
                error: false
              });

            case 9:
              _context11.prev = 9;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", {
                success: false,
                error: _context11.t0
              });

            case 12:
            case "end":
              return _context11.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "get_orders_by_id",
    value: function get_orders_by_id(id) {
      var data;
      return regeneratorRuntime.async(function get_orders_by_id$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return regeneratorRuntime.awrap(query('SELECT * FROM orders WHERE id = ?', [id]));

            case 3:
              data = _context12.sent;

              if (!(data.length === 0 || data === undefined)) {
                _context12.next = 6;
                break;
              }

              return _context12.abrupt("return", {
                success: false,
                error: 'No se encontro esa orden'
              });

            case 6:
              return _context12.abrupt("return", {
                success: true,
                data: data,
                error: false
              });

            case 9:
              _context12.prev = 9;
              _context12.t0 = _context12["catch"](0);
              return _context12.abrupt("return", {
                success: false,
                error: _context12.t0
              });

            case 12:
            case "end":
              return _context12.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }]);

  return UserManagment;
}();

module.exports = UserManagment;