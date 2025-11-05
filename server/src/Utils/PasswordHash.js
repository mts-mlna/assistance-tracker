
const Encriptar = require('bcrypt');

const saltos = 10;

const EncriptarPassword = async (password) => {
    const hash = await Encriptar.genSalt(saltos);
    return Encriptar.hash(password, hash);
};

module.exports = { EncriptarPassword };