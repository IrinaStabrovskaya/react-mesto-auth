import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import * as mestoAuth from "../utils/mestoAuth";
const Register = () => {  
  const [formValue, setFormValue] = useState({
    email: '',
    password: ' '
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });  }
   
  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    console.log(mestoAuth.register)
    mestoAuth.register(email, password)
      .then((data) => {
        console.log(data);
      })
  }
    return (  
    <>  
      <Header>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Header>    
      <AuthForm
        title="Регистрация" text="Зарегистрироваться" onChange={handleChange}
        formValue={formValue} onSubmit={handleSubmit}
      >
        <div className="auth__wrapper">
          <p className="auth__subtitle">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__link">Войти</Link>        
        </div>
      </AuthForm> 
    </>   
  );
}; 
export default Register;