import React, { useState, useEffect } from "react";
import {
  getJewels,
  getStones,
  getMetals,
  getPieces,
  // getSuperJewels,
  // getVipJewels,
  // getDefaultJewels,
  // getJewel,
} from "../Services/APIEndpoints";
import Filter from "../Reusable components/filter";
import Pagination from "../Components/pagination";
import AdSlider from "../Components/adSlider";
import SearchBar from "../Reusable components/searchBar";

import "../CSS/homePage.css";
import JewelSlider from "../Components/JewelSlider";
import ProductCard from "../Components/productCard";

const HomePage = () => {
  // const [jewel, setJewel] = useState({});
  const [jewels, setJewels] = useState([]);
  // const [superJewels, setSuperJewels] = useState([]);
  // const [vipJewels, setVipJewels] = useState([]);
  // const [defaultJewels, setDefaultJewels] = useState([]);
  const [pieces, setPieces] = useState(null);
  const [metals, setMetals] = useState(null);
  const [stones, setStones] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [showAllItems, setShowAllItems] = useState(false);
  // const [isFiltered, setIsFiltered] = useState(0);

  useEffect(() => {
    // handleGetJewel();
    handleGetJewels();
    handleGetPieces();
    handleGetMetals();
    handleGetStones();
    // handleGetSuperJewels();
    // handleGetVipJewels();
    // handleGetDefaultJewels();
  }, []);

  // const handleGetJewel = async () => {
  //   let jewelObject = await getJewel();
  //   setJewel(jewelObject);
  // };

  const handleGetJewels = async () => {
    let jewelData = await getJewels();
    let actives = jewelData.filter((object) => object.expired === false);
    setJewels(actives);
  };

  // const handleGetSuperJewels = async () => {
  //   let jewelData = await getSuperJewels();
  //   setSuperJewels(jewelData);
  // };

  // const handleGetVipJewels = async () => {
  //   let jewelData = await getVipJewels();
  //   setVipJewels(jewelData);
  // };

  // const handleGetDefaultJewels = async () => {
  //   let jewelData = await getDefaultJewels();
  //   setDefaultJewels(jewelData);
  // };

  const handleGetPieces = async () => {
    let piecesData = await getPieces();
    setPieces(piecesData);
  };

  const handleGetStones = async () => {
    let stonesData = await getStones();
    setStones(stonesData);
  };

  const handleGetMetals = async () => {
    let metalsData = await getMetals();
    setMetals(metalsData);
  };

  const handlePieceSelect = async (piece) => {
    let jewelArr = await getJewels();
    let newPieceArr = jewelArr.filter((item) => {
      return item.piece._id === piece._id;
    });
    setJewels(newPieceArr);
  };

  const handleMetalSelect = async (metal) => {
    let jewelArr = await getJewels();
    let newMetalArr = jewelArr.filter((item) => {
      return item.metal._id === metal._id;
    });
    setJewels(newMetalArr);
  };

  const handleStoneSelect = async (stone) => {
    let jewelArr = await getJewels();
    let newStoneArr = jewelArr.filter((item) => {
      return item.stone._id === stone._id;
    });
    setJewels(newStoneArr);
  };

  const checkboxChange = (item, title) => (event) => {
    setCheckboxStates({ ...checkboxStates, [item._id]: event.target.checked });
    switch (title) {
      case "ნაკეთობა":
        handlePieceSelect(item);
        setShowAllItems(!showAllItems);
        break;
      case "მასალა":
        handleMetalSelect(item);
        setShowAllItems(!showAllItems);
        break;
      case "შიგთავსი":
        handleStoneSelect(item);
        setShowAllItems(!showAllItems);
        break;
      default:
        break;
    }
  };
  const handleSearchByName = async (symbols) => {
    let demoJewels = await getJewels();
    let filtered = demoJewels.filter((item) => {
      return item.name.toLowerCase().includes(symbols.toLowerCase());
    });
    console.log(filtered);
    setJewels(filtered);
    // setShowAllItems(!showAllItems);
    // setIsFiltered(filtered.length);
  };

  return (
    <div className="homepage-main-container">
      <div className="filter-section">
        <Filter
          items={metals}
          title={"მასალა"}
          checkboxStates={checkboxStates}
          onItemSelect={checkboxChange}
        />
        <Filter
          items={pieces}
          title={"ნაკეთობა"}
          checkboxStates={checkboxStates}
          onItemSelect={checkboxChange}
        />
        <Filter
          items={stones}
          title={"შიგთავსი"}
          checkboxStates={checkboxStates}
          onItemSelect={checkboxChange}
        />
      </div>
      <div className="homepage-content">
        <div className="advertising-component">
          <SearchBar onChange={handleSearchByName} />
          <AdSlider />
          <>
            <Pagination jewels={jewels} itemsPerPage={8} />
          </>

          {/* {jewels.map((jewel) => (
            <>
              {jewel.expired === false && (
                <Pagination jewels={jewels} itemsPerPage={8} />
              )}
            </>
          ))} */}
        </div>

        {/* {jewels.length > 0 && (
          <JewelSlider show={4}>
            {jewels.map((jewel) => (
              <>{jewel.type.name === "VIP" && <ProductCard jewel={jewel} />}</>
            ))}
          </JewelSlider>
        )} */}

        {/* {showAllItems && (
          <div>
            {jewels.length != 0 && (
              <>
                <Pagination jewels={jewels} itemsPerPage={8} />
              </>
            )}
          </div>
        )} */}
      </div>
      <div>
        <div className="right">
          <span className="right">რეკლამის ბანერი</span>
        </div>
        <div className="right">
          <span className="right">რეკლამის ბანერი</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
