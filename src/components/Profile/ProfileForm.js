import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/auth-context";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const profileFormSubmitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const changePasswordHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCL7WxYMeYOz-7uYJ1JxBYF3HlhcAGXzi4",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              password: enteredNewPassword,
              returnSecureToken: false,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert("Password changed successfully: Login again.");
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    changePasswordHandler();
  };
  return (
    <form className={classes.form} onSubmit={profileFormSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
