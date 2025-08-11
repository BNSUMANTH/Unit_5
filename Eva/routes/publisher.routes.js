const express = require("express");
const { addPublish, allPublishers, publishersById, updatePublishers, deletePublishers } = require("../controllers/publisher.controllers");

const publisherRoute = express.Router();

publisherRoute.post("/", addPublish)

publisherRoute.get("/", allPublishers)

publisherRoute.get("/:id", publishersById)

publisherRoute.put("/:id", updatePublishers);

publisherRoute.delete("/:id", deletePublishers);

module.exports = publisherRoute;