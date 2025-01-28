const bcrypt = require('bcrypt');

const encrypt = (data) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(data, salt);
}

const compare = (a, b) => {
  const result = bcrypt.compareSync(a, b);
  if (!result) {
    throw new Error('Does not match');
  }
}

module.exports = {
  encrypt,
  compare,
}