import Head from "next/head";
import SignInPage from "@/components/SignInPage";

export default function SellerPage({}) {
  return (
    <div>
      <Head>
        <title>Log In - Middmarkit</title>
        <meta
          name="description"
          content="Log in to MiddMarkit to continue buying, selling, and trading with fellow Middlebury College students. Access your account for exclusive deals, community connections, and more."
        />
      </Head>
      <main>
        {/* <h1>Sell your stuff!</h1> */}
        <SignInPage />
      </main>
    </div>
  );
}

SellerPage.propTypes = {};
