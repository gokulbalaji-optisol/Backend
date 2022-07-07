import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import config, { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";
import { User } from "../entity/User";
import { BookGenre } from "../entity/BookGenre";
import { Order } from "../entity/Order";
import { adminServices } from "../services";
import { ILike } from "typeorm";
export default class AdminController {
  static async getBooks(req: Request, res: Response) {
    await adminServices
      .getBooks()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // const BookRepository = AppDataSource.getRepository(Book);
    // const BookData = await BookRepository.find({
    //   relations: ["user", "genre"],
    // });
    // res.send(BookData);
  }
  static async getUsers(req: Request, res: Response) {
    //const { page, limit, srh } = req.query;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const srh = req.query.srh;
    console.log(req.query);
    let pagination = req.query.limit ? { skip: page * limit, take: limit } : {};
    let search = req.query.srh
      ? {
          where: {
            username: ILike(`${srh}%`),
          },
        }
      : {};
    let options = { ...pagination, ...search };
    console.log("user", options);
    const UserRepository = AppDataSource.getRepository(User);
    const UserData = await UserRepository.findAndCount({
      ...options,
    });
    console.log(UserData);
    res.send(UserData);
  }
  static async getGenres(req: Request, res: Response) {
    const BookGenreRepository = AppDataSource.getRepository(BookGenre);
    const BookGenreData = await BookGenreRepository.find();
    res.send(BookGenreData);
  }
  static async getOrders(req: Request, res: Response) {
    const { page, limit } = req.params;
    let options = { skip: page, take: limit };
    const OrderRepository = AppDataSource.getRepository(Order);
    const OrderData = await OrderRepository.findAndCount({
      relations: [
        "user_id",
        "addr_id",
        "order_details_id",
        "order_details_id.book_id",
        "order_details_id.book_id.user",
      ],
      ...options,
    });
    res.send(OrderData);
  }

  static async delBook(req: Request, res: Response) {
    const id = req.params.id;
    const BookRepository = AppDataSource.getRepository(Book);
    const BookData = await BookRepository.findOne({
      where: { id: id },
    });
    try {
      await BookRepository.remove(BookData);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
    res.send("Book Deleted");
  }
  static async delUser(req: Request, res: Response) {
    const id = req.params.id;
    const UserRepository = AppDataSource.getRepository(User);
    const UserData = await UserRepository.findOne({
      where: { id: id },
    });
    try {
      await UserRepository.remove(UserData);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
    res.send("User Deleted");
  }
  static async delGenre(req: Request, res: Response) {
    const id = req.params.id;
    const BookGenreRepository = AppDataSource.getRepository(BookGenre);
    const BookGenreData = await BookGenreRepository.find({
      where: { id: id },
    });
    try {
      await BookGenreRepository.remove(BookGenreData);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
    res.send("Book Genre Deleted");
  }
  static async delOrder(req: Request, res: Response) {
    const id = req.params.id;
    const OrderRepository = AppDataSource.getRepository(Order);
    const OrderData = await OrderRepository.find({
      where: { id: id },
    });
    try {
      await OrderRepository.remove(OrderData);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
    res.send("Order Deleted");
  }
}
