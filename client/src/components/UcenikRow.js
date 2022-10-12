import React from 'react';

const UcenikRow = ({ id, ime, prezime, birthday }) => {
  return (
    <div>
      <h1>
        {id} {ime} {prezime}
      </h1>
      <hr />
      <p>Birthday: {birthday}</p>
    </div>
  );
};

export default UcenikRow;
