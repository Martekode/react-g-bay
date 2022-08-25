const nodemailer = require("nodemailer");
async function sendBoughtMail(buyer, seller, product) {
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
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }
      return nodemailer.getTestMessageUrl(info);
    });
  });
}
async function sendSoldMail(buyer, seller, product) {
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
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return nodemailer.getTestMessageUrl(info);
    });
  });
}

module.exports = sendBoughtMail;
module.exports = sendSoldMail;
