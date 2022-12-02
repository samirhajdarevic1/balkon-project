const { errorResponse } = require('../controllers/error');
const db = require('../util/database');

module.exports = class Nastavnik {
  constructor({ idNastavnik, ime, prezime, photo }) {
    this.idNastavnik = idNastavnik;
    this.ime = ime;
    this.prezime = prezime;
    this.photo = photo;
  }

  async save() {
    if (!this.idNastavnik) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const savedNastavnik = await db.execute(
      'INSERT INTO nastavnici (ime, prezime, photo) VALUES (?, ?, ?)',
      [this.ime, this.prezime, this.photo]
    );
    this.idNastavnik = savedNastavnik[0].insertId;
    console.log(savedNastavnik[0]);
  }

  async update() {
    const updatedNastavnik = await db.execute(
      'UPDATE nastavnici SET ime = ?, prezime = ? WHERE id_nastavnik = ?',
      [this.ime, this.prezime, this.idNastavnik]
    );
  }

  static async fetchAll(idOdjeljenja, idPredmet) {
    if (idPredmet) {
      const nastavnici = await db.execute(
        `SELECT n.id_nastavnik,n.photos, n.ime, n.prezime FROM balkon.predmeti_nastavnici  pn 
        JOIN balkon.predmeti p
        JOIN balkon.nastavnici n 
        WHERE balkon.pn.id_predmet = p.id_predmet
        AND balkon.pn.id_nastavnik = n.id_nastavnik
        AND p.id_predmet = ${idPredmet}
        ;`
      );
      const nastavniciInstances = nastavnici[0].map((nastavnik) => {
        return new Nastavnik({
          ...nastavnik,
          idNastavnik: nastavnik.id_nastavnik,
        });
      });
      return nastavniciInstances;
    }
    if (idOdjeljenja) {
      const nastavnici = await db.execute(
        `SELECT n.ime, n.prezime, n.photos FROM balkon.odjeljenja_nastavnici  odna 
        JOIN balkon.odjeljenja o 
        JOIN balkon.nastavnici n 
        WHERE balkon.odna.id_odjeljenja = o.id_odjeljenja 
        AND balkon.odna.id_nastavnik = n.id_nastavnik
        AND o.id_odjeljenja = ${idOdjeljenja}
        ;`
      );
      const nastavniciInstances = nastavnici[0].map((nastavnik) => {
        return new Nastavnik({
          ...nastavnik,
          idNastavnik: nastavnik.id_nastavnik,
        });
      });
      return nastavniciInstances;
    }
    const nastavnici = await db.execute('SELECT * FROM nastavnici');
    //console.log(555, nastavnici[0]);
    const nastavniciInstances = nastavnici[0].map((nastavnik) => {
      console.log(22, nastavnik);
      return new Nastavnik({
        ...nastavnik,
        idNastavnik: nastavnik.id_nastavnik,
      });
    });
    return nastavniciInstances;
  }

  static async findByPk(id) {
    const nastavnik = await db.execute(
      'SELECT * FROM nastavnici WHERE nastavnici.id_nastavnik = ? LIMIT 1',
      [id]
    );
    if (nastavnik[0].length === 0) {
      return null;
    }
    const { id_nastavnik, ime, prezime, photo } = nastavnik[0][0];
    return new Nastavnik({ ime, prezime, photo, idNastavnik: id_nastavnik });
  }

  async delete() {
    if (this.idNastavnik === null) {
      throw new Error("Missing idNastavnik value. Delete can't be executed!");
    }
    const nastavnik = await db.execute(
      'DELETE FROM nastavnici WHERE id_nastavnik = ?',
      [this.idNastavnik]
    );
    return nastavnik[0];
  }
};
