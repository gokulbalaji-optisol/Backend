import { Banner } from "../entity/Banner";
import { BannerRepository } from "./serviceInstances";

export const getAllBanner = async () => {
  return await BannerRepository.find({
    order: {
      sequence: "ASC",
    },
  });
};

export const getBannerById = async (id) => {
  return await BannerRepository.find({
    where: { id: id },
  });
};

export const addBanner = async (data) => {
  let banner = new Banner();
  banner.id = data.id;
  banner.sequence = data.sequence;
  banner.img = data.img;
  return await BannerRepository.save(banner);
};

export const editBanner = async (data) => {};
