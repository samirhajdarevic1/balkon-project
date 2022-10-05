import React from 'react';

const UcenikRow = ({ id, ime, prezime, birthday }) => {
  return (
    <div>
      <p>
        {id} {ime} {prezime} {birthday}
      </p>
    </div>
  );
};

export default UcenikRow;
