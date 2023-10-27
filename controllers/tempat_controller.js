const tempatModel = require(`../models/index`).tempat
const Op = require(`sequelize`).Op

exports.getAllTempat = async (request, response) => {
    let tempat = await tempatModel.findAll()
    return response.json({
        success: true,
        data: tempat,
        message: `All Tempat Wisata have been loaded`
    })
}

exports.addTempat = async (request, response) => {
    
    let newTempat = {
        title: request.body.title,
        description: request.body.description,
        img: request.body.img,
    }
    
    let tempat = await tempatModel.findAll({
        where: {
            [Op.or]: [{ description: newTempat.description }, { img: newTempat.img }],
        },
    });

    if (newTempat.title === "" || newTempat.description === "" || newTempat.img === "") {
        return response.status(400).json({
            success: false,
            message: "Harus diisi semua",
        });
    } else if (tempat.length > 0) {
        return response.status(400).json({
            success: false,
            message: "Cari deskripsi atau img lain",
        });
    } else {
        tempatModel
            .create(newTempat)
            .then((result) => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New tempat wisata has been inserted`,
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

exports.updateTempat = async (request, response) => {
    let id = request.params.id

    let getId = await tempatModel.findAll({
        where: {
            [Op.and]: [{ id: id }],
        },
    });

    if (getId.length === 0) {
        return response.status(400).json({
            success: false,
            message: "Tempat wisata dengan id tersebut tidak ada",
        });
    }

    
    let dataTempat = {
        title: request.body.title,
        description: request.body.description,
        img: request.body.img,
    }
    
    let tempat = await tempatModel.findAll({
        where: {
            [Op.or]: [{ description: dataTempat.description }, { img: dataTempat.img }],
        },
    });

    if (dataTempat.title === "" || dataTempat.description === "" || dataTempat.img === "") {
        return response.status(400).json({
            success: false,
            message: "Harus diisi semua",
        });
    } else if (tempat.length > 0) {
        return response.status(400).json({
            success: false,
            message: "Cari deskripsi atau img lain",
        });
    } else {
        tempatModel
        .update(dataTempat, { where: { id: id } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data tempat wisata has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    }
}

exports.deleteTempat = async (request, response) => {
    let id = request.params.id

    let getId = await tempatModel.findAll({
        where: {
            [Op.and]: [{ id: id }],
        },
    });

    if (getId.length === 0) {
        return response.status(400).json({
            success: false,
            message: "Tempat wisata dengan id tersebut tidak ada",
        });
    }

    tempatModel.destroy({ where: { id: id } })
        .then(result => {
            return response.json({
                success: true,
                message: 'Data tempat wisata has been deleted'
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}