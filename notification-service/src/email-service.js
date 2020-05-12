import * as nodemailer from "nodemailer";
import * as moment from "moment";
import { config } from "../config";
import logger from "./logger";

var transporter = nodemailer.createTransport(config.email);

export const sendMail = (message) => {
  logger.info("Sending mail to: " + message.email);
  let html = "<h4>The ISS will next pass your location on:</h4>";
  message.data.forEach((pass) => {
    html += `<p>Date: ${formatDate(pass.risetime)}   Duration: ${formatDuration(
      pass.duration
    )} </p>`;
  });
  transporter.sendMail(
    {
      to: message.email,
      subject: "ISS Notification",
      html: html,
    },
    function (err, info) {
      if (err) logger.error(err);
    }
  );
};

const formatDuration = (milli) => {
  let duration = parseInt(milli);
  return `${Math.floor(duration / 60)} mins, ${duration % 66} secs`;
};

const formatDate = (milli) => {
  let date = moment.unix(parseInt(milli));
  return date.format("MMMM Do YYYY, h:mm:ss a");
};
