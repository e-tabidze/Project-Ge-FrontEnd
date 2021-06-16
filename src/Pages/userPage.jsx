import React, { useState, useEffect } from "react";
import { getUserJewels } from "../Services/APIEndpoints";
import NewProductModal from "../Components/newProductModal";
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
            {newProductModalActive && (
              <>
                <div className="newProductModal">
                  <NewProductModal
                    handleNewProductModalToggle={handleNewProductModalToggle}
                    currentUser={currentUser}
                  />
                </div>
              </>
            )}
          </div>
          <div className="textUser">
            მომხმარებლის სახელი: {currentUser.name}
          </div>
          <div className="textUser">
            მომხმარებლის იმეილი: {currentUser.email}
          </div>
          <div className="title">
            <p> ჩემი განცხადებები</p>
          </div>
          <div className='addButton' onClick={handleNewProductModalToggle}>
            <i class="fa fa-plus" /> {" "} ახალი განცხადების დამატება
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
