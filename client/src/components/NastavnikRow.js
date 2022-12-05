import React from 'react';

const NastavnikRow = ({ id, ime, prezime, photo }) => {
  return (
    <>
      <div className="flex justify-center">
        <img className="nastavnik-image" src={photo} alt="Nastavnik"></img>
      </div>
      <h1 className="m-4 text-lg">
        {/* {id} */} {ime} {prezime}
      </h1>
    </>
  );
};

export default NastavnikRow;
