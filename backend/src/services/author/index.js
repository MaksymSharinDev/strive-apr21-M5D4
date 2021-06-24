/*
    GET /authors => returns the list of authors
    GET /authors/123 => returns a single author
    POST /authors => create a new author
    PUT /authors/123 => edit the author with the given id
    DELETE /authors/123 => delete the author with the given id
*/

import express from "express"
import fs from "fs"
import {fileURLToPath} from "url"
import {dirname, join} from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentFolderPath = dirname(currentFilePath)

const authorsJSONPath = join(currentFolderPath, "post.json")

authorsRouter.get("/", (req, res) => {
    const authorsJSONContent = fs.readFileSync(authorsJSONPath)
    const contentASJSON = JSON.parse(authorsJSONContent)
    res.send(contentASJSON)
})

authorsRouter.get("/:id", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
    console.log(authors)
    const author = authors.find(u => u._id === req.params.id)
    res.send(author)
})

authorsRouter.post("/", (req, res) => {
    const newAuthor = {...req.body, _id: uniqid(), createdAt: new Date()}
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
    authors.push(newAuthor)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))
    res.status(201).send({_id: newAuthor._id})
})
authorsRouter.post("/:id/uploadAvatar", (req, res) => {
    /*
    POST /authors/:id/uploadAvatar,
    uploads a picture (save as idOfTheAuthor.jpg in the public/img/authors folder) for the author specified by the id.
    Store the newly created URL into the corresponding author in authors.json
    */
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
    const remainingAuthors = authors.filter(author => author._id !== req.params.id)
    const targetAuthor = authors.filter(author => author._id === req.params.id)

    //TODO \
    // obtain link

    const modifiedAuthor = {...targetAuthor, _id: req.params.id , avatar :  }
    remainingAuthors.push(modifiedAuthor)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))
    res.status(201).send({_id: newAuthor._id})
})


authorsRouter.put("/:id", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
    const remainingAuthors = authors.filter(author => author._id !== req.params.id)
    const modifiedAuthor = {...req.body, _id: req.params.id}
    remainingAuthors.push(modifiedAuthor)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
    res.send(modifiedAuthor)
})


authorsRouter.delete("/:id", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
    const remainingAuthors = authors.filter(author => author._id !== req.params.id)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
    res.status(204).send()
})

export default authorsRouter
