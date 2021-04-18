import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteJewel } from "../Services/APIEndpoints";
import { toast } from "react-toastify";
import ConfirmModal from "./confirmModal";
import "../CSS/myProduct.css";

const MyProduct = ({ jewel }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const toggleConfirmModal = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleDeleteJewel = async () => {
    let userToken = localStorage.getItem("token");
    try {
      await deleteJewel(jewel._id, userToken);
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log(ex);
      toast.error("პროდუქტი უკვე წაშლილია");
    }
  };

  return (
    <>
      {openConfirm && (
        <ConfirmModal
          contentText={"ნამდვილად გსურთ პროდუქტის წაშლა?"}
          confirmText={"წაშლა"}
          open={openConfirm}
          onClose={() => setOpenConfirm(!openConfirm)}
          confirmClick={handleDeleteJewel}
          cancel={() => setOpenConfirm(!openConfirm)}
        />
      )}
      <div className="myproduct-main-container">
        <img
          src={`http://localhost:3000/${jewel.productImage[0]}`}
          className="myproduct-image"
          alt="gegold production"
        />
        <div className="myproduct-content">
          <table>
            <tr>
              <td>განცხადების ID:</td>
              <td>{jewel && jewel._id}</td>
            </tr>
            <tr>
              {/* <td>პროდუქტი:</td> */}
              <td>{jewel && jewel.name}</td>
            </tr>
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
              <td> ძვირფასი ქვა: </td>
              <td>{jewel && jewel.stone.name} </td>
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
              <td> ტელეფონის ნომერი: </td>
              <td>{jewel && jewel.contactNumber} </td>
            </tr>
          </table>
        </div>
        <div className="myproduct-content">
          <table>
            <tr>
              <td>განთავსების თარიღი:</td>
              <td>{jewel && jewel.piece.name}</td>
            </tr>
            <tr>
              <td>ბოლო ვადა:</td>
              <td>{jewel && jewel.piece.name}</td>
            </tr>
            <tr>
              <td> განცხდების სტატუსი: </td>
              <td>{jewel && jewel.type.name} </td>
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
          </table>
        </div>
        <DeleteIcon className="deleteicon" onClick={toggleConfirmModal} />
      </div>
    </>
  );
};

export default MyProduct;
