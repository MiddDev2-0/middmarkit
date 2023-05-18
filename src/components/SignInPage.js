import * as React from "react";

import { signIn, useSession } from "next-auth/react";
import Button from "@mui/material/Button";

export default function SignInPage() {
  const { data: session } = useSession();

  if (session) {
    router.push("/");
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
