import { React } from 'react';
import store from '../redux/store';
import { useParams } from 'react-router-dom';
import styles from './Nastavnici.module.css';

const Nastavnik = (props) => {
  const nastavnici = store.getState().nastavnici.items;
  const { idNastavnik } = useParams();

  return (
    <div>
      <p>
        {props.id} {props.ime} {props.prezime}
      </p>
      {idNastavnik &&
        nastavnici
          .filter((nas) => nas.idNastavnik === +idNastavnik)
          .map((nast) => {
            return (
              <div key={nast.idNastavnik} className={styles.nastavnici}>
                <p>
                  {nast.idNastavnik} {nast.ime} {nast.prezime}
                </p>
                <button onClick={() => {}}>Delete</button>
              </div>
            );
          })}
    </div>
  );
};

export default Nastavnik;
