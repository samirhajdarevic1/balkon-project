import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ucitajUcenikeIzRazreda } from '../redux/ucenikRazred/actions';
import styles from './UceniciIzRazreda.module.css';
const UceniciIzRazreda = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idRazred, idSkolskaGodina } = useParams();
  const uceniciRazred = useSelector((state) => state.ucenikRazred.items);
  const razredi = useSelector((state) => state.razredi.items);
  /*   const skolskeGodine = useSelector((state) => state.skolskeGodine.items);

  const allSkolskeGodineIds = skolskeGodine.map((sg) => {
    return sg.idSkolskaGodina;
  });
  const indexOfFirstElement = allSkolskeGodineIds.indexOf(+idSkolskaGodina);
 */
  useEffect(() => {
    if (idRazred) {
      dispatch(ucitajUcenikeIzRazreda(+idRazred));
    }
  }, []);

  return (
    <>
      <button
        onClick={() => {
          navigate('add-ucenik');
        }}
      >
        Dodaj ucenika u razred
      </button>
      <h1>Ucenici u ovom razredu: </h1>
      <div>
        {uceniciRazred.map((ucenik) => {
          return (
            <div key={ucenik.idUcenik} className={styles['ucenik-container']}>
              <p>
                {ucenik.ime} ({ucenik.imeOca}) {ucenik.prezime}
              </p>
              <a href={`/ucenici/${ucenik.idUcenik}`} className={styles.button}>
                Detalji
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UceniciIzRazreda;
