import React, { useState } from "react";
import Joi from "joi-browser";
import Button from "../Reusable components/button";
import Input from "../Reusable components/input";
import { login } from "../Services/APIEndpoints";

import "../CSS/loginForm.css";
import { NavLink } from "react-router-dom";

const LoginForm = ({ handleModalToggle }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().max(30).min(8).required().label("Password"),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateProperty({ name, value });
    console.log(errorMessage, "errorMessage");
    if (errorMessage)
      setErrors((prevState) => ({
        ...prevState,
        [name]: errorMessage,
      }));
    else
      setErrors((prevState) => ({
        ...prevState,
        [name]: null,
      }));

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const result = Joi.validate(user, schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const demoSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, demoSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const demoErrors = validate();

    setErrors((prevState) => ({
      ...prevState,
      ["email"]: demoErrors ? demoErrors.email : null,
      ["password"]: demoErrors ? demoErrors.password : null,
    }));
    try {
      const { data: jwt } = await login(user.email, user.password);
      localStorage.setItem("token", jwt);
      console.log("token", jwt);
      window.location.reload(false);
      handleModalToggle();
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        setErrors((prevState) => ({
          ...prevState,
          ["email"]: ex.response.data,
          ["password"]: ex.response.data,
        }));
      }
    }
  };

  return (
    <div className="login-container">
      <h1>შესვლა</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-inputs">
          <Input
            className="input-form"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="თქვენი ელ-ფოსტა"
            error={errors.email}
            autoFocus={true}
          />
          <Input
            className="input-form"
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="პაროლი"
            error={errors.password}
          />
        </div>
        <div className="login-actions">
          <Button
            className="login-submit"
            label="შესვლა"
            onClick={handleSubmit}
            disabled={validate()}
          />
          <NavLink to="/profile" className="forgot-password">
            დაგავიწყდათ პაროლი?
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
