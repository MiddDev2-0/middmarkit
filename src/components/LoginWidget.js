import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";

export default function LoginWidget() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>
          Signed in as {session.user.email}{" "}
          <Button
            sx={{
              color: "primary",
              backgroundColor: "#FFFFFF",
              ":hover": {
                backgroundColor: "#FFFFFF",
                color: "primary",
              },
            }}
            variant="outlined"
            onClick={signOut}
          >
            Sign out
          </Button>{" "}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          <Button
            sx={{
              color: "primary",
              backgroundColor: "#FFFFFF",
              ":hover": {
                backgroundColor: "#FFFFFF",
                color: "primary",
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
