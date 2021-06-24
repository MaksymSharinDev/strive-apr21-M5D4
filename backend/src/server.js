import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"

import authorsRouter from "./services/author/index.js"
import postsRouter from "./services/post/index.js"
const server = express()

const port = 3001




server.use(cors())
server.use(express.json())
//TODO  Middleware express validator for Bodies, params and queries


server.use( validatorMiddleware )

server.use("/author", authorsRouter)
server.use("/posts", postsRouter)


console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server is running on port " + port)
})
