const { readJSON } = require("../../data");

module.exports =  (req, res) => {

    const products = readJSON("products.json");
    const brands = readJSON("brands.json");

    const id = req.params.id;
    const product = products.find((product) => product.id === id);

    return res.render("productEdit", {
        ...product,
        brands: brands.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      ),
    });
  }