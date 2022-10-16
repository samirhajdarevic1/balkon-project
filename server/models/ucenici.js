const db = require('../util/database');

module.exports = class Ucenik {
  constructor({ idUcenik, ime, prezime, birthday, predmeti }) {
    this.idUcenik = idUcenik;
    this.ime = ime;
    this.prezime = prezime;
    this.birthday = birthday;
    this.predmeti = predmeti;
  }

  async save() {
    if (!this.idUcenik) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const savedUcenik = await db.execute(
      'INSERT INTO ucenici (ime, prezime, birthday) VALUES (?, ?, ?)',
      [this.ime, this.prezime, this.birthday]
    );
    this.idUcenik = savedUcenik[0].insertId;
  }

  async update() {
    const updatedUcenik = await db.execute(
      'UPDATE ucenici SET ime = ?, prezime = ?, birthday = ? WHERE id_ucenik = ?',
      [this.ime, this.prezime, this.birthday, this.idUcenik]
    );
  }

  static async fetchAll(idOdjeljenja) {
    if (idOdjeljenja) {
      const ucenici = await db.execute(
        `SELECT u.ime, u.prezime FROM balkon.ucenik_odjeljenje  uo 
        JOIN balkon.odjeljenja o 
        JOIN balkon.ucenici u 
        WHERE balkon.uo.id_odjeljenja = o.id_odjeljenja 
        AND balkon.uo.id_ucenik = u.id_ucenik
        AND o.id_odjeljenja = ${idOdjeljenja}
        ;`
      );
      const uceniciInstances = ucenici[0].map((ucenik) => {
        return new Ucenik({
          idUcenik: ucenik.id_ucenik,
          ime: ucenik.ime,
          prezime: ucenik.prezime,
          birthday: ucenik.birthday,
        });
      });
      return uceniciInstances;
    } else {
      const ucenici = await db.execute('SELECT * FROM ucenici');
      const uceniciInstances = ucenici[0].map((ucenik) => {
        return new Ucenik({
          idUcenik: ucenik.id_ucenik,
          ime: ucenik.ime,
          prezime: ucenik.prezime,
          birthday: ucenik.birthday,
        });
      });
      return uceniciInstances;
    }
  }

  static async findByPk(id, razredId) {
    const ucenik = await db.execute(
      'SELECT * FROM ucenici WHERE ucenici.id_ucenik = ? LIMIT 1',
      [id]
    );

    if (razredId) {
      const ucenikoviPredmeti = await db.execute(
        `    SELECT 
          od.id_odjeljenja, p.id_predmet, p.naziv, CONCAT(od.razred,' ', od.oznaka_odjeljenja  ) as razred
           FROM balkon.predmeti_ucenici pu
           LEFT JOIN balkon.predmeti p on p.id_predmet = pu.id_predmet
           LEFT JOIN balkon.ucenici u ON u.id_ucenik = pu.id_ucenik
           LEFT JOIN balkon.odjeljenja od ON od.id_odjeljenja = pu.id_odjeljenja
           WHERE pu.id_ucenik=${id}
           AND pu.id_odjeljenja=${razredId}
           ;`
      );
      const predmeti = ucenikoviPredmeti[0];
      const { id_ucenik, ime, prezime, birthday } = ucenik[0][0];
      return new Ucenik({
        idUcenik: id_ucenik,
        ime,
        prezime,
        birthday,
        predmeti,
      });
    }

    if (ucenik[0].length === 0) {
      return null;
    }
    //const predmeti = ucenikoviPredmeti[0];
    //console.log(1, predmeti);
    const { id_ucenik, ime, prezime, birthday } = ucenik[0][0];
    return new Ucenik({
      idUcenik: id_ucenik,
      ime,
      prezime,
      birthday,
      //  predmeti,
    });
  }

  async delete() {
    if (this.idUcenik === null) {
      throw new Error("Missing idNastavnik value. Delete can't be executed!");
    }
    const ucenik = await db.execute('DELETE FROM ucenici WHERE id_ucenik = ?', [
      this.idUcenik,
    ]);
    return ucenik[0];
  }
};
