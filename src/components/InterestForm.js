import { useState } from "react";
import { useEffect } from "react";
import UserData from "../../data/UserData.json";
import { TextField } from "@mui/material";

import { Button } from "@mui/material";
// import {Stack} from "@mui/material";

export default function InterestForm({ buyer, item }) {
  const [contents, setContents] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [UserCollection] = useState(UserData);

  const seller = UserCollection.filter((user) => user.id === item.sellerId)[0];

  buyer = UserCollection[1];

  function mailForm() {
    const htmlContents = contents.replaceAll("\n", "%0D%0A");
    return (
      <a
        id="mailto"
        href={`mailto:${seller?.Email}?subject=MiddMarkit: Someone is interested in your item&body=${htmlContents}`}
        target="_blank"
      >
        Send Email{" "}
      </a>
    );
  }

  useEffect(() => {
    if (seller) {
      setContents(
        `Hi ${seller["FirstName"]}, \n \nI'm interested in buying your item (${item.name}). My bid is __$__. Please let me know if this works for you. \n\nThanks, \n${buyer.FirstName}`
      );
    }
  }, [buyer.FirstName, item.name, seller]);

  useEffect(() => {
    setBuyerEmail(buyer.Email);
  }, []);

  return (
    <div style={{ paddingTop: "2em" }}>
      <h3>Email seller</h3>

      {/* <Stack spacing={2} direction="row"> */}
      <div style={{ paddingTop: "10px" }}>
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          error={!buyerEmail}
          value={buyerEmail}
          onChange={(event) => setBuyerEmail(event.target.value)}
        />
      </div>
      <div style={{ paddingTop: "5px" }}>
        <TextField
          fullWidth
          multiline
          rows={10}
          margin="normal"
          id="contents"
          label="Contents"
          value={contents}
          onChange={(event) => setContents(event.target.value)}
        />
      </div>
      {/* <Button onClick={() => window.location = `mailto:${seller.Email}?subject=MiddMarkit: Someone is interested in your item&body=${contents}`}>Send Email</Button> */}
      <Button>{mailForm()}</Button>

      {/* </Stack> */}
    </div>
  );
}
