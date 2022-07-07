import { UserRepository } from "./serviceInstances";

export const findUser = async (data) => {
  return UserRepository.findOne({
    where: data,
  });
};

export const saveUser = async (user) => {
  return UserRepository.save(user);
};

export const userServices = { findUser, saveUser };
