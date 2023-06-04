import React from "react";

const AuthForm = (props) => {
  console.log(props)
  return (
    <div className="auth">
      <h1 className="auth__title">{`${props.title}`}</h1>
      <form className="auth__form"  noValidate autoComplete="off" onSubmit={props.onSubmit}>
        
        <input
          className="auth__input"
          required
          id="email"
          name="email"
          type="email"
          value={props.formValue.email} 
          autoComplete="email"
          placeholder="Email"
          onChange={props.onChange}
        ></input>
        <input
          className="auth__input"
          required
          id="password"
          name="password"
          type="password"
          value={props.formValue.password}
          autoComplete="password"
          placeholder="Пароль"
          onChange={props.onChange}
          
        ></input>
        <button className="auth__btn-submit btn-hover" type="submit" >
            {`${props.text}`}
        </button>
        {props.children}
      </form>
    </div>
  );
};

export default AuthForm;
