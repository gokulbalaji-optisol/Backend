import { Banner } from "../entity/Banner";
import { BannerRepository } from "./serviceInstances";


export const getAllBanner = async() =>{
    return await BannerRepository.find();
}

export const addBanner = async(data) =>{
    let banner = new Banner();
    banner.sequence = data.sequence;
    banner.img = data.img;
    return await BannerRepository.save(banner)
}

export const editBanner = async(data) =>{

}
