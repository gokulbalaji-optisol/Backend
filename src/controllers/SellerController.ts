import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";
import { User } from "../entity/User";
class SellerController {
  static getSellerBooks = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const { page, limit } = req.body;
    let options = { take: limit, skip: limit * page };
    const BookRepository = AppDataSource.getRepository(User);
    const BookData = await BookRepository.findOne({
      relations: ["books", "books.genre"],
      where: { id: id },
      ...options,
    });
    console.log("books", BookData);
    res.send([BookData.books, BookData.books.length]);
  };

  static getSellerOrders = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const OrderRepository = AppDataSource.getRepository(Order);
    const BookData = await OrderRepository.findAndCount({
      relations: [
        "user_id",
        "addr_id",
        "order_details_id",
        "order_details_id.book_id",
        "order_details_id.book_id.user",
      ],
      where: {
        order_details_id: {
          book_id: {
            user: {
              id: id,
            },
          },
        },
      },
    });
    res.send(BookData);
  };

  static getBookById = async (req: Request, res: Response) => {
    const book_id = req.params.id;
    const user_id = res.locals.jwtPayload.userId;
    const UserRepository = AppDataSource.getRepository(User);
    const BookRepository = AppDataSource.getRepository(Book);
    const BookData = await UserRepository.findOne({
      relations: ["books", "books.genre"],
      where: {
        id: user_id,
        books: {
          id: book_id,
        },
      },
    });

    res.send(BookData);
  };

  static deleteBookById = async (req: Request, res: Response) => {
    console.log("delete consoller");
    const book_id = req.params.id;
    const user_id = res.locals.jwtPayload.userId;
    const UserRepository = AppDataSource.getRepository(User);
    const BookRepository = AppDataSource.getRepository(Book);
    const BookData = await UserRepository.findOne({
      relations: ["books", "books.genre"],
      where: {
        id: user_id,
        books: {
          id: book_id,
        },
      },
    });
    console.log("delete controller", BookData.books[0]);
    //console.log("deel ",BookData);
    await BookRepository.remove(BookData.books[0]);
    res.send("Deleted Successfully");
  };
}

export default SellerController;
