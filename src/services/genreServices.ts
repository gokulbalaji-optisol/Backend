import { BookGenreRepository } from "./serviceInstances"

export const getGenreData =  async (data) => {
         return  BookGenreRepository.findAndCount({
          ...data
        })
}

export const getAllGenreData = async() =>{
    return BookGenreRepository.find();
}

