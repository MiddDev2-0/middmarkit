import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginWidget() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>
          Signed in as {session.user.email}{" "}
          <button onClick={signOut}>Sign out</button>{" "}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => signIn("google")}>Sign in</button>
      </div>
    );
  }
}
