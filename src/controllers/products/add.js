const { readJSON } = require("../../data");

module.exports = (req, res) => {
    const brands = readJSON("brands.json");

    return res.render("productAdd", {
      brands: brands.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      ),
    });
  }