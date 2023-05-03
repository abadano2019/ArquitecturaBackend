import compression from "express-compression";
import config from "../config.js";

export const typeCompression = (app) =>{
switch (config.COMPRESION) {
    case "bt":
      app.use(compression({ brotli: { enabled: true, zlib: {} } }));
      console.log("Using compresion brotli")
      break;
    case "gzip":
      app.use(compression());
      console.log("Using compresion gzip")
      break;
    case "none": 
      console.log("Using no compresion")
      break;
    default:
      console.log("Using no compresion")
      break;
  }

}