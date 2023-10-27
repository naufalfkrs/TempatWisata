const userModel = require(`../models/index`).user
const Op = require(`sequelize`).Op
const md5 = require("md5")

const jsonwebtoken = require("jsonwebtoken")
const SECRET_KEY = "secretcode"

exports.login = async (request, response) => {
    try {
        const params = {
            email: request.body.email,
            password: md5(request.body.password),
        };

        const findUser = await userModel.findOne({ where: params });
        if (findUser == null) {
            return response.status(400).json({
                message: "email or password doesn't match"
            });
        }
        console.log(findUser);
        //generate jwt token
        let tokenPayLoad = {
            id: findUser.id,
            email: findUser.email,
            nama_user: findUser.nama_user,
        };
        tokenPayLoad = JSON.stringify(tokenPayLoad);
        let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

        return response.status(200).json({
            message: "Success login",
            data: {
                token: token,
                id: findUser.id,
                nama_user: findUser.nama_user,
                email: findUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            message: error,
        });
    }
}

exports.register = async (request, response) => {
    
    let newUser = {
        nama_user: request.body.nama_user,
        email: request.body.email,
        password: md5(request.body.password),
    }
    
    let user = await userModel.findAll({
        where: {
            [Op.or]: [{ nama_user: newUser.nama_user }, { email: newUser.email }],
        },
    });
    
    if (newUser.nama_user === "" || newUser.email === "" || newUser.password === "") {
        return response.status(400).json({
            success: false,
            message: "Harus diisi semua",
        });
    } else if (user.length > 0) {
        return response.status(400).json({
            success: false,
            message: "Cari nama atau email lain",
        });
    } else {
        userModel
            .create(newUser)
            .then((result) => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New User has been inserted`,
                })
            })
            .catch((error) => {
                return response.json({
                    success: false,
                    message: error.message,
                })
            })
    }
}