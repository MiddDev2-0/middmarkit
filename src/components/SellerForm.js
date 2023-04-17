import { useState } from "react";
import styles from "../styles/SellerForm.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function SellerForm({}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
    console.log(`Selected file size: ${file.size} bytes`);

    const reader = new FileReader();

    reader.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const img = new Image();

      img.onload = function () {
        const { width } = img;
        const { height } = img;

        // Calculate the crop area
        let x, y, size;
        if (width > height) {
          size = height;
          x = (width - size) / 2;
          y = 0;
        } else {
          size = width;
          x = 0;
          y = (height - size) / 2;
        }

        // Draw the original image onto the canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, x, y, size, size, 0, 0, 1080, 1080);

        canvas.toBlob(
          (blob) => {
            const newFile = new File([blob], "image.jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            console.log(`Reformatted image size: ${blob.size} bytes`);
            console.log(`new image info: ${newFile}`);
            console.log(newFile.size);
            console.log(newFile.type);
            console.log(newFile.name);

            const src = URL.createObjectURL(newFile);
            const preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";

            // use newFile for further processing or upload
          },
          "image/jpeg",
          1
        );
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // const newItem = {
    //   name: name,
    //   description: description,
    //   price: price,
    // };
    // handleSaveItem(newItem);
    location.reload();
  };

  return (
    <div className={styles.editor}>
      <div className={styles.formInput}>
        <div className={styles.preview}>
          <img id="file-ip-1-preview" />
        </div>
        <label className={styles.button} style={{ marginBottom: "10px" }}>
          <input
            type="file"
            accept="image/png, image/jpeg, image/heic, image/heif"
            className={styles.fileInput}
            onChange={handleFileUpload}
          />
          Upload Photo
        </label>
      </div>

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
        <button className={styles.button} onClick={handleSave}>
          Cancel
        </button>
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
