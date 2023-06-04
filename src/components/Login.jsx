import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

const Login = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    props.onAuthorization(email, password);
  };

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <AuthForm
        title="Вход"
        text="Войти"
        formValue={formValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
