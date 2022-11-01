import React from 'react';

const RazredRow = ({ id, razred, oznakaOdjeljenja, razrednik }) => {
  return (
    <div key={id}>
      <p>idRazred: {id}</p>
      <p>
        razred: {razred} {oznakaOdjeljenja}
      </p>
      <p>Razrednik: {razrednik}</p>
    </div>
  );
};

export default RazredRow;
