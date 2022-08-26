const nodemailer = require("nodemailer");

async function sendSoldMail(buyer, seller, product) {
  // GenerateFakeMail
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }
      // Setup mail account
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      // create message
      let message = {
        from: buyer.email,
        to: seller.email,
        subject: "Your product was sold at G-bay!",
        text: `${buyer.name} decided to purchase your ${product.name} for the full price of ${product.price}!, if you have any issues shipping the product please contact the seller directly at ${seller.email}`,
        html: `
        <style>
              img{
                  border-radius:50%
              }
              .help-text{
                  font-size:.9rem
              }
      </style>
        <h2>${buyer.name} told us they can't wait till their ${product.name} arrives!</h2>
        <p>For the full price of €${product.price}, nice profits!</p>
        <p>Time to say goodbye now :(</p>
        <img src="${product.image_url}"></img>
        <p>Have a wonderfull day over there ${seller.name}!</p>
        <p>Kind Regards! G-Bay</p>
        </br>
        <p class="help-text">If you would like our help please do contact us at customerservice@gbay.org</p>`,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          reject("Somethign Went Wrong in the mailer");
          return process.exit(1);
        }

        // Preview only available when sending through an Ethereal account
        resolve(nodemailer.getTestMessageUrl(info));
      });
    });
  });
}
module.exports = sendSoldMail;
