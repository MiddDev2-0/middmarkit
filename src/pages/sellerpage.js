//import PropTypes from "prop-types";
import SellerForm from "../components/SellerForm";
// import styles from "../styles/SellerForm.module.css";
import React, { useState } from "react";

export default function SellerPage({}) {
  const [itemList, setItemList] = useState([]);
  setItemList;
  const handleSaveItem = (newItem) => {
    // handle the logic of saving the new
    itemList.push(newItem);
  };
  return (
    <div>
      <main>
        {/* <h1>Sell your stuff!</h1> */}
        <SellerForm handleSaveItem={handleSaveItem} />
      </main>
    </div>
  );
}

SellerPage.propTypes = {};
