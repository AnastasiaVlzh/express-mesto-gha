const express = require('express');
const userRoutes = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

userRoutes.get('/users', express.json(), getUsers);

userRoutes.post('/users', express.json(), createUser);

userRoutes.get('/users/:userId', express.json(), getUserById);

userRoutes.patch('/users/me', express.json(), updateUser);

userRoutes.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
