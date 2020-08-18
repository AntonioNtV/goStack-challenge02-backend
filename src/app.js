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

  const repository = repositories[repositoryIndex]

  const newUrl = url ? url : repository.url
  const newtitle = title ? title : repository.title
  const newTechs = techs ? techs : repository.techs

  const updatedRepository = {
    id,
    url: newUrl,
    title: newtitle,
    techs: newTechs,
    likes: repository.likes
  }

  repositories[repositoryIndex] = updatedRepository

  return response.status(200).json(updatedRepository)

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
  const { id } = request.params

  const repositoryIndex = repositories.findIndex( repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: 'Repository does not exist'
    })
  }

  const repository = repositories[repositoryIndex]
  repository.likes = repository.likes + 1

  return response.status(200).json(repository)
  
});

module.exports = app;
