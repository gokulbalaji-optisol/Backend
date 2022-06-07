import { Between, In } from 'typeorm'
import {BookRepository , BookGenreRepository} from './serviceInstances'

export const getAllBooks = async(data) =>{
    let relation = {relations:["genre"],}
    let pagination = {}
    let filters = {}
    if(data.page){
        pagination = {
            skip:data.page * data.limit,
            limit:data.limit,
        }
    }
    if(data.range){
        filters = {
            where:{
                genre: In(data.genre),
                price: Between(data.range[0],data.range[1]),
                rating:data.rating
            }
        }
    }
    const options = {...pagination , ...filters}
    return BookRepository.find({
        ...relation,
        ...options

    });
}

export const getByBookById = async() =>{}

export const getBooksOfGenre = async() =>{}

export const createBook = async() =>{}

export const addBook = async() =>{}

export const updateBook = async() =>{}

export const deleteBook = async() =>{}