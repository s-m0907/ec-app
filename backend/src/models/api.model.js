const fs = require("fs/promises");

exports.readEndpoints = () => {
  return fs.readFile("endpoints.json").then((endpoints) => {
    return JSON.parse(endpoints);
  });
};