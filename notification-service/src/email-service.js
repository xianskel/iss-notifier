import * as nodemailer from "nodemailer";
import { config } from "../config";

var transporter = nodemailer.createTransport(config.email);

export const sendMail = message => {
  transporter.sendMail(
    {
      to: message.email,
      subject: "ISS Notification",
      html: "<p>Your html here</p>"
    },
    function(err, info) {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};
