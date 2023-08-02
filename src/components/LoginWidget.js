import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import InstagramIcon from "@mui/icons-material/Instagram";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Avatar } from "@mui/material";

import { useRouter } from "next/router";

export default function LoginWidget() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleInstagramClick = () => {
    const instagramPageUrl = "https://www.instagram.com/middmarkit/";
    router.push(instagramPageUrl);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEmailClick = () => {
    setAnchorEl(null);
    router.push(`/users/${session.user.id}`);
  };

  if (session) {
    return (
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar alt="Logo" src="/mm_bag.png" />
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
          <MenuItem onClick={() => handleEmailClick()}>
            <ListItemIcon>
              <PermIdentityIcon color="grey" />
            </ListItemIcon>
            <Typography variant="body1" noWrap>
              {session.user.email}{" "}
            </Typography>
          </MenuItem>

          <MenuItem onClick={() => handleInstagramClick()}>
            <ListItemIcon>
              <InstagramIcon color="grey" />
            </ListItemIcon>
            @middmarkit
          </MenuItem>

          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
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
