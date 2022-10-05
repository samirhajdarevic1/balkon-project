import React from 'react';

const NastavnikRow = ({ id, ime, prezime }) => {
  return (
    <div>
      <p>
        {id} {ime} {prezime}
      </p>
    </div>
  );
};

export default NastavnikRow;
