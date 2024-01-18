import SellerForm from "../../components/SellerForm";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Head from "next/head";

export default function SellerPage({}) {
  const [itemList, setItemList] = useState([]);
  setItemList;
  const handleSaveItem = (newItem) => {
    // handle the logic of saving the new
    itemList.push(newItem);
  };

  const { data: status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      if (status !== "authenticated") {
        signIn("google");
        return <div>Loading...</div>;
      }
    },
  });

  return (
    <div>
      <Head>
        <title>New Post Form</title>
      </Head>
      <main>
        <SellerForm handleSaveItem={handleSaveItem} />
      </main>
    </div>
  );
}

SellerPage.propTypes = {};
