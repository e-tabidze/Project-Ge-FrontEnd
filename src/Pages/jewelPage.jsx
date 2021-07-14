import React, { useState, useEffect } from "react";
import { getJewel, getSimilarJewels } from "../Services/APIEndpoints";
import "../CSS/jewelPage.css";
import ProductCard from "../Components/productCard";

const JewelPage = () => {
  const [jewel, setJewel] = useState(null);
  const [similarJewels, setSimilarJewels] = useState(null);
  useEffect(() => {
    handleGetJewel();
  }, []);

  useEffect(() => {
    if (jewel) {
      handleGetSimilarJewels();
    }
  }, [jewel]);

  const handleGetJewel = async () => {
    let jewelId = window.location.pathname.split("/")[2];
    let jewel = await getJewel(jewelId);
    setJewel(jewel);
  };

  const handleGetSimilarJewels = async () => {
    let data = await getSimilarJewels(jewel.piece._id);
    setSimilarJewels(data);
  };

  return (
    <div>
      <div>აქ იქნება რეკლამის კონტეინერი</div>
      <div className="jewelPage-main-container">
        <div className="imageSide">
          {jewel &&
            jewel.productImage.map((img) => {
              return (
                <img
                  className="main-image"
                  src={jewel && `http://localhost:3000/${img}`}
                />
              );
            })}
        </div>
        <div className="descriptionSide">
          <div className="jewelpage-name"> {jewel && jewel.name} </div>
          <div className="jewelpage-price">{jewel && jewel.price} ლარი</div>
          <div className="jewelpage-phone">{jewel && jewel.contactNumber}</div>
          <div className="productdescitle">პროდუქტის აღწერა</div>
          <div className="separator"></div>
          <div className="jewelpage-description">
            {jewel && jewel.description}
          </div>
          <div className="productdescitle">სპეციფიკაციები</div>
          <div className="separator"></div>
          <table>
            <tr>
              <td>ნაკეთობა:</td>
              <td>{jewel && jewel.piece.name}</td>
            </tr>
            <tr>
              <td> მასალა: </td>
              <td>{jewel && jewel.metal.name} </td>
            </tr>
            <tr>
              <td>სინჯი:</td>
              <td>{jewel && jewel.standard} </td>
            </tr>
            <tr>
              <td>ზომა:</td>
              <td>{jewel && jewel.size}</td>
            </tr>
            <tr>
              <td>წონა:</td>
              <td>{jewel && jewel.weight}</td>
            </tr>
            <tr>
              <td> ძვირფასი ქვა: </td>
              <td>{jewel && jewel.stone.name} </td>
            </tr>
            {/* <tr>
              <td> განცხადების ტიპი: </td>
              <td>{jewel && jewel.type.name} </td>
            </tr> */}
          </table>
          <div className="separator"></div>
        </div>
      </div>
      <div className="productdescitle">მსგავსი პროდუქტები</div>

      <div className="similar-products">
        {similarJewels &&
          similarJewels.map((jewel) => {
            return <ProductCard key={jewel._id} jewel={jewel} />;
          })}
      </div>
    </div>
  );
};

export default JewelPage;
