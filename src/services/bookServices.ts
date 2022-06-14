import { Between, In } from 'typeorm'
import {BookRepository , BookGenreRepository} from './serviceInstances'

export const getAllBooks = async(data) =>{
    console.log("data",data , data.page , data.limit)
    let options = {};
    let pagination = {};
    let filters = {};
    (data.page !== undefined && data.limit !== undefined) ? pagination = {skip : data.page*data.limit , take : data.limit } : console.log("haha") ;
    console.log("paginations",pagination)
    data.genre && data.genre.length > 0 ?
     filters = {genre:{
        genre: In(data.genre)
    }, ...filters} : '' ;
    data.range ? filters = { price:Between(data.range[0],data.range[1]), ...filters} : '' ;
    data.rating ? filters = {rating : data.rating , ...filters} : '' ;
    
    options = {...pagination , where:{...filters}}
    console.log(options)
    return BookRepository.findAndCount({
        relations:["genre"],
        ...options    
    });
}

export const getByBookById = async() =>{}

export const getBooksOfGenre = async() =>{}

export const createBook = async() =>{}

export const addBook = async() =>{}

export const updateBook = async() =>{}

export const deleteBook = async() =>{}