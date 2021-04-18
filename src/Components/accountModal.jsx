import React from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import Divider from "../Reusable components/divider";
import CloseIcon from "@material-ui/icons/Close";

import "../CSS/accountModal.css";

const AccountModal = ({ handleAccountModalToggle }) => {
  return (
    <div className="account-modal-container">
      <div className="account-modal-wrapper">
        <CloseIcon className="closeicon" onClick={handleAccountModalToggle} />
        <LoginForm handleModalToggle={handleAccountModalToggle} />
        <Divider />
        <RegisterForm handleModalToggle={handleAccountModalToggle} />
      </div>
    </div>
  );
};

export default AccountModal;
