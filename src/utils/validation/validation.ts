import { body } from "express-validator";

const email = body("email").isEmail();
const password = body("password").exists();
const company = body("company").exists();
const username = body("username").exists();
const mobile = body("mobile").exists();
const image = body("image").exists();

const title = body("title").exists();
const price = body("price").exists();
const desc = body("desc").exists();
const genre = body("genre").exists();

export const userSignUpValidation = [email, password, username, mobile];

export const sellerSignUpValidation = [
  email,
  password,
  company,
  username,
  mobile,
];

export const loginValidation = [email, password];

export const addToBook = [title, price, genre, desc];

export const validator = {
  loginValidation,
  userSignUpValidation,
  sellerSignUpValidation,
};
