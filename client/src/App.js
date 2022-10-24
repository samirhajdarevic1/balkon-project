import Nastavnici from './components/Nastavnici';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import styles from './App.module.css';
import Nastavnik from './components/Nastavnik';
import Predmeti from './components/Predmeti';
import Predmet from './components/Predmet';
import Ucenici from './components/Ucenici';
import Ucenik from './components/Ucenik';
import Ocjene from './components/Ocjene';
import Ocjena from './components/Ocjena';
import AddPredmetForm from './components/AddPredmetForm';
import EditPredmetForm from './components/EditPredmetForm';
import AddNastavnikForm from './components/AddNastavnikForm';
import EditNastavnikForm from './components/EditNastavnikForm';
import AddUcenikForm from './components/AddUcenikForm';
import EditUcenikForm from './components/EditUcenikForm';
import EditOcjenuForm from './components/EditOcjenuForm';
import AddOcjenuForm from './components/AddOcjenuForm';
import Razred from './components/Razred';
import Razredi from './components/Razredi';
import AddRazredForm from './components/AddRazredForm';
import UcenikTest from './components/UcenikTest';
import UcenikoviPredmeti from './components/UcenikoviPredmeti';
import UcenikoveOcjene from './components/UcenikoveOcjene';
import Modal from './components/Modal';

function App() {
  return (
    <div>
      <h1>Main Navigation</h1>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nastavnici" element={<Nastavnici />} />
          <Route
            path="nastavnici/add-nastavnik"
            element={<AddNastavnikForm />}
          />
          <Route
            path="/nastavnici/:idNastavnik/edit"
            element={<EditNastavnikForm />}
          />
          <Route path="ucenici" element={<Ucenici />} />

          <Route path="ucenici/:idUcenik" element={<UcenikTest />}>
            <Route index element={<Razred />} />
            <Route path=":idRazred" element={<Razred />}>
              <Route index element={<UcenikoviPredmeti />} />
              <Route path=":idPredmet" element={<UcenikoviPredmeti />}>
                <Route index element={<UcenikoveOcjene />} />
                <Route path="add-ocjenu" element={<AddOcjenuForm />} />
                <Route
                  path="ocjene/:idOcjena/edit"
                  element={<EditOcjenuForm />}
                />
              </Route>
            </Route>
          </Route>
          <Route path="ucenici/:idUcenik/edit" element={<EditUcenikForm />} />
          <Route path="ucenici/add-ucenik" element={<AddUcenikForm />} />
          <Route path="nastavnici/:idNastavnik" element={<Nastavnik />} />
          <Route path="predmeti/:idPredmet" element={<Predmet />} />
          <Route path="predmeti/add-predmet" element={<AddPredmetForm />} />
          <Route
            path="predmeti/:idPredmet/edit"
            element={<EditPredmetForm />}
          ></Route>
          <Route path="predmeti" element={<Predmeti />} />
          <Route path="ocjene" element={<Ocjene />} />
          <Route path="ocjene/:idOcjena" element={<Ocjena />} />
          <Route path="ocjene/:idOcjena/edit" element={<EditOcjenuForm />} />
          <Route path="ocjene/add-ocjenu" element={<AddOcjenuForm />} />
          <Route path="razredi" element={<Razredi />}>
            <Route path=":idRazred" element={<Razred />} />
          </Route>
          <Route path="razredi/add-razred" element={<AddRazredForm />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/predmeti">Predmeti</Link>
            </li>
            <li>
              <Link to="/nastavnici">Nastavnici</Link>
            </li>
            <li>
              <Link to="/ucenici">Ucenici</Link>
            </li>
            <li>
              <Link to="/ocjene">Ocjene</Link>
            </li>
            <li>
              <Link to="/razredi">Razredi</Link>
            </li>
          </ul>
        </nav>

        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      </header>
      <Outlet />
    </>
  );
}

function Home() {
  return <h1>Ovo je pocetna</h1>;
}

export default App;
