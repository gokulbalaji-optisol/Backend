import { BookRepository } from "./serviceInstances";

const getBooks = async () => {
  const BookData = await BookRepository.find({
    relations: ["user", "genre"],
  });
};
const getUsers = () => {};
const getGenres = () => {};
const getOrders = () => {};

export const adminServices = { getBooks, getUsers, getGenres, getOrders };
