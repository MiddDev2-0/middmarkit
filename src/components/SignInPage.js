import * as React from "react";

import { signIn, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography style={{ margin: "1rem" }}>
          Sign in with your @middlebury.edu email to view and sell items!
        </Typography>
        <Button
          size="medium"
          variant="outlined"
          onClick={() => signIn("google")}
        >
          Sign in
        </Button>{" "}
      </div>
    );
  }
}