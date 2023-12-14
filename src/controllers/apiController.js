const db = require("../database/models");

const checkEmail = async (req, res) => {
  try {
    if (!req.query.email) {
      let error = new Error("Falta el parámetro email");
      error.status = 400;
      throw error;
    }

    const user = await db.User.findOne({
      where: {
        email: req.query.email,
      },
    });

    return res.status(200).json({
      ok: true,
      data: user ? true : false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, discount, price, description, brandId, sectionId } = req.body;

    const { id } = await db.Product.create({
      name: name.trim(),
      discount: discount || 0,
      price,
      description: description.trim(),
      brandId,
      sectionId,
      image : req.files[0].filename,
    });

   /*  if(req.files.length){
      await db.Image.create({
        file : req.files[0].filename,
        main : true,
        productId : id
      })
    } */

    const product = await db.Product.findByPk(id, {
      include: ["brand", "section"],
    });

    product.image = `${req.protocol}://${req.get('host')}/images/${product.image}`


    return res.status(200).json({
      ok: true,
      msg: "El producto fue creado con éxito",
      data: product,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
      data: null,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, discount, price, description, brandId, sectionId } = req.body;

    const product = await db.Product.findByPk(req.params.id, {
      include: ["brand", "section"],
    });

    await db.Product.update(
      {
        name: name.trim(),
        discount: discount || 0,
        price,
        description: description.trim(),
        brandId,
        sectionId,
        image : req.files.length ? req.files[0].filename : product.image
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if(req.files.length){
    /*  const [imageRow, isCreated] = await db.Image.findOrCreate(
        {
          where : {
            productId : req.params.id,
            main : true
          },
          defaults : {
            productId : req.params.id,
            main : true,
            file : req.files[0].filename,

          }
        },
      )
      console.log(imageRow, isCreated); */

    }


    product.reload();
    product.image = `${req.protocol}://${req.get('host')}/images/${product.image}`;


    return res.status(200).json({
      ok: true,
      msg: "El producto fue actualizado con éxito",
      data: product,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
      data: null,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      ok: true,
      msg: "El producto fue eliminado con éxito",
      data: null,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
      data: null,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: ["brand", "section"],
    });

    const productsWithURLImages = products.map(product => {
      product.image = product.image ?  `${req.protocol}://${req.get('host')}/images/${product.image}` : null
      return product
    })

    return res.status(200).json({
      ok: true,
      data: productsWithURLImages,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const getAllSections = async (req, res) => {
  try {
    const products = await db.Section.findAll();

    return res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const products = await db.Brand.findAll();

    return res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, hubo un error",
    });
  }
};

module.exports = {
  checkEmail,
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllBrands,
  getAllSections,
};
