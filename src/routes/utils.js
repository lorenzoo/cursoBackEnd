
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);




import multer from "multer";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";



//console.log(__dirname);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
//export default __dirname;

export const uploader = multer({ storage });

const app = express();
const router = express.Router();
//EL CODIGO ES EJECUTADO POR CADA PETICION AL ROUTER
/*
router.use(function (re, res, next) {
    console.log("Time:", Date.now());
    next();
});

*/