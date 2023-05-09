//import PropTypes from "prop-types";
import SellerForm from "../../components/SellerForm";
import { useSession } from "next-auth/react";
// import styles from "../styles/SellerForm.module.css";
import React, { useState } from "react";

export default function SellerPage({}) {
  const [itemList, setItemList] = useState([]);
  setItemList;
  const handleSaveItem = (newItem) => {
    // handle the logic of saving the new
    itemList.push(newItem);
  };
  const { data: status } = useSession({ required: true }); //session
  if (status === "loading") {
    return <div>Loading...</div>;
  }
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
