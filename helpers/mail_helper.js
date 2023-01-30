const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'your.mail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'your-user',
        pass: 'your-pw'
    }
});

class Mail {
    static async order_created(user_email){
        try {
            let info = await transporter.sendMail({
                from: '"Bouvier Artesanal 🍃" <info@bouvierartesanal.com.ar>',
                to: user_email,
                subject: 'Tu pedido fue creado. Abonala para confirmarlo!',
                text: 'Probando text',
                html: "<h1>Tu pedido fue creado rey</h1>"
    
            })
            return {
                success: true,
                data: info.messageId
            }
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }
}

module.exports = Mail;
