import { Link } from 'react-router-dom';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedin;

  const logoutProfileHandler = () => {
    authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedin && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedin && <li>
            <button onClick={logoutProfileHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
