const { readFileSync, writeFileSync } = require("fs");
const path = require('path');

const readJSON = (json) =>
  JSON.parse(readFileSync(path.join(__dirname, json), "utf-8"));

const writeJSON = (array, file) =>
  writeFileSync(
    path.join(__dirname, file),
    JSON.stringify(array, null, 3),
    "utf-8"
  );

module.exports = {
  readJSON,
  writeJSON,
};
