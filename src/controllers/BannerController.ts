import { Request, Response } from "express";
import { addBanner, editBanner, getAllBanner } from "../services/bannerServices";
export default class BannerController {
    static getAll =  async (req: Request, res: Response) => {
        await getAllBanner()
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            console.log(err);
        })
    }
    static add =  async (req: Request, res: Response) => {
        let sequence = req.body.sequence;
        let img = req.file.filename;
        // let params= {
        //     sequence:req.body.sequence,
        //     img:req.body.files[0]
        // }
        let data = {sequence , img}
        console.log("data",data )
        await addBanner(data)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    static edit = async (req: Request, res: Response) => {
        let data = req.body;
        await editBanner(data)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}