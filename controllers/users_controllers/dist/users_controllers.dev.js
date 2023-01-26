"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User_model = require('../../models/users/UserManagment_model');

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "index",
    value: function index(req, res) {
      var user, _ref, success, orders, error, _orders;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              user = req.user;
              _context.next = 4;
              return regeneratorRuntime.awrap(User_model.get_orders_by_user_id(user[0].id));

            case 4:
              _ref = _context.sent;
              success = _ref.success;
              orders = _ref.data;
              error = _ref.error;

              if (success) {
                console.log(orders);
                console.log(user);
                res.render('./user/profile.ejs', {
                  title: 'Mi perfil - Bouvier Artesanal',
                  orders: orders,
                  user: user
                });
              } else {
                console.log('naoo');
                _orders = false;
                res.render('./user/profile.ejs', {
                  title: 'Mi perfil - Bouvier Artesanal',
                  orders: _orders,
                  user: user
                });
              }

              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              res.status(404).send('Hubo un error inesperado.');

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  }, {
    key: "get_order_by_id",
    value: function get_order_by_id(req, res) {
      var user, order_id, _ref2, success, order, error;

      return regeneratorRuntime.async(function get_order_by_id$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              user = req.user;
              order_id = req.params.order_id;
              _context2.next = 5;
              return regeneratorRuntime.awrap(User_model.get_orders_by_id(order_id));

            case 5:
              _ref2 = _context2.sent;
              success = _ref2.success;
              order = _ref2.data;
              error = _ref2.error;
              console.log(order);

              if (!success) {
                _context2.next = 20;
                break;
              }

              if (!(order[0].user_id === user[0].id)) {
                _context2.next = 17;
                break;
              }

              console.log(order);
              console.log(req.params);
              return _context2.abrupt("return", res.send(order));

            case 17:
              return _context2.abrupt("return", res.status(401).send('Esa orden no es tuya wachin no flashes'));

            case 18:
              _context2.next = 21;
              break;

            case 20:
              return _context2.abrupt("return", res.status(404).send({
                error: error
              }));

            case 21:
              _context2.next = 26;
              break;

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](0);
              res.status(400).send(_context2.t0);

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 23]]);
    }
  }]);

  return User;
}();

;
module.exports = User;