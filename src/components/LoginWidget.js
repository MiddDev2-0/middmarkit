import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import Logout from "@mui/icons-material/Logout";

export default function LoginWidget() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [user, setUser] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          setUser(data);
        };
        getData();
      }
    }
  }, [session]);

  if (session) {
    return (
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleSharpIcon
                sx={{ color: "white" }}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              ml: 2,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 223,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar />
            <Typography variant="body1" noWrap>
              {session.user.email}{" "}
            </Typography>
          </MenuItem>

          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          <MenuItem>
            {!!session && !!session.user && !!user && !!user.reviewerStatus && (
              <Button
                variant={
                  router.pathname === "/items/removed"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => router.push("/items/removed")}
              >
                Removed Items
              </Button>
            )}
          </MenuItem>
          <MenuItem>
            {!!session && !!session.user && !!user && !!user.reviewerStatus && (
              <Button
                variant={
                  router.pathname === "/items/approve"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => router.push("/items/approve")}
              >
                Approve Items
              </Button>
            )}
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <p>
          <Button
            sx={{
              color: "primary",
              backgroundColor: "#FFFFFF",
              mr: [1, 2],
              ":hover": {
                backgroundColor: "#FFFFFF",
                pt: "4px",
              },
            }}
            variant="outlined"
            onClick={() => signIn("google")}
          >
            Sign in
          </Button>{" "}
        </p>
      </div>
    );
  }
}
