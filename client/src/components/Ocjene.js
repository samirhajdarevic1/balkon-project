import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ucitajSveOcjene } from '../redux/ocjene/actions';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Ocjene.module.css';
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
      <div className={styles['ocjene-container']}>
        {ocjene.items.map((ocjena) => {
          return (
            <>
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default Ocjene;
