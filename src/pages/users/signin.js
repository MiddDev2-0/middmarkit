import Head from "next/head";
import SignInPage from "@/components/SignInPage";

export default function SellerPage({}) {
  return (
    <div>
      <Head>
        <title>Sign In</title>
      </Head>
      <main>
        {/* <h1>Sell your stuff!</h1> */}
        <SignInPage />
      </main>
    </div>
  );
}

SellerPage.propTypes = {};
