import React from 'react';

const RazredRow = ({ id, razred, oznakaOdjeljenja, razrednik }) => {
  return (
    <div className="flex flex-col items-start m-6" key={id}>
      <p>idRazred: {id}</p>
      <p>
        razred: {razred} {oznakaOdjeljenja}
      </p>
      <p>Razrednik: {razrednik}</p>
    </div>
  );
};

export default RazredRow;
