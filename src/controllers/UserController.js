const User = require("../models/User");

class UserController {
  addUser(req, res) {
    const { name, email, password } = req.body;

    User.createUser(name, email, password, (error, results) => {
      if (error) {
        console.error("Erro ao adicionar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res
          .status(201)
          .json({
            message: "Usuário adicionado com sucesso",
            userId: results.insertId,
          });
      }
    });
  }

  getAllUsers(req, res) {
    User.getAllUsers((error, results) => {
      if (error) {
        console.error("Erro ao obter usuários:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.status(200).json(results);
      }
    });
  }

  getUser(req, res) {
    const userId = req.params.id;

    User.getUserById(userId, (error, results) => {
      if (error) {
        console.error("Erro ao obter usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ error: "Usuário não encontrado" });
        }
      }
    });
  }

  updateUser(req, res) {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    User.updateUser(userId, name, email, password, (error) => {
      if (error) {
        console.error("Erro ao atualizar o usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
      }
    });
  }

  deleteUser(req, res) {
    const userId = req.params.id;

    User.deleteUser(userId, (error) => {
      if (error) {
        console.error("Erro ao deletar o usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      }
    });
  }

  async getLoginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.getLoginUser(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
module.exports = new UserController();
