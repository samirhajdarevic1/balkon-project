const { errorResponse } = require('../controllers/error');
const db = require('../util/database');
const bcrypt = require('bcrypt');
const generateAccessToken = require('../controllers/generateAccesToken');
const generateRefreshToken = require('../controllers/generatreRefreshToken');
module.exports = class AuthUser {
  constructor({ name, password }) {
    // this.idUser = idUser;
    this.name = name;
    this.password = password;
  }

  async authUser() {
    const findUser = await db.execute(`SELECT * FROM userdb WHERE name = ?`, [
      this.name,
    ]);
    if (findUser[0].length == 0) {
      console.log('-------> User does not exist');
    } else {
      const hashedPassword = findUser[0][0].password;
      if (await bcrypt.compare(this.password, hashedPassword)) {
        console.log('Login succesful');
        console.log('---------> Generating accessToken');
        const accesToken = generateAccessToken({ name: this.name });
        const refreshToken = generateRefreshToken({ name: this.name });
        return { accessToken: accesToken, refreshToken: refreshToken };
      } else {
        console.log('Incorrect password');
      }
    }
    // this.idUser = savedUser[0].insertId;
  }
};
