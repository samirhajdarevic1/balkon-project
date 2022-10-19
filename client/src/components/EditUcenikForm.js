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
      })
    ).then(() => navigate(`/ucenici/${idUcenik}`));
  };

  return (
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
              value={birthday}
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
        </ul>
      </div>
      <button>Done editing</button>
    </form>
  );
};

export default EditUcenikForm;
