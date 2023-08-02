import { useState, useRef, useEffect } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import ItemShape from "./ItemShape";
import UserShape from "./UserShape";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import InputAdornment from "@mui/material/InputAdornment";

export default function InterestForm({ seller, item }) {
  const [contents, setContents] = useState("");
  const [buyer, setBuyer] = useState();
  const [addressCopied, setAddressCopied] = useState(false);
  const [contentsCopied, setContentsCopied] = useState(false);
  const { data: session } = useSession();
  const rootRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the clicked element is outside the component
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setAddressCopied(false);
        setContentsCopied(false);
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
    const mailtoLink = `mailto:${seller?.email}?subject=I would like to buy your ${item.name} on Middmarkit&body=${htmlContents}`;
    const anchor = document.createElement("a");
    anchor.href = mailtoLink;
    anchor.target = "_blank";
    anchor.click(); // Programmatically trigger the click event
  }

  function copyAddressToClipboard() {
    if (seller?.email) {
      navigator.clipboard.writeText(seller.email).then(() => {
        setTimeout(() => {
          setAddressCopied(true);
        }, 100);
      });
    }
  }
  function copyContentsToClipboard() {
    if (contents) {
      navigator.clipboard.writeText(contents).then(() => {
        setTimeout(() => {
          setContentsCopied(true);
        }, 100);
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
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <>
                  {contentsCopied ? (
                    <CheckIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "green",
                      }}
                    />
                  ) : (
                    <ContentCopyIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={copyContentsToClipboard}
                    />
                  )}
                </>
              </InputAdornment>
            ),
          }}
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
            variant={addressCopied ? "contained" : "outlined"}
            color={addressCopied ? "success" : "primary"}
            size="large"
            sx={{
              flex: 1,
            }}
            onClick={copyAddressToClipboard}
          >
            {addressCopied ? "Email Copied!" : "Copy Email Address"}
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
