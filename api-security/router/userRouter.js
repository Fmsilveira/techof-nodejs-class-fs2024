const express = require('express');
const bcrypt = require('bcrypt');

const { signUp, login, getUsers, generateResetPasswordToken } = require('../services/userService');
const { encrypt, compare } = require('../services/cryptoService');
const { sendForgotPasswordEmail } = require('../services/sendMailService')
const {
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  getUserByEmailMiddleware,
  validateUserPermissionMiddleware,
} = require('../middlewares');

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

    const { user, accessToken } = await login({
      email,
      password
    });

    res
      .setHeader(
        'Set-Cookie',
        `accessToken=${accessToken}; Max-Age=3600; HttpOnly`
      )
      .json({
        success: true,
        user,
        accessToken
      })

  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      error: 'Unauthorized'
    })
  }
});

userRouter.post('/forgot-password',
  getUserByEmailMiddleware,
  (req, res, next) => {
    if (!req.user) {
      return res.json({
        success: true,
        message: 'E-mail enviado com sucesso'
      })
    }

    next();
  },
  async (req, res, next) => {
    const resetPasswordToken = generateResetPasswordToken();
    req.user.resetPasswordToken = encrypt(`${resetPasswordToken}`);

    await req.user.save();

    await sendForgotPasswordEmail({
      resetPasswordToken,
      email: req.user.email
    });

    res.json({
      success: true,
      message: 'E-mail enviado com sucesso'
    })
  }
);

userRouter.post('/reset-password',
  getUserByEmailMiddleware,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }

    const { resetPasswordToken, password } = req.body;
    try {
      compare(resetPasswordToken, user.resetPasswordToken);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      });
    }

    user.password = encrypt(password);
    user.resetPasswordToken = null;

    await user.save();

    res.json({
      success: true,
      message: 'Password changed'
    })
  }
);

// Passo 1 => Validar o Authorization Header
// Passo 2 => Validar se o token é valido
// Passo 3 => Pegar o usuario da base
// Passo 4 => Validar se foi informado no body do request a senha atual e a nova
// Passo 5 => Validar se a senha atual corresponde a senha do usuario no DB
// Passo 6 => Criptografar a senha nova
// Passo 7 => Salvar o usuario no DB com a senha nova
userRouter.post('/update-password',
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  (req, res, next) => {
    const { password, newPassword, confirmationNewPassword } = req.body;

    if (!password || !newPassword || !confirmationNewPassword || (newPassword !== confirmationNewPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request'
      })
    }

    req.password = password;
    req.newPassword = newPassword;
    req.confirmationNewPassword = confirmationNewPassword;
    next();
  },
  (req, res, next) => {
    const { password, newPassword, user } = req;
    try {
      compare(password, user.password);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request password mismatch'
      });
    }

    next();
  },
  async (req, res, next) => {
    const { newPassword, user } = req;

    user.password = encrypt(newPassword);
    await user.save();

    return res.json({
      success: true,
      message: 'Password updated'
    })
  }
)

userRouter.get('',
  verifyAuthorizationHeaderMiddleware,
  validateAccessTokenMiddleware,
  getUserMiddleware,
  validateUserPermissionMiddleware('user'),
  async (req, res, next) => {
    try {
      const users = await getUsers();

      return res.send({
        success: true,
        users
      })
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        error
      })
    }
  }
);

module.exports = userRouter;
