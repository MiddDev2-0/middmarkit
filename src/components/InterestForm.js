import { useState, useRef, useEffect } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import ItemShape from "./ItemShape";
import UserShape from "./UserShape";

export default function InterestForm({ seller, item }) {
  const [contents, setContents] = useState("");
  const [buyer, setBuyer] = useState();
  const [emailCopied, setEmailCopied] = useState(false); // New state to track email copy status
  const { data: session } = useSession();
  const rootRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the clicked element is outside the component
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setEmailCopied(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [rootRef]);

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
    const mailtoLink = `mailto:${seller?.email}?subject=middmarkit: Someone wants to buy your ${item.name}&body=${htmlContents}`;
    const anchor = document.createElement("a");
    anchor.href = mailtoLink;
    anchor.target = "_blank";
    anchor.click(); // Programmatically trigger the click event
  }

  function copyEmailToClipboard() {
    if (seller?.email) {
      navigator.clipboard.writeText(seller.email).then(() => {
        setEmailCopied(true);
      });
    }
  }

  useEffect(() => {
    if (seller && buyer) {
      setContents(
        `Hi ${seller.firstName}! \n \nI'm interested in buying the ${item.name} that you're selling on middmarkit.com. Is it still available? \n\nPlease let me know ASAP! \n\nThanks,\n${buyer.firstName}`
      );
    }
  }, [buyer, item, seller]);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ ml: 1 }} variant="h4" style={{ fontWeight: 400 }}>
          Email seller
        </Typography>

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

        <Box sx={{ display: "flex", gap: "8px" }} ref={rootRef}>
          <Button
            variant="outlined"
            size="large"
            sx={{ flex: 1 }}
            onClick={mailForm}
          >
            Send Email
          </Button>
          <Button
            variant={emailCopied ? "contained" : "outlined"}
            color={emailCopied ? "success" : "primary"}
            size="large"
            sx={{
              flex: 1,
            }}
            onClick={copyEmailToClipboard}
          >
            {emailCopied ? "Email Copied!" : "Copy Email Address"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

InterestForm.propTypes = {
  seller: UserShape,
  item: ItemShape,
};
