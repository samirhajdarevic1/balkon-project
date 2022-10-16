import React from 'react';

const RazredRow = ({
  id,
  razred,
  oznakaOdjeljenja,
  idSkolskaGodina,
  idNastavnikRazrednik,
}) => {
  return (
    <div>
      <p>idRazred: {id}</p>
      <p>idSkolskaGodina: {idSkolskaGodina} </p>
      <p>razred: {razred}</p>
      <p>Odjeljenje: {oznakaOdjeljenja}</p>
      <p>idNastavnikRazrednik: {idNastavnikRazrednik}</p>
    </div>
  );
};

export default RazredRow;
