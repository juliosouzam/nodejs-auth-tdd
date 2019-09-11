const { User } = require("./../models");
class UserController {
  async store(req, res) {
    const { name, email, password, password_confirmed } = req.body;

    const userExists = await User.findOne({
      where: {
        email
      }
    });

    if (userExists) {
      return res.status(400).send({ message: "User already exists!" });
    }

    if (password_confirmed !== password) {
      return res
        .status(400)
        .send({ message: "Password and Password Confirmed not matched!" });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    user.password_hash = undefined;

    return res.send(user);
  }
}

module.exports = new UserController();
