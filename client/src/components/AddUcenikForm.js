import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajUcenika } from '../redux/ucenici/actions';

const AddUcenikForm = () => {
  const [imeUcenika, setImeUcenika] = useState('');
  const [prezimeUcenika, setPrezimeUcenika] = useState('');
  const [birthday, setBirthday] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      dodajUcenika({ ime: imeUcenika, prezime: prezimeUcenika, birthday })
    ).then(() => {
      navigate('/ucenici');
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <ul>
        <li>
          <label>Ime</label>
          <input
            value={imeUcenika}
            onChange={(e) => setImeUcenika(e.target.value)}
            placeholder="Ime ucenika"
            type="text"
          />
        </li>
        <li>
          <label>Prezime</label>
          <input
            value={prezimeUcenika}
            onChange={(e) => setPrezimeUcenika(e.target.value)}
            placeholder="Prezime ucenika"
            type="text"
          />
        </li>
        <li>
          <label>Birthday</label>
          <input
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Datum rodjenja"
            type="date"
          />
        </li>
      </ul>
      <button>Add Ucenik</button>
    </form>
  );
};

export default AddUcenikForm;
