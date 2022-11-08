import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajUcenika } from '../redux/ucenici/actions';
import formStyles from './Form.module.css';

const AddUcenikForm = () => {
  const [imeUcenika, setImeUcenika] = useState('');
  const [prezimeUcenika, setPrezimeUcenika] = useState('');
  const [birthday, setBirthday] = useState('');
  const [image, setImage] = useState('');
  const [imeOca, setImeOca] = useState('');
  const [imeMajke, setImeMajke] = useState('');
  const [maticniBroj, setMaticniBroj] = useState('');
  const [adresaStanovanja, setAdresaStanovanja] = useState('');
  const [backdrop, setBackdrop] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      dodajUcenika({
        ime: imeUcenika,
        prezime: prezimeUcenika,
        birthday,
        image,
        imeOca,
        imeMajke,
        maticniBroj,
        adresaStanovanja,
      })
    ).then(() => {
      navigate('/ucenici');
    });
  };
  const backdropHandler = () => {
    setBackdrop(true);
    navigate(-1);
  };
  return (
    <>
      {!backdrop && (
        <div
          className={formStyles.backdrop}
          onClick={() => {
            backdropHandler();
          }}
        ></div>
      )}
      <form
        onSubmit={submitHandler}
        className={formStyles['form-control']}
        data="ucenik-form"
      >
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
          <li>
            <label>Image</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Slika"
              type="text"
            />
          </li>
          <li>
            <label>Otac</label>
            <input
              value={imeOca}
              onChange={(e) => setImeOca(e.target.value)}
              placeholder="Ime oca"
              type="text"
            />
          </li>
          <li>
            <label>Majka</label>
            <input
              value={imeMajke}
              onChange={(e) => setImeMajke(e.target.value)}
              placeholder="Ime majke"
              type="text"
            />
          </li>
          <li>
            <label>Maticni broj</label>
            <input
              value={maticniBroj}
              onChange={(e) => setMaticniBroj(e.target.value)}
              placeholder="Maticni broj"
              type="text"
            />
          </li>
          <li>
            <label>Adresa stanovanja</label>
            <input
              value={adresaStanovanja}
              onChange={(e) => setAdresaStanovanja(e.target.value)}
              placeholder="Adresa"
              type="text"
            />
          </li>
        </ul>
        <button data="add-ucenik-button">Add Ucenik</button>
      </form>
    </>
  );
};

export default AddUcenikForm;
