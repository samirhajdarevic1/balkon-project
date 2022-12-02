import React from 'react';
import styles from './Ucenik.module.css';

const UcenikRow = ({
  id,
  ime,
  prezime,
  birthday,
  image,
  imeOca,
  imeMajke,
  maticniBroj,
  adresa,
  onEditUcenikHandler,
  onDeleteUcenikHandler,
}) => {
  return (
    <>
      <h1 className="text-4xl mb-10 left-[15%]">
        {/* <span>{id} </span> */}
        {ime} {prezime}
      </h1>
      <div className="ucenik-data" data="ucenik-data">
        <p>
          Datum rođenja: <span> {birthday}</span>{' '}
        </p>
        <p>
          Otac: <span> {imeOca}</span>
        </p>
        <p>
          Majka: <span> {imeMajke}</span>{' '}
        </p>
        <p>
          Maticni broj: <span> {maticniBroj}</span>{' '}
        </p>
        <p>
          Adresa: <span> {adresa}</span>{' '}
        </p>
      </div>
      <div className={styles.image}>
        <img className="ucenik-image top-[15%]" src={image} alt="User"></img>
      </div>
      <div className={styles['buttons-container']}>
        <button
          className="btn btn-thertiary"
          onClick={() => {
            onEditUcenikHandler(id);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary m-5"
          onClick={() => {
            onDeleteUcenikHandler(id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default UcenikRow;
