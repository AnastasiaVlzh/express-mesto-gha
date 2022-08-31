const Card = require('../models/card');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
module.exports.createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные карточки' });
    }
    return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const card = await Card.find({});
    return res.status(200).send(card);
  } catch (err) {
    return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(
      cardId,
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Такой карточки нет' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные запроса' });
    }
    return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};

module.exports.putLike = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Такой карточки нет' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные запроса' });
    }
    return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};

module.exports.deleteLike = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND)
        .send({ message: 'Такой карточки нет' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res
        .status(ERROR_CODE)
        .send({ message: 'Некорректные данные запроса' });
    }
    return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};
