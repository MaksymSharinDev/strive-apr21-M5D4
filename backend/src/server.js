import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"

import { join } from "path"
import { getCurrentFolderPath } from "./lib/fs-tools.js"

import multer from 'multer';
const path = require('path');

import authorsRouter from "./services/author/index.js"
import postsRouter from "./services/post/index.js"
const server = express()

const port = 3001

const publicFolderPath = join(getCurrentFolderPath(import.meta.url), "../public")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, join(__dirname , 'public/img') );
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

server.use(cors())
server.use(express.json())
//TODO  Middleware express validator for Bodies, params and queries


server.use("/author", authorsRouter)
server.use("/posts", postsRouter)

server.use(express.static(publicFolderPath));

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server is running on port " + port)
})
