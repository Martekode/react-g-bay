const nodemailer = require("nodemailer");
async function sendBoughtMail(buyer, seller, product) {
  return new Promise((resolve, reject) => {
    // GenerateFakeMail
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
        from: seller.email,
        to: buyer.email,
        subject: "Thank you for your purchase at G-Bay!",
        text: `${seller.name} told us they are very happy to ship your purchase straight to you!, if something goes wrong please reach out straight to them first at ${seller.email}`,
        html: `
      <style>
            img{
                border-radius:50%
            }
            .help-text{
                font-size:.9rem
            }
    </style>
      <h2>${seller.name} told us they are very happy to ship the product to you soon!</h2>
      <p>All this goodness, for only € ${product.price}</p>
      <img src="${product.image_url}"></img>
      <p>Have a wonderfull day over there ${buyer.name}!</p>
      <p>Kind Regards! G-Bay</p>
      </br>
      <p class="help-text">Should you not receive your package within the next two weeks you can contact the seller at: ${seller.email}</p>
      <p class="help-text">If you would like our help please do contact us at customerservice@gbay.org</p>`,
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
          reject("Somethign Went wrong in the mail for the Buyer!");
          console.log("Error occurred. " + err.message);
          return process.exit(1);
        }
        resolve(nodemailer.getTestMessageUrl(info));
      });
    });
  });
}

module.exports = sendBoughtMail;
