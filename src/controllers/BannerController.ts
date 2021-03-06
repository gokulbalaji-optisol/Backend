import { Request, Response } from "express";
import {
  addBanner,
  editBanner,
  getAllBanner,
  getBannerById,
} from "../services/bannerServices";
export default class BannerController {
  static getAll = async (req: Request, res: Response) => {
    console.log("this");
    return await getAllBanner()
      .then((data) => {
        console.log("banner", data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static async getByID(req: Request, res: Response) {
    let id = req.params.id;
    await getBannerById(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static add = async (req: Request, res: Response) => {
    let sequence = req.body.sequence;
    let img = req.file.filename;
    // let params= {
    //     sequence:req.body.sequence,
    //     img:req.body.files[0]
    // }
    let data = { sequence, img };
    console.log("data", data);
    await addBanner(data)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  static edit = async (req: Request, res: Response) => {
    let data = req.body;
    await editBanner(data)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
