const axios = require('axios');
const { Pokemon, Type } = require("../db");
const { initialPokemon, pokemonAmount, parsePokeInfo } = require("./utils");
require('dotenv').config();
const pokemonUrl = process.env.API_URL

const getApiInfo = async () => {
    //initial getting
    const apiUrl = (await axios(`${pokemonUrl}/pokemon?offset=${initialPokemon}&limit=${pokemonAmount}`)).data.results;
    //parse necessary info
    const apiInfo = await parsePokeInfo(apiUrl);

    return apiInfo;
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

module.exports = {
    getAllPokemons,
}