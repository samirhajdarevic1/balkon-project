import React from 'react';

const PredmetRow = ({ id, naziv }) => {
  return (
    <div data="predmet-container">
      <p>
        {id} {naziv}
      </p>
    </div>
  );
};

export default PredmetRow;
