import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import config, { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";
import * as crypto from "crypto";
import { findUser, saveUser, userServices } from "../services/userServices";
import { mailService } from "../services/mailServices";
import { authServices } from "../services/authServices";
import { validationResult } from "express-validator";
import * as debug from "debug";
class AuthController {
  static logout = async (req: Request, res: Response) => {};

  static signup = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password, email, mobile } = req.body;
    let user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.mobile = mobile;

    console.log(req.baseUrl, req.originalUrl);
    let role;
    if (req.baseUrl == "/seller") {
      role = Userroles.SELLER;
      user.company = req.body.company;
    } else {
      role = Userroles.USER;
    }

    console.log(role);
    const UserRolesRepository = AppDataSource.getRepository(UserRoles);
    let roles = await UserRolesRepository.findOne({ where: { role } });
    if (roles == null) {
      console.log("create new role", role);
      roles = await UserRolesRepository.save({ role });
    }

    user.userrole = roles;
    console.log(user);
    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use

    const userRepository = AppDataSource.getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send(e);
      return;
    }

    res.status(201).send("User created");
  };

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    const validationErrors = validationResult(req);
    console.log(validationErrors, !validationErrors.isEmpty(), email, password);
    if (!validationErrors.isEmpty()) {
      return res.status(400).send(validationErrors);
    }
    //Get user from database
    const userRepository = AppDataSource.getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOne({
        where: { email: email },
        relations: ["userrole"],
      });
    } catch (error) {
      console.log("user error login", error);
      res.status(401).send(error);
    }

    //Check if encrypted password match
    console.log(user);
    console.log("passw = ", password);
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send({ statusMessage: "Wrong Password" });
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.userrole.role },
      config.jwtSecret
    );
    let userdata = {
      username: user.username,
      role: user.userrole.role,
    };
    //Send the jwt in the response
    res.send({ token: token, user: userdata });
  };

  static async forgotpassword(req: Request, res: Response) {
    let email = req.body.email;
    console.log(req.body);
    const user = await userServices.findUser({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Email Id does not exist!" });
    }
    const otp = crypto.randomInt(100000, 999999);
    const message = {
      from: "admin@shopkart.com",
      to: user.email,
      subject: "Password Reset OTP",
      html: `<h1> Password Reset Mail </h1><br>
            <p>Your OTP </p><br>
            <p>${otp}</p>`,
    };
    mailService.transport.sendMail(message, async (err, info) => {
      if (err) {
        console.log(err);
        return res.status(404).send({ message: "OTP Mail Failed . Try Again" });
      }
      let data = {
        email: email,
        otp: otp,
        user: user,
      };
      await authServices.createOTP(data);
      return res
        .status(200)
        .send({ message: `OTP Mail sent Successfully to ${user.email}` });
    });
  }
  static async resetpassword(req: Request, res: Response) {
    let otp = req.body.otp;
    let password = req.body.password;
    let dataOTP = await authServices.otpConfirm({ otp });
    if (otp === dataOTP.otp) {
      let user = await userServices.findUser({ email: dataOTP.email });
      console.log(user);
      user.password = password;
      console.log("change password");
      console.log(user);
      user.hashPassword();
      try {
        let saveduser = await userServices.saveUser(user);
        console.log("saveduser", saveduser);
        await authServices.deleteOTP({ otp });
        return res.status(200).send({ message: "Password reset Successful" });
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(404).send({ message: "Enter valid OTP" });
    }
  }
}

export default AuthController;
