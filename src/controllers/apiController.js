const db = require('../database/models')

const checkEmail = async (req,res) => {
    try {

        if(!req.query.email){
            let error = new Error("Falta el parámetro email")
            error.status = 400
            throw error
        }

        const user = await db.User.findOne({
            where : {
                email : req.query.email
            }
        })

        return res.status(200).json({
            ok : true,
            data : user ? true : false
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Upss, hubo un error'
        })
    }
}

const createProduct = async (req,res) => {
    try {

        const {name, discount,price, description, brandId, sectionId} = req.body;

        const newProduct = await db.Product.create({
            name : name.trim(),
            discount : discount || 0,
            price,
            description : description.trim(),
            brandId,
            sectionId
        });

        return res.status(200).json({
            ok : true,
            msg : "El producto fue creado con éxito",
            data : newProduct 
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Upss, hubo un error',
            data: null
        })
    }
}


const getAllProduct = async (req,res) => {
    try {

        const products = await db.Product.findAll({
            include : ['brand','section']
        })

        return res.status(200).json({
            ok : true,
            data :products
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Upss, hubo un error'
        })
    }
}

const getAllSections = async (req,res) => {
    try {

        const products = await db.Section.findAll()

        return res.status(200).json({
            ok : true,
            data :products
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Upss, hubo un error'
        })
    }
}


const getAllBrands = async (req,res) => {
    try {

        const products = await db.Brand.findAll()

        return res.status(200).json({
            ok : true,
            data :products
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Upss, hubo un error'
        })
    }
}



module.exports = {
    checkEmail,
    getAllProduct,
    createProduct,
    getAllBrands,
    getAllSections
}