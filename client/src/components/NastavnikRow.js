import React from 'react';

const NastavnikRow = ({ id, ime, prezime, photo }) => {
  return (
    <div>
      <div>
        <img src={photo} alt="Nastavnik"></img>
      </div>
      <p>
        {id} {ime} {prezime}
      </p>
    </div>
  );
};

export default NastavnikRow;
