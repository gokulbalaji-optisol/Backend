import * as nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");
require("dotenv").config();
export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: `${process.env.NODEMAILER_EMAIL}`,
    pass: `${process.env.NODEMAILER_PASS}`,
  },
});

export const mailService = { transport };
