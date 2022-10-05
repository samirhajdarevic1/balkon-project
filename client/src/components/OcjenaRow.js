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
      <p>
        {id} {ucenik} {opis}
        {datum} {predmet} {nastavnik} {ocjena} {razred}
      </p>
    </div>
  );
};

export default OcjenaRow;
