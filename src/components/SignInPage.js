import * as React from "react";

import { signIn, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { CssBaseline, Typography, Container } from "@mui/material";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  } else {
    return (
      <>
        <CssBaseline />
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            textAlign="center" // Center-align the text inside
            minHeight="30vh"
          >
            <Typography variant="h4" sx={{ mt: 0 }}>
              Welcome to the Middlebury Marketplace!
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
              Join the community to post and view what others are selling
            </Typography>

            <Button
              size="large"
              variant="contained"
              onClick={() => signIn("google")}
              sx={{ mt: 3 }}
            >
              Log in with school email
            </Button>
          </Box>
        </Container>
      </>
    );
  }
}
