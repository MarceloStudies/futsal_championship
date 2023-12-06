const express = require('express');
const userController = require('../controllers/UserController');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const router = express.Router();

router.post('/users/register', async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;
    userController.addUser(req, res);
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).send();
  }
});


router.post('/users/login', async (req, res) => {
  userController.getLoginUser(req, res, async (error, user) => {
    if (error) {
      console.error('Error getting login user:', error);
      res.status(500).send();
    } else {
      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign({ id: user.id }, "teste", { expiresIn: '1h' }); // Create a token
          res.status(200).json({ user, token }); // Send the user and the token in the response
        } else {
          res.send('Not Allowed');
        }
      } catch {
        res.status(500).send();
      }
    }
  });
});


module.exports = router;