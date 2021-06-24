

/*
    GET /mocks => returns the list of mocks
    GET /mocks/123 => returns a single mock
    POST /mocks => create a new mock
    PUT /mocks/123 => edit the mock with the given id
    DELETE /mocks/123 => delete the mock with the given id
*/

import express from "express" 
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const mocksRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const currentFolderPath = dirname(currentFilePath)

const mocksJSONPath = join(currentFolderPath, "mock.json")

mocksRouter.get("/", (req, res) => {
  const mocksJSONContent = fs.readFileSync(mocksJSONPath) 
  const contentASJSON = JSON.parse(mocksJSONContent)
  res.send(contentASJSON)
})

mocksRouter.get("/:id", (req, res) => {
  const mocks = JSON.parse(fs.readFileSync(mocksJSONPath))
  console.log(mocks)
  const mock = mocks.find(u => u._id === req.params.id)
  res.send(mock)
})

mocksRouter.post("/", (req, res) => {
  const newMock = { ...req.body, _id: uniqid(), createdAt: new Date() }
  const mocks = JSON.parse(fs.readFileSync(mocksJSONPath))
  mocks.push(newMock)
  fs.writeFileSync(mocksJSONPath, JSON.stringify(mocks))
  res.status(201).send({ _id: newMock._id })
})


mocksRouter.put("/:id", (req, res) => {
  const mocks = JSON.parse(fs.readFileSync(mocksJSONPath))
  const remainingMocks = mocks.filter(mock => mock._id !== req.params.id)
  const modifiedMock = { ...req.body, _id: req.params.id }
  remainingMocks.push(modifiedMock)
  fs.writeFileSync(mocksJSONPath, JSON.stringify(remainingMocks))
  res.send(modifiedMock)
})


mocksRouter.delete("/:id", (req, res) => {
  const mocks = JSON.parse(fs.readFileSync(mocksJSONPath))
  const remainingMocks = mocks.filter(mock => mock._id !== req.params.id)
  fs.writeFileSync(mocksJSONPath, JSON.stringify(remainingMocks))
  res.status(204).send()
})

export default mocksRouter
