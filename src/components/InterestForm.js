import { useState } from "react";
import { useEffect } from "react";
import UserData from "../../data/UserData.json";

export default function InterestForm({ buyer, item }) {
  const [contents, setContents] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [UserCollection] = useState(UserData);

  const seller = UserCollection.filter((user) => user.id === item.sellerId)[0];
  console.log(seller["FirstName"]);

  buyer = UserCollection[1];

  useEffect(() => {
    setContents(
      `Hi ${seller["FirstName"]} I'm interested in buying your item (${item.name}). My bid is __$__. Please let me know if this works for you. Thanks, ${buyer.FirstName}`
    );
  }, []);

  useEffect(() => {
    setBuyerEmail(buyer.Email);
  }, []);

  return (
    <div style={{ paddingTop: "7em" }}>
      <h3>Email seller</h3>
      <div style={{ paddingTop: "10px" }}>
        <input
          className="myInput"
          type="text"
          onChange={(event) => setBuyerEmail(event.target.value)}
          size={45}
          value={buyerEmail}
          placeholder="Your Email"
        />
      </div>
      <div style={{ paddingTop: "5px" }}>
        <textarea
          name="email contents"
          onChange={(event) => setContents(event.target.value)}
          value={contents}
          rows={10}
          cols={50}
        />
      </div>
    </div>
  );
}
