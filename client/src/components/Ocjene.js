import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveOcjene } from '../redux/ocjene/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nastavnici.module.css';
import OcjenaRow from './OcjenaRow';

const Ocjene = () => {
  const ocjene = useSelector((state) => state.ocjene);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ucitajSveOcjene());
  }, []);

  return (
    <>
      <button
        onClick={() => {
          navigate('/ocjene/add-ocjenu');
        }}
      >
        Add ocjenu
      </button>
      <div>
        {ocjene.items.map((ocjena) => {
          return (
            <div key={ocjena.idOcjena} className={styles.nastavnici}>
              <OcjenaRow
                id={ocjena.idOcjena}
                ucenik={ocjena.ucenik}
                nastavnik={ocjena.nastavnik}
                predmet={ocjena.predmet}
                datum={String(ocjena.datum).split('T')[0]}
                ocjena={ocjena.ocjena}
                opis={ocjena.opis}
              />
              <Link to={'/ocjene/' + ocjena.idOcjena}>Details</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Ocjene;
