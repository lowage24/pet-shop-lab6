import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";



export default function RegForm({ onRegister ,isLoggedIn}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleClick = () => {
    navigate("/login");
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!username  !confirmPassword) { // Проверка наличия имени пользователя, пароля и подтверждения пароля
        setErrorMessage('Имя пользователя, пароль и подтверждение пароля не могут быть пустыми');
        return;
      }
  
      
    else if (password !== confirmPassword) { // Проверка совпадения пароля и подтверждения пароля
        setErrorMessage('Пароль и подтверждение пароля не совпадают');
        return;
      }
  
      
    else if (!email || !/\S+@\S+\.\S+/.test(email)) { // Проверка валидности
        setErrorMessage('Неправильный формат email-адреса');
        return;
      }
    else {
        onRegister({ username, password,email });
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setErrorMessage('');
        handleClick()
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <label>
        Name:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <label>
        Repeat password:
        <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button type="submit">Зарегистрироваться</button>
    </form>
    );
    }