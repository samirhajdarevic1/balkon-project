import React from 'react';

const PredmetRow = ({ id, naziv }) => {
  return (
    <div className="m-4" data="predmet-container">
      <p>
        {id} {naziv}
      </p>
    </div>
  );
};

export default PredmetRow;
