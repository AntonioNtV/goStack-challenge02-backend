const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = { 
    id: v4(), 
    title,
    url,
    techs, 
    likes: 0 
  }

  repositories.push(repository)

  return response.status(200).json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { url, title, techs } = request.body

  const repositoryIndex = repositories.findIndex( repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: 'Repository does not exist'
    })
  }

  const repository = {
    id,
    url,
    title,
    techs
  }

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex( repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: 'Repository does not exist'
    })
  }

  repositories.splice(repositoryIndex, 1)


  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;