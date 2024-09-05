import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if(isLogin) 
    {
      const loginHandler = async() => {
        setIsLoading(true);
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCL7WxYMeYOz-7uYJ1JxBYF3HlhcAGXzi4', {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
            }),
            headers: {
              'Content-type': 'application/json'
            }
          })
          if(!response.ok) {
            alert('Authentication failed');
            throw new Error('Authentication failed');
          }
          else {
            const data = await response.json();
            authCtx.login(data.idToken);
          }
        }
        catch(error) {
          console.error(error.message);
        }
        finally {
          setIsLoading(false);
        }
      }
      loginHandler();
    }
    else {
      const signUpHandler = async() => {
        setIsLoading(true)
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCL7WxYMeYOz-7uYJ1JxBYF3HlhcAGXzi4', {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
        if(!response.ok) {
          const data = await response.json();
          let errorMessage = 'Authentication failed';
          if(data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage);
        }
        }
        catch(error) {
          console.error(error.message);
        }
        finally {
          setIsLoading(false);
        }
      }
      signUpHandler();
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {isLoading? (<p>Sending requests...!!</p>):(<button>{isLogin ? "Login" : "Create Account"}</button>)}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
