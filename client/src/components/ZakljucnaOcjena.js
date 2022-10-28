import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  dodajZakljucnuOcjenu,
  ucitajZakljucnuOcjenu,
} from '../redux/zakljucnaOcjena/actions';

const ZakljucnaOcjena = () => {
  const dispatch = useDispatch();
  const { idUcenik, idRazred, idPredmet } = useParams();
  console.log(1, idUcenik, idRazred, idPredmet);
  const [zakljOcj, setZakljOcj] = useState('');
  const [currentRazred] = useSelector((state) =>
    state.razredi.items.filter((razred) => razred.idRazred === +idRazred)
  );
  const ucenikoveOcjene = useSelector((state) => state.ocjene.items);
  const zakljucnaOcjena = useSelector((state) => state.zakljucneOcjene.items);
  console.log(1111, zakljucnaOcjena);
  const pojedinacneOcjene = ucenikoveOcjene.map((ocjena) => ocjena.ocjena);
  const prosjek = pojedinacneOcjene.reduce((total, curr) => {
    return +total + +curr / pojedinacneOcjene.length;
  }, 0);

  const zakljucnaOcjenaSubmitHandler = (e) => {
    if (ucenikoveOcjene) {
      console.log(e.target.zakljucnaOcjena.value);
      e.preventDefault();
      const zakljOcjena = {
        idUcenik: +idUcenik,
        idPredmet: +idPredmet,
        idSkolskaGodina: currentRazred.idSkolskaGodina,
        zakljucnaOcjena: zakljOcj,
      };
      console.log(zakljOcjena);
      dispatch(dodajZakljucnuOcjenu(zakljOcjena));
    }
  };
  useEffect(() => {
    if (ucenikoveOcjene.length > 0) {
      dispatch(
        ucitajZakljucnuOcjenu(
          idUcenik,
          idPredmet,
          currentRazred.idSkolskaGodina
        )
      );
    }
  }, [
    idUcenik,
    idRazred,
    idPredmet,
    currentRazred.idSkolskaGodina,
    zakljucnaOcjena.idZakljucnaOcjena,
  ]);

  return (
    <>
      <label>Prosjek ocjena</label>
      <input defaultValue={prosjek.toFixed(2)}></input>
      {/*       <form onSubmit={zakljucnaOcjenaSubmitHandler}>
        <label>Zakljucna ocjena</label>
        {idPredmet && zakljucnaOcjena[0] !== [] ? (
          <input defaultValue={zakljucnaOcjena[0].zakljucnaOcjena}></input>
        ) : (
          <>
            <input
              name="zakljucnaOcjena"
              value={zakljOcj}
              onChange={(e) => setZakljOcj(e.target.value)}
            />
            <button type="submit">Submit</button>
          </>
        )}
      </form> */}
    </>
  );
};

export default ZakljucnaOcjena;
