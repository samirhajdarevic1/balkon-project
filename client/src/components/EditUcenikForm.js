import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajUcenika, urediUcenika } from '../redux/ucenici/actions';
import formStyles from './Form.module.css';

const EditUcenikForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idUcenik } = useParams();
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  const [imeUcenika, setImeUcenika] = useState('');
  const [prezimeUcenika, setPrezimeUcenika] = useState('');
  const [birthday, setBirthday] = useState(ucenik.birthday || '');
  const [image, setImage] = useState(ucenik.image || '');
  const [backdrop, setBackdrop] = useState('');
  const [imeMajke, setImeMajke] = useState('');
  const [imeOca, setImeOca] = useState('');
  const [adresa, setAdresa] = useState('');
  const [maticniBroj, setMaticniBroj] = useState('');

  useEffect(() => {
    if (!ucenik) {
      dispatch(ucitajUcenika(+idUcenik));
    }
  }, []);

  useEffect(() => {
    if (ucenik) {
      setImeUcenika(ucenik.ime);
      setPrezimeUcenika(ucenik.prezime);
      setBirthday(ucenik.birthday);
      setImage(ucenik.image);
      setImeMajke(ucenik.imeMajke);
      setImeOca(ucenik.imeOca);
      setAdresa(ucenik.adresa);
      setMaticniBroj(ucenik.maticniBroj);
    }
  }, [ucenik]);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(
      urediUcenika({
        idUcenik,
        ime: imeUcenika,
        prezime: prezimeUcenika,
        birthday,
        image,
        imeMajke,
        imeOca,
        adresa,
        maticniBroj,
      })
    ).then(() => navigate(`/ucenici/${idUcenik}`));
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

      <form onSubmit={editHandler} className={formStyles['form-control']}>
        <div>
          <ul>
            <li>
              <label>Ime</label>
              <input
                value={imeUcenika}
                onChange={(e) => setImeUcenika(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Prezime</label>
              <input
                value={prezimeUcenika}
                onChange={(e) => setPrezimeUcenika(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Birthday</label>
              <input
                value={String(birthday).split('T')[0]}
                onChange={(e) => setBirthday(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Image</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Ime majke</label>
              <input
                value={imeMajke}
                onChange={(e) => setImeMajke(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Ime oca</label>
              <input
                value={imeOca}
                onChange={(e) => setImeOca(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Adresa</label>
              <input
                value={adresa}
                onChange={(e) => setAdresa(e.target.value)}
                type="text"
              />
            </li>
            <li>
              <label>Maticni broj</label>
              <input
                value={maticniBroj}
                onChange={(e) => setMaticniBroj(e.target.value)}
                type="text"
              />
            </li>
          </ul>
        </div>
        <button>Done editing</button>
      </form>
    </>
  );
};

export default EditUcenikForm;
