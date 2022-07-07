import { AppDataSource } from "../data-source";
import { Banner } from "../entity/Banner";
import { Book } from "../entity/Book";
import { BookGenre } from "../entity/BookGenre";
import { Otp } from "../entity/Otp";
import { User } from "../entity/User";

export const BookGenreRepository = AppDataSource.getRepository(BookGenre);
export const UserRepository = AppDataSource.getRepository(User);
export const BookRepository = AppDataSource.getRepository(Book);
export const BannerRepository = AppDataSource.getRepository(Banner);
export const OtpRepository = AppDataSource.getRepository(Otp);
