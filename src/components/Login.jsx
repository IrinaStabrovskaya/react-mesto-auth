import AuthForm from './AuthForm';
import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from 'react';

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ' '
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

 // const [errorPegister, setErrorPegister] = useState(' ');
 
  return ( 
    <>  
      <Header>
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Header>       
      <AuthForm 
        title="Вход"
        text="Войти" 
        formValue={formValue}  
        onChange={handleChange}   
      />
    </>    
  );
};
 
export default Login;