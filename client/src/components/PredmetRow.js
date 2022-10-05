import React from 'react';

const PredmetRow = ({ id, naziv }) => {
  return (
    <div>
      <p>
        {id} {naziv}
      </p>
    </div>
  );
};

export default PredmetRow;
