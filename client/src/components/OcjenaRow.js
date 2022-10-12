import React from 'react';

const OcjenaRow = ({
  id,
  ucenik,
  opis,
  datum,
  predmet,
  nastavnik,
  ocjena,
  razred,
}) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Ucenik: {ucenik}</p>
      <p>Datum ocjene: {datum}</p>
      <p>Nastavnik: {nastavnik}</p>
      <p>Predmet: {predmet}</p>
      <p>Ocjena: {ocjena}</p>
      <p>Opis: {opis}</p>
      <p>Razred: {razred}</p>
    </div>
  );
};

export default OcjenaRow;
