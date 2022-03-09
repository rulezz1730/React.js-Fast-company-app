const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });
const chalk = require("chalk");

// router.use("/auth", require("./auth.routes.js"));
//1. Get data from request (email, password, name, sex, qualities[] etc...)
//2. Проверка уникальности пользователя (есть ли он в уже в бд)
//3. Hash password
//4. Create user
//5. Generate tokens

router.post("/signUp", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 8 символов").isLength({
        min: 8,
    }),
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        // errors: errors.array(),
                    },
                });
            }
            const { email, password } = request.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return response.status(
                    400,
                    json({
                        error: {
                            message: "EMAIL_EXISTS",
                            code: 400,
                        },
                    })
                );
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...generateUserData(),
                ...request.body,
                password: hashedPassword,
            });

            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            response.status(201).send({ ...tokens, userId: newUser._id });
        } catch (error) {
            response.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже",
            });
        }
    },
]);

// 1.Валидация данных
// 2. Найти пользователя (find user)
// 3.compare hashed password (сравнить захэшированные пароли)
// 4.generate token(refresh exes)
// 5. return data - вернуть данные
router.post("/signInWithPassword", [
    check("email", "Email некорректный ").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                    },
                });
            }
            const { email, password } = request.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return response.status(400).json({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400,
                    },
                });
            }

            const isPassowrdEqual = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!isPassowrdEqual) {
                return response.status(400).json({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400,
                    },
                });
            }

            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            response.status(200).send({ ...tokens, userId: existingUser._id });
        } catch (error) {
            response.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже",
            });
        }
    },
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken.user?.toString();
}

router.post("/token", async (request, response) => {
    try {
        const { refresh_token: refreshToken } = request.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return response.status(401).json({ message: "Unauthorized user" });
        }

        const tokens = tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);

        response.status(200).send({ ...tokens, userId: data._id });
    } catch (error) {
        response.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
