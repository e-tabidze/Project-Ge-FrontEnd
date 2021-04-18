import React, { useState, useEffect } from "react";
import { getJewels } from "./Services/APIEndpoints";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Navbar from "./Components/navbar";
import HomePage from "./Pages/homePage";
import UserPage from "./Pages/userPage";
import Terms from "./Pages/terms";
import Footer from "./Components/footer";
import JewelPage from "./Pages/jewelPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      let currentUserData = jwtDecode(jwt);
      setCurrentUser(currentUserData);
    } catch (ex) {}
  };
  const handleSearchByName = async (symbols, setJewels) => {
    let demoJewels = await getJewels();
    console.log(demoJewels);
    let filtered = demoJewels.filter((item) => {
      return item.name.toLowerCase().includes(symbols.toLowerCase());
    });
    console.log(filtered);
    setJewels(filtered);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        handleSearchByName={handleSearchByName}
        currentUser={currentUser}
      />
      <Route exact path="/product/:id" component={JewelPage} />
      <Route exact path="/" component={() => <HomePage />} />
      <Route
        exact
        path="/my-profile"
        render={(props) => {
          if (!currentUser) return null;
          return <UserPage {...props} currentUser={currentUser} />;
        }}
      />
      <Route exact path="/terms" component={Terms} />
      <Footer currentUser={currentUser} />
    </div>
  );
}

export default App;
