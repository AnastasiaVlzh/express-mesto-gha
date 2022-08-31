const express = require('express');
const cardRoutes = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/card');

cardRoutes.get('/cards', express.json(), getCards);

cardRoutes.post('/cards', express.json(), createCard);

cardRoutes.get('/cards/:cardId', express.json(), deleteCard);

cardRoutes.put('/cards/:cardId/likes', express.json(), putLike);

cardRoutes.delete('/cards/:cardId/likes', express.json(), deleteLike);

module.exports = cardRoutes;
