const db = require('../util/database');

module.exports = class Odjeljenje {
  constructor({
    idOdjeljenja,
    idSkolskaGodina,
    idNastavnikRazrednik,
    oznakaOdjeljenja,
    idRazred,
    razrednik,
    razred,
  }) {
    this.idOdjeljenja = idOdjeljenja;
    this.idSkolskaGodina = idSkolskaGodina;
    this.idNastavnikRazrednik = idNastavnikRazrednik;
    this.oznakaOdjeljenja = oznakaOdjeljenja;
    (this.idRazred = idRazred),
      (this.razrednik = razrednik),
      (this.razred = razred);
  }

  async save() {
    if (!this.idOdjeljenja) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedOdjeljenje = await db.execute(
      'INSERT INTO odjeljenja (id_skolska_godina, id_nastavnik_razrednik, oznaka_odjeljenja, razred) VALUES (?, ?, ?, ?)',
      [
        this.idSkolskaGodina,
        this.idNastavnikRazrednik,
        this.oznakaOdjeljenja,
        this.razred,
      ]
    );
    this.idOdjeljenje = insertedOdjeljenje[0].insertId;
  }

  async update() {
    const updatedOdjeljenje = await db.execute(
      'UPDATE odjeljenja SET id_skolska_godina = ?, id_nastavnik_razrednik = ?, oznaka_odjeljenja = ?, razred = ? WHERE id_odjeljenja = ?',
      [
        this.idSkolskaGodina,
        this.idNastavnikRazrednik,
        this.oznakaOdjeljenja,
        this.razred,
        this.idOdjeljenja,
      ]
    );
  }

  static async fetchAll(idNastavnik) {
    if (idNastavnik) {
      const odjeljenja = await db.execute(
        `SELECT o.oznaka_odjeljenja 
        FROM balkon.odjeljenja_nastavnici odna 
                LEFT JOIN balkon.odjeljenja o ON odna.id_odjeljenja = o.id_odjeljenja 
                LEFT JOIN balkon.nastavnici n ON odna.id_nastavnik = n.id_nastavnik 
                WHERE n.id_nastavnik = ${idNastavnik};`
      );
      const odjeljenjaInstances = odjeljenja[0].map((odjeljenje) => {
        return new Odjeljenje({
          idOdjeljenja: odjeljenje.id_odjeljenja,
          idSkolskaGodina: odjeljenje.id_skolska_godina,
          idNastavnikRazrednik: odjeljenje.id_nastavnik_razrednik,
          oznakaOdjeljenja: odjeljenje.oznaka_odjeljenja,
          razred: odjeljenje.razred,
        });
      });
      return odjeljenjaInstances;
    } else {
      const odjeljenja = await db.execute('SELECT * FROM odjeljenja');
      const odjeljenjaInstances = odjeljenja[0].map((odjeljenje) => {
        return new Odjeljenje({
          idOdjeljenja: odjeljenje.id_odjeljenja,
          idSkolskaGodina: odjeljenje.id_skolska_godina,
          idNastavnikRazrednik: odjeljenje.id_nastavnik_razrednik,
          oznakaOdjeljenja: odjeljenje.oznaka_odjeljenja,
          razred: odjeljenje.razred,
        });
      });
      return odjeljenjaInstances;
    }
  }

  static async findByPk(id) {
    const odjeljenje = await db.execute(
      'SELECT * FROM odjeljenja WHERE odjeljenja.id_odjeljenja = ? LIMIT 1',
      [id]
    );
    if (odjeljenje[0].length === 0) {
      return null;
    }
    const {
      id_odjeljenja,
      id_skolska_godina,
      id_nastavnik_razrednik,
      oznaka_odjeljenja,
      razred,
    } = odjeljenje[0][0];
    return new Odjeljenje({
      idOdjeljenja: id_odjeljenja,
      idSkolskaGodina: id_skolska_godina,
      idNastavnikRazrednik: id_nastavnik_razrednik,
      oznakaOdjeljenja: oznaka_odjeljenja,
      razred: razred,
    });
  }

  static async findUcenikovaOdjeljenjaByPk(id) {
    const ucenikovaOdjeljenja = await db.execute(
      `SELECT o.id_odjeljenja AS id_razred, CONCAT(razred, ' ', oznaka_odjeljenja) AS razred , CONCAT(n.ime, ' ', n.prezime) as razrednik FROM balkon.ucenik_odjeljenje uo
      LEFT JOIN balkon.odjeljenja o on uo.id_odjeljenja=o.id_odjeljenja
      LEFT JOIN balkon.ucenici u on uo.id_ucenik=u.id_ucenik
      LEFT JOIN balkon.nastavnici n on o.id_nastavnik_razrednik=n.id_nastavnik
      WHERE u.id_ucenik=${id}`
    );
    if (ucenikovaOdjeljenja[0].length === 0) {
      return null;
    }
    const ucenikovaOdjeljenjaInstances = ucenikovaOdjeljenja[0].map(
      (odjeljenje) => {
        return new Odjeljenje({
          idRazred: odjeljenje.id_razred,
          razred: odjeljenje.razred,
          razrednik: odjeljenje.razrednik,
        });
      }
    );
    return ucenikovaOdjeljenjaInstances;
  }

  async delete() {
    if (this.idOdjeljenja === null) {
      throw new Error("Missing idOdjeljenja value. Delete can't be executed!");
    }
    const odjeljenje = await db.execute(
      'DELETE FROM odjeljenja WHERE id_odjeljenja = ?',
      [this.idOdjeljenja]
    );
    return odjeljenje[0];
  }
};
