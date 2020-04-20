import * as nodemailer from "nodemailer";
import { config } from "../config";
import logger from "./logger";

var transporter = nodemailer.createTransport(config.email);

export const sendMail = (message) => {
  logger.info("Sending mail to: " + message.email);
  transporter.sendMail(
    {
      to: message.email,
      subject: "ISS Notification",
      html: "<p>Your html here</p>",
    },
    function (err, info) {
      if (err) logger.error(err);
    }
  );
};
