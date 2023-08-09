const axios = require('axios');
const { Type } = require("../db");
require('dotenv').config();
const typeUrl = process.env.API_URL

const getAllTypes = async() => {
    // get types from API
    let allTypes = (await axios(`${typeUrl}/type`)).data.results;
    allTypes = allTypes.map(e => e.name);
    
    // save types in DB
    allTypes.forEach( type => {
        Type.findOrCreate({
            where: { name: type }
        })
    })

    console.log("Types loaded into DB succesfully!")
    return await Type.findAll();
}

module.exports = {
    getAllTypes
}