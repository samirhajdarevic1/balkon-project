const db = require('../util/database');

module.exports = class ZakljucnaOcjena {
  constructor({
    idZakljucnaOcjena,
    id_skolska_godina,
    skolskaGodina,
    naziv,
    ucenik,
    id_predmet,
    id_ucenik,
    zakljucnaOcjena,
  }) {
    this.idZakljucnaOcjena = idZakljucnaOcjena;
    this.idSkolskaGodina = id_skolska_godina;
    (this.skolskaGodina = skolskaGodina),
      (this.naziv = naziv),
      (this.ucenik = ucenik),
      (this.idPredmet = id_predmet);
    this.idUcenik = id_ucenik;
    this.zakljucnaOcjena = zakljucnaOcjena;
  }

  async save() {
    if (!this.idZakljucnaOcjena) {
      await this.insert();
    } else {
      await this.update();
    }
  }

  async insert() {
    const insertedZakljucnaOcjena = await db.execute(
      'INSERT INTO balkon.zakljucne_ocjene (id_skolska_godina, id_predmet, id_ucenik, zakljucna_ocjena) VALUES (?,?,?, ?)',
      [
        this.idSkolskaGodina,
        this.idPredmet,
        this.idUcenik,
        this.zakljucnaOcjena,
      ]
    );
    this.idZakljucnaOcjena = insertedZakljucnaOcjena[0].insertId;
    console.log(insertedZakljucnaOcjena);
  }

  async update() {
    const updatedZakljucnaOcjena = await db.execute(
      'UPDATE zakljucne_ocjene SET id_skolska_godina = ?, id_predmet = ?, ucenik = ?, id_zakljucna_ocjena WHERE id_zakljucna_ocjena = ?',
      [
        this.idSkolskaGodina,
        this.idPredmet,
        this.ucenik,
        this.idZakljucnaOcjena,
      ]
    );
  }

  static async fetchAll() {
    const zakljucneOcjene = await db.execute(`
    SELECT zo.id_zakljucna_ocjena, sg.skolska_godina, p.naziv, CONCAT(u.ime, ' ',  u.prezime) as ucenik, zo.zakljucna_ocjena
    FROM balkon.zakljucne_ocjene zo
    left join balkon.skolske_godine sg on sg.id_skolska_godina = zo.id_skolska_godina
    left join balkon.predmeti p on p.id_predmet = zo.id_predmet
    left join balkon.ucenici u on u.id_ucenik = zo.id_ucenik;`);
    const zakljucneOcjeneInstances = zakljucneOcjene[0].map((zakljOcjena) => {
      return new ZakljucnaOcjena({
        idZakljucnaOcjena: zakljOcjena.id_zakljucna_ocjena,
        idSkolskaGodina: zakljOcjena.skolska_godina,
        idPredmet: zakljOcjena.naziv,
        ucenik: zakljOcjena.ucenik,
        zakljucnaOcjena: zakljOcjena.zakljucna_ocjena,
      });
    });
    return zakljucneOcjeneInstances;
  }

  static async findByPk(idUcenik, idPredmet, idSkolskaGodina) {
    const zakljucnaOcjena = await db.execute(
      `SELECT zo.id_zakljucna_ocjena,sg.id_skolska_godina, sg.skolska_godina,p.id_predmet, p.naziv, u.id_ucenik,  CONCAT(u.ime, ' ',  u.prezime) as ucenik, zo.zakljucna_ocjena
      FROM balkon.zakljucne_ocjene zo
      left join balkon.skolske_godine sg on sg.id_skolska_godina = zo.id_skolska_godina
      left join balkon.predmeti p on p.id_predmet = zo.id_predmet
      left join balkon.ucenici u on u.id_ucenik = zo.id_ucenik
      where u.id_ucenik=${idUcenik} and p.id_predmet=${idPredmet} and sg.id_skolska_godina=${idSkolskaGodina}`
    );
    if (zakljucnaOcjena[0].length === 0) {
      return null;
    }
    const {
      id_zakljucna_ocjena,
      id_skolska_godina,
      skolska_godina,
      id_predmet,
      naziv,
      id_ucenik,
      ucenik,
      zakljucna_ocjena,
    } = zakljucnaOcjena[0][0];
    return new ZakljucnaOcjena({
      idZakljucnaOcjena: id_zakljucna_ocjena,
      idSkolskaGodina: id_skolska_godina,
      skolskaGodina: skolska_godina,
      idPredmet: id_predmet,
      naziv: naziv,
      idUcenik: id_ucenik,
      ucenik: ucenik,
      zakljucnaOcjena: zakljucna_ocjena,
    });
  }

  async delete() {
    if (this.idZakljucnaOcjena === null) {
      throw new Error(
        "Missing idZakljucnaOcjena value. Delete can't be executed!"
      );
    }
    const zakljOcjena = await db.execute(
      'DELETE FROM zakljucne_ocjene WHERE id_zakljucna_ocjena = ?',
      [this.idZakljucnaOcjena]
    );
    return zakljOcjena[0];
  }
};
