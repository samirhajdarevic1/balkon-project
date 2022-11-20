const { errorResponse } = require('../controllers/error');
const db = require('../util/database');

module.exports = class User {
  constructor({ name, hashedPassword }) {
    // this.idUser = idUser;
    this.name = name;
    this.hashedPassword = hashedPassword;
  }

  async save() {
    const findUser = await db.execute(`SELECT * FROM userdb WHERE name = ?`, [
      this.name,
    ]);
    if (findUser[0].length !== 0) {
      console.log('------> User already exists');
      throw new Error('Mhhhh');
      // return errorResponse(res, 'Conflict', 409, err);
    } else {
      const savedUser = await db.execute(
        'INSERT INTO userdb (`name`, `password`) VALUES (?, ?)',
        [this.name, this.hashedPassword]
      );
    }
    // this.idUser = savedUser[0].insertId;
  }
};
