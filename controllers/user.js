const User = require('../models/user');

const ERROR_CODE = 400;
const NOT_FOUND = 404

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка', ...err });
  }
};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Невалидный ID пользователя' });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(id, { name, about }, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(id, { avatar }, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    if (!user) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};
