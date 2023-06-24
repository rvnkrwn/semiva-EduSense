const bcrypt = require('bcryptjs');

exports.hashing = async (password) => {
    return await bcrypt.hash(password, 10);
}

exports.comparing = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
}