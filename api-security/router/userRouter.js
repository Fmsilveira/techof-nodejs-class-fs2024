const express = require('express');

const { signUp, login } = require('../services/userService');

const userRouter = express.Router();

userRouter.post('/sign-up', async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    photo
  } = req.body;

  try {
    const user = await signUp({
      email,
      password,
      firstName,
      lastName,
      photo
    });
  
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "success": false,
      "message": error
    })
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await login({
      email,
      password
    });

    res.json({
      success: true,
      user
    })

  } catch(error) {
    console.error(error);
    res.status(401).json({
      success: false,
      error: 'Unauthorized'
    })
  }
});

module.exports = userRouter;
