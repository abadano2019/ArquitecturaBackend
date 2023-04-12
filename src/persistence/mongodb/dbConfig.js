import config from '../../config.js'
import mongoose from "mongoose";

const URI = config.MONGO_URI
//mongoose.set('strictQuery', false)
/*mongoose.connect(URI, (error)=>{
    if(error){
        console.log('Error en conexión de base de datos', error)
    }
    else
    {
        console.log('***** Base de datos conectada *****')
    }
})*/

export const initMongo = (uri) => {
    mongoose.connect(URI, (error)=>{
        if(error){
            console.log('Error en conexión de base de datos', error)
        }
        else
        {
            console.log('***** Base de datos conectada *****')
        }
    })
    

}