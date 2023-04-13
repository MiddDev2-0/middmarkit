// import styles from "../styles/IndividualItemView.module.css";
import Image from "next/image";
import TablePic from "../../data/Images/0.png";
import styles from "../styles/IndividualItemView.module.css";

export default function IndividualItemView({ item }) {
  return (
    <div>
      <div className={styles.column}>
        <Image src={TablePic} alt="table" width={500} height={500} />
      </div>

      <div className={styles.column}>
        <h1>{item.name}</h1>
        <h3>{item.description}</h3>
        <p>${item.price}</p>
      </div>
    </div>
  );
}
