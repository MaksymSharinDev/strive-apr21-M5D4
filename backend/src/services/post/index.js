

/*
    GET /posts => returns the list of posts
    GET /posts/123 => returns a single post
    POST /posts => create a new post
    PUT /posts/123 => edit the post with the given id
    DELETE /posts/123 => delete the post with the given id
*/

import express from "express" 
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

import {inspector} from 'schema-inspector'
import htmlValidator from 'express-html-validator'
schema = {
  type: object,
  properties : {
    category : { type: 'string', optional: false, },
    text : { type: 'string', optional: false, minLength: 10},
    title: { type: 'string', optional: false, minLength: 6},
    cover: { type: 'string', optional: false},
    readTime : { type: 'object' ,
      properties:{
        "value": { type: 'any'},
        "unit": { type: 'any'}
      }
    },
    author: { type: 'object' ,
      properties: {
        "name": { type: 'any'},
        "avatar": { type: 'any'}
      }},
    "content": { type: 'string'},
    "createdAt": { type: 'string'}
  }

}

const postsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentFolderPath = dirname(currentFilePath)

const postsJSONPath = join(currentFolderPath, "post.json")

postsRouter.get("/", (req, res) => {
  const postsJSONContent = fs.readFileSync(postsJSONPath) 
  const contentASJSON = JSON.parse(postsJSONContent)
  res.send(contentASJSON)
})

postsRouter.get("/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsJSONPath))
  console.log(posts)
  const post = posts.find(u => u._id === req.params.id)
  res.send(post)
})

postsRouter.post("/", (req, res) => {
  const newPost = { ...req.body, _id: uniqid(), createdAt: new Date() }
  const posts = JSON.parse(fs.readFileSync(postsJSONPath))
  posts.push(newPost)
  fs.writeFileSync(postsJSONPath, JSON.stringify(posts))
  res.status(201).send({ _id: newPost._id })
})


postsRouter.put("/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsJSONPath))
  const remainingPosts = posts.filter(post => post._id !== req.params.id)
  const modifiedPost = { ...req.body, _id: req.params.id }
  remainingPosts.push(modifiedPost)
  fs.writeFileSync(postsJSONPath, JSON.stringify(remainingPosts))
  res.send(modifiedPost)
})


postsRouter.delete("/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsJSONPath))
  const remainingPosts = posts.filter(post => post._id !== req.params.id)
  fs.writeFileSync(postsJSONPath, JSON.stringify(remainingPosts))
  res.status(204).send()
})

export default postsRouter
