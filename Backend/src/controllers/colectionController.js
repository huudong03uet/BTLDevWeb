const Collection = require("../models/collection");

let collection = async (req, res) => {
    try {
      const collections = await Collection.findAll();
      console.log(collections); 
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
    collection
  }