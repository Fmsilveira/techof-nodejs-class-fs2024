const bcrypt = require('bcrypt');

const encrypt = (data) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(data, salt);
}

module.exports = {
  encrypt
}