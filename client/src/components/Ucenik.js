import React from 'react';
import store from '../redux/store';
import { useParams } from 'react-router-dom';
import styles from './Nastavnici.module.css';

const Ucenik = (props) => {
  const ucenici = store.getState().ucenici.items;
  const { idUcenik } = useParams();

  return (
    <div>
      <p>
        {props.id} {props.ime} {props.prezime} {props.birthday}
      </p>
      {idUcenik &&
        ucenici
          .filter((ucenik) => ucenik.idUcenik === +idUcenik)
          .map((ucenik) => {
            return (
              <div key={ucenik.idUcenik} className={styles.nastavnici}>
                <p>
                  {ucenik.idUcenik} {ucenik.ime} {props.prezime}{' '}
                  {props.birthday}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default Ucenik;
