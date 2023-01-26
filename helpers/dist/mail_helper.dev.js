"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'mail.bouvierartesanal.com.ar',
  port: 465,
  secure: true,
  auth: {
    user: 'info@bouvierartesanal.com.ar',
    pass: 'Hachigatsujuunana147258!'
  }
});

var Mail =
/*#__PURE__*/
function () {
  function Mail() {
    _classCallCheck(this, Mail);
  }

  _createClass(Mail, null, [{
    key: "order_created",
    value: function order_created(user_email) {
      var info;
      return regeneratorRuntime.async(function order_created$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(transporter.sendMail({
                from: '"Bouvier Artesanal 🍃" <info@bouvierartesanal.com.ar>',
                to: user_email,
                subject: 'Tu pedido fue creado. Abonala para confirmarlo!',
                text: 'Probando text',
                html: "<h1>Tu pedido fue creado rey</h1>"
              }));

            case 3:
              info = _context.sent;
              return _context.abrupt("return", {
                success: true,
                data: info.messageId
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
  }]);

  return Mail;
}();

module.exports = Mail;