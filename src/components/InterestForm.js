import { useState } from "react";
import { useEffect } from "react";
import UserData from "../../data/UserData.json";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function InterestForm({ buyer, seller, item }) {
  const [contents, setContents] = useState("");
  const [UserCollection] = useState(UserData);

  buyer = UserCollection[1];

  function mailForm() {
    const htmlContents = contents.replaceAll("\n", "%0D%0A");
    return (
      <a
        id="mailto"
        href={`mailto:${seller?.email}?subject=MiddMarkit: Someone is interested in your item&body=${htmlContents}`}
        target="_blank"
      >
        Send Email{" "}
      </a>
    );
  }

  useEffect(() => {
    if (seller) {
      setContents(
        `Hi ${seller["firstName"]}, \n \nI'm interested in buying your item (${item.name}). My bid is __$__. Please let me know if this works for you. \n\nThanks, \n${buyer.firstName}`
      );
    }
  }, [buyer, item, seller]);

  return (
    <div style={{ paddingTop: "2em" }}>
      <h3>Email seller</h3>
      <div style={{ paddingTop: "10px" }}>
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          value={buyer.email}
          disabled
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
      <Button>{mailForm()}</Button>
    </div>
  );
}
