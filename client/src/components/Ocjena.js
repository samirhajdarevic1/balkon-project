import React from 'react';
import store from '../redux/store';
import { useParams } from 'react-router-dom';
import styles from './Nastavnici.module.css';

const Ocjena = (props) => {
  const ocjene = store.getState().ocjene;
  const { idOcjena } = useParams();

  return (
    <div>
      <p>
        {props.id} {props.ucenik} {props.nastavnik} {props.datum} {props.ocjena}{' '}
        {props.razred}
      </p>
      {idOcjena &&
        ocjene
          .filter((ocj) => ocj.idOcjena === +idOcjena)
          .map((ocj) => {
            return (
              <div key={ocj.idOcjena} className={styles.nastavnici}>
                <p>
                  {ocj.idOcjena} {ocj.ucenik} {ocj.nastavnik} {ocj.datum}{' '}
                  {ocj.ocjena} {ocj.razred}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default Ocjena;
