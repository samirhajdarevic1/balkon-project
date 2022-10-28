import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ucitajUcenikeIzRazreda } from '../redux/ucenici/actions';
import styles from './UceniciIzRazreda.module.css';
const UceniciIzRazreda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idRazred } = useParams();
  const ucenici = useSelector((state) => state.ucenici.items);
  console.log(ucenici);
  useEffect(() => {
    dispatch(ucitajUcenikeIzRazreda(+idRazred));
  }, []);

  return (
    <>
      <h1>Ucenici u ovom razredu: </h1>
      <div>
        {ucenici.map((ucenik) => {
          return (
            <div key={ucenik.idUcenik} className={styles['ucenik-container']}>
              <p>
                {ucenik.ime} ({ucenik.imeOca}) {ucenik.prezime}
              </p>
              <a href={`/ucenici/${ucenik.idUcenik}`}>Detalji</a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UceniciIzRazreda;
