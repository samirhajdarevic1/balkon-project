import { Outlet, Link } from 'react-router-dom';
import styles from '../App.module.css';

function Layout() {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <>
      <header className="flex justify-center mt-12">
        <nav className="nav">
          <div className="container m-auto flex justify-between items-center">
            <a href="/home" className="pl-8 py-4 text-xl font-bold text-black">
              SDB
            </a>
            <ul className="hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer text-back text-lg">
              <li>
                <Link to="/home">Home</Link>
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
              {/* <li>
                <Link to="/ocjene">Ocjene</Link>
              </li> */}
              <li>
                <Link to="/razredi">Razredi</Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
            <button className="block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group  bg-black">
              <div className="w-5 h-1 bg-black mb-1"></div>
              <div className="w-5 h-1 bg-black mb-1"></div>
              <div className="w-5 h-1 bg-black mb-1"></div>
              <div className="absolute top 0 -right-full opacity-0 h-screen w-8/12 bg-white border transform group-focus:right-0 group-focus:opacity-100 transition-all duration-300 text-greenyellow">
                <ul className="flex flex-col items-center w-full text-base cursor-pointer  text-greenyellow">
                  <li>
                    <Link to="/home">Home</Link>
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
                  {/* <li>
                <Link to="/ocjene">Ocjene</Link>
              </li> */}
                  <li>
                    <Link to="/razredi">Razredi</Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </nav>

        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
