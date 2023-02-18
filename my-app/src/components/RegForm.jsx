import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


function RegistrationForm({ onRegister ,isLoggedIn}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [errMail, setErrMail] = useState("");
  const [errPass, setErrPass] = useState("");


  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password || !confirmPassword) {
        setErrMessage('Имя пользователя, пароль и подтверждение пароля не могут быть пустыми');
        return;
      }

    else if (password !== confirmPassword) {
      setErrPass('Пароль и подтверждение пароля не совпадают');
        return;
      }

    else if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrMail('Неверный формат email адреса');
        return;
      }
    else {
        onRegister({ username, password, email });
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setErrMessage('');
        setErrMail('');
        setErrPass('');
        handleClick('');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {errMessage && <div>{errMessage}</div>}
      <label>
        Имя пользователя:
        <input type="text" value={username} className={errMessage && 'validate-err'}onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Пароль:{errPass&&<p>{errPass}</p>}
        <input type="password" value={password} className={errPass && 'validate-err'} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Подтверждение пароля:{errPass&&<p>{errPass}</p>}
        <input type="password" value={confirmPassword} className={errPass && 'validate-err'} onChange={(event) => setConfirmPassword(event.target.value)} />
      </label>
      <label>
        Почта:{errMail&& <p>{errMail}</p>}
        <input type="email" value={email} className={errMail && 'validate-err'} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button type="submit">Зарегистрироваться</button>
    </form>
    );
    }


    export default RegistrationForm;