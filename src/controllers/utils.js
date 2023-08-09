const axios = require('axios');
const initialPokemon = 0;
const pokemonAmount = 40;

const parsePokeInfo = async (apiUrl) => {
    const apiInfo = [];

    for (let pokemonInfo of apiUrl) {
        let { id, name, stats, height, weight, sprites, types } = (await axios(pokemonInfo.url)).data;

        types = types.map(e => ({"name" : e.type.name}));
        const hp = stats.find(e => e.stat.name === "hp").base_stat;
        const attack  = stats.find(e => e.stat.name === "attack").base_stat;
        const defense  = stats.find(e => e.stat.name === "defense").base_stat;
        const speed  = stats.find(e => e.stat.name === "speed").base_stat;

        apiInfo.push({
            id,
            name,
            hp,
            attack,
            defense,
            speed, 
            height, 
            weight,
            "image": {
                "home": sprites.other["official-artwork"].front_default,
                "detail": sprites.versions["generation-v"]["black-white"].animated.front_default,
            },
            types,
        });
    }
    return apiInfo;
}

module.exports = {
    initialPokemon,
    pokemonAmount,
    parsePokeInfo
}