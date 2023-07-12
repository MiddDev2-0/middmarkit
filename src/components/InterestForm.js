import { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import ItemShape from "./ItemShape";
import UserShape from "./UserShape";

export default function InterestForm({ seller, item }) {
  const [contents, setContents] = useState("");
  const [buyer, setBuyer] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user) {
        const getData = async () => {
          const response = await fetch(`/api/users/${session.user.id}`, {
            method: "GET",
          });
          if (!response.ok) {
            console.log("error");
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setBuyer(data);
        };
        getData();
      }
    }
  }, [session]);

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
    if (seller && buyer) {
      setContents(
        `Hi ${seller.firstName}! \n \nI'm interested in buying the ${item.name} that you are selling on middmarkit. Is it still available? \n\nThanks! \n${buyer.firstName}`
      );
    }
  }, [buyer, item, seller]);

  return (
    <div style={{ paddingTop: "2em" }}>
      <h3>Email seller</h3>
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
      <Button variant="outlined">{mailForm()}</Button>
    </div>
  );
}

InterestForm.propTypes = {
  seller: UserShape,
  item: ItemShape,
};
