const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("./models/User");
const Role = require("./models/Role");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким именем уже существует",
                });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value],
            });
            await user.save();
            return res.json({ message: "Регистрация успешно завершена" });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: "Registration error" });
        }
    }

    async login(req, res) {
        try {
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: "Login error" });
        }
    }

    async getUsers(req, res) {
        try {
            res.json("server is work");
        } catch (e) {}
    }
}

module.exports = new authController();
