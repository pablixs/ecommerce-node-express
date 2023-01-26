"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User_model = require('../models/users/UserManagment_model');

var Product_model = require('../models/products/Products');

var _require = require('bcrypt'),
    hashSync = _require.hashSync,
    compareSync = _require.compareSync;

var jwt = require('jsonwebtoken');

var _require2 = require('uuid'),
    uuidv4 = _require2.v4;

var Index =
/*#__PURE__*/
function () {
  function Index() {
    _classCallCheck(this, Index);
  }

  _createClass(Index, null, [{
    key: "index",
    value: function index(req, res) {
      var _ref, success, categories, error, _ref2, success_two, some_products, error_two;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(Product_model.get_categories());

            case 3:
              _ref = _context.sent;
              success = _ref.success;
              categories = _ref.data;
              error = _ref.error;
              _context.next = 9;
              return regeneratorRuntime.awrap(Product_model.get_randoms_products(6));

            case 9:
              _ref2 = _context.sent;
              success_two = _ref2.success;
              some_products = _ref2.data;
              error_two = _ref2.error;

              // res.send({"message":"Welcome to Bouvier Artesanal"})
              if (success && success_two) {
                res.render('./index/index.ejs', {
                  title: "Bouvier Artesanal - Cosmética Natural",
                  categories: categories,
                  some_products: some_products
                });
              } else {
                res.status(404).send(error);
              }

              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              res.status(404).send(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 16]]);
    }
  }, {
    key: "login",
    value: function login(req, res) {
      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              res.render('index/login.ejs', {
                title: "Iniciar sesión - Bouvier Artesanal"
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "register",
    value: function register(req, res) {
      return regeneratorRuntime.async(function register$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              res.render('./index/register', {
                title: "Registrarme - Bouvier Artesanal"
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "register_post",
    value: function register_post(req, res) {
      var _req$body, email, password, phone, first_name, last_name, guid, passwordHash, new_user, keys, values, _ref3, success, data, error;

      return regeneratorRuntime.async(function register_post$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password, phone = _req$body.phone, first_name = _req$body.first_name, last_name = _req$body.last_name;
              guid = uuidv4();
              console.log(email, password);
              passwordHash = hashSync(password, 10);
              new_user = {
                guid: guid,
                email: email,
                password: passwordHash,
                phone: phone,
                first_name: first_name,
                last_name: last_name
              };
              keys = Object.keys(new_user);
              values = Object.values(new_user);
              _context4.next = 9;
              return regeneratorRuntime.awrap(User_model.new_user(keys, values));

            case 9:
              _ref3 = _context4.sent;
              success = _ref3.success;
              data = _ref3.data;
              error = _ref3.error;

              if (success) {
                res.redirect('./login');
              } else {
                res.send(error);
              }

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "login_post",
    value: function login_post(req, res) {
      var _req$body2, bodyEmail, bodyPassword, _ref4, success, user, error, payload, token;

      return regeneratorRuntime.async(function login_post$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _req$body2 = req.body, bodyEmail = _req$body2.email, bodyPassword = _req$body2.password;
              console.log(bodyEmail, bodyPassword);
              _context5.next = 4;
              return regeneratorRuntime.awrap(User_model.search_user(bodyEmail));

            case 4:
              _ref4 = _context5.sent;
              success = _ref4.success;
              user = _ref4.data;
              error = _ref4.error;
              console.log(user);

              if (!success) {
                _context5.next = 21;
                break;
              }

              if (compareSync(bodyPassword, user[0].password)) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(401).send({
                message: 'Incorrect password'
              }));

            case 12:
              payload = {
                email: user[0].email,
                id: user[0].id
              };
              console.log(user[0].email);
              console.log(user[0].id);
              console.log("This is the payload: ".concat(payload));
              token = jwt.sign(payload, "Mega secret", {
                expiresIn: "30d"
              });
              res.cookie('jwt', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
              });
              return _context5.abrupt("return", res.status(200).send({
                success: true,
                message: 'Logged in successfully',
                token: "Bearer ".concat(token),
                link: 'You can access to your profile: https://localhost:3000/perfil'
              }));

            case 21:
              console.log(error);
              res.sendStatus(404);

            case 23:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      return regeneratorRuntime.async(function logout$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              res.clearCookie('jwt');
              res.redirect('/');

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return Index;
}();

;
module.exports = Index;