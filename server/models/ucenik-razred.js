const db = require('../util/database');

module.exports = class UcenikRazred {
  constructor({ idUcenikRazred, idUcenik, idRazred }) {
    this.idUcenikRazred = idUcenikRazred;
    this.idUcenik = idUcenik;
    this.idRazred = idRazred;
  }

  async save() {
    if (!this.idUcenikRazred) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const savedUcenikRazred = await db.execute(
      'INSERT INTO ucenik_odjeljenje (id_ucenik, id_odjeljenja) VALUES (?, ?)',
      [this.idUcenik, this.idRazred]
    );
    this.idUcenikRazred = savedUcenikRazred[0].insertId;
  }

  async update() {
    const updatedUcenik = await db.execute(
      'UPDATE ucenici SET ime = ?, prezime = ?, birthday = ?, image = ? WHERE id_ucenik = ?',
      [this.ime, this.prezime, this.birthday, this.image, this.idUcenik]
    );
  }
};
