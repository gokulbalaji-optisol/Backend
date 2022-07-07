import { isEmail } from "class-validator";
import { User } from "../entity/User";
import { UserRepository, OtpRepository } from "./serviceInstances";
type dataOTP = {
  email: string;
  otp: number;
  user: User;
};
export const signup = async () => {};
export const sellerSignup = async () => {};
export const login = async () => {};
export const forgotpassword = async () => {};
export const otpConfirm = async (data) => {
  const { otp } = data;
  return await OtpRepository.findOne({
    where: {
      otp: otp,
    },
  });
};

export const deleteOTP = async (data) => {
  const { otp } = data;
  const OTPdata = await OtpRepository.findOne({
    where: {
      otp: otp,
    },
  });
  return await OtpRepository.remove(OTPdata);
};

export const createOTP = async (data: dataOTP) => {
  return await OtpRepository.save(data);
};

export const authServices = {
  otpConfirm,
  forgotpassword,
  deleteOTP,
  createOTP,
};
