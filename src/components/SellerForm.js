import { useState } from "react";
import styles from "../styles/SellerForm.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function SellerForm({ handleSaveItem }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [fileName, setFileName] = useState("");
  const [allFieldsPopulated, setAllFieldsPopulated] = useState(false);

  useEffect(() => {
    setAllFieldsPopulated(name !== "" && description !== "" && price !== "");
  }, [name, description, price]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    // handle the file upload logic here
  };

  const handleSave = () => {
    const newItem = {
      name: name,
      description: description,
      price: price,
      uid: fileName,
    };
    handleSaveItem(newItem);
  };

  return (
    <div className={styles.editor}>
      <label className={styles.button} style={{ marginBottom: "10px" }}>
        <input
          type="file"
          accept="image/png, image/jpeg, image/heic, image/heif"
          className={styles.fileInput}
          onChange={handleFileUpload}
        />
        Upload Photos
      </label>

      <input
        type="text"
        onChange={handleChangeName}
        value={name}
        placeholder="Item Name"
        className={styles.input}
      />
      <input
        type="number"
        onChange={handleChangePrice}
        value={price}
        placeholder="Item Price"
        className={styles.input}
      />
      <textarea
        onChange={handleChangeDescription}
        value={description}
        placeholder="Item Description"
        className={styles.input}
      />
      <div>
        <button className={styles.button}>Cancel</button>
        <button
          className={styles.button}
          disabled={!allFieldsPopulated}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

SellerForm.propTypes = {
  handleSaveItem: PropTypes.func.isRequired,
};
