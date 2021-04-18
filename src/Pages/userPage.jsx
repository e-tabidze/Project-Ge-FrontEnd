import React, { useState, useEffect } from "react";
import { getUserJewels } from "../Services/APIEndpoints";
import NewProductModal from "../Components/newProductModal";
import Circle from "../Reusable components/circle";
import MyProduct from "../Components/myProduct";

import "../CSS/userPage.css";

const UserPage = ({ currentUser }) => {
  const [newProductModalActive, setNewProductModalActive] = useState(false);
  const [userJewels, setUserJewels] = useState([]);

  useEffect(() => {
    handleGetUserJewels();
  }, []);

  const handleGetUserJewels = async () => {
    let jewelData = await getUserJewels(currentUser._id);
    setUserJewels(jewelData.data);
  };

  const handleNewProductModalToggle = () => {
    setNewProductModalActive(!newProductModalActive);
  };

  return (
    <div className="userpage-main-container">
      <div>რეკლამა აქ </div>
      <div className="content">
        <div>რეკლამა</div>
        <div className="user-settings">
          <div className="options">
            <Circle
              label="განცხადების დამატება"
              onClick={handleNewProductModalToggle}
            />

            {newProductModalActive && (
              <>
                <div className="newProductModal">
                  <NewProductModal
                    handleNewProductModalToggle={handleNewProductModalToggle}
                    currentUser={currentUser}
                  />
                </div>
                <div
                  className="grey-overlay"
                  onClick={handleNewProductModalToggle}
                ></div>
              </>
            )}
            <Circle label="ბალანსის შევსება" />
            <Circle label="განცხადების განახლება" />
            <Circle label="განცხადების წაშლა" />
            <Circle label="Super" />
            <Circle label="VIP" />
          </div>
          <div className="title">
            <p> მომხმარებლის ID: {currentUser._id[0]} </p>
          </div>
          <div className="title">
            <p> ჩემი განცხადებები</p>
          </div>
          <div>
            {userJewels &&
              userJewels.map((jewel, index) => {
                return (
                  <MyProduct
                    key={index}
                    jewel={jewel}
                    userJewels={userJewels}
                    setUserJewels={setUserJewels}
                    getUserJewels={getUserJewels}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div>რეკლამა</div>
    </div>
  );
};

export default UserPage;
