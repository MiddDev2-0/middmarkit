/* setup

Individual Item View
-----
Interest Form

in the future this component would take in an item
*/
import { useSession } from "next-auth/react";
import IndividualItemView from "@/components/IndividualItemView";
import { useState } from "react";
import InterestForm from "@/components/InterestForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import * as React from "react";

export default function ItemPage() {
  const [seller, setSeller] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [currentItem, setCurrentItem] = useState();
  const { data: session } = useSession();
  const [buyer, setBuyer] = useState();

  useEffect(() => {
    console.log(session);
    if (session) {
      if (session.user) {
        const getData = async () => {
          const response = await fetch(`/api/users/${session.user.id}`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setBuyer(data);
          console.log("buyer");
          console.log(buyer);
        };
        getData();
      }
    }
  }, [session]);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.isReady) {
      if (id) {
        const getData = async () => {
          const response = await fetch(`/api/items/${id}`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          if (Boolean(data.isAvailable) === false) {
            router.push(`/`);
          }
          setCurrentItem(data);
          console.log(data);
        };
        getData();
      } else {
        setCurrentItem();
      }
    }
  }, [id, router.isReady]);

  useEffect(() => {
    if (currentItem) {
      const getData = async () => {
        const response = await fetch(`/api/users/${currentItem.sellerId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log("seller:");
        console.log(data);

        setSeller(data);
      };
      getData();
    }
  }, [currentItem]);

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
      <div>{currentItem && <IndividualItemView item={currentItem} />}</div>
      <div>
        {currentItem &&
          seller &&
          buyer &&
          seller.id !== buyer.id &&
          currentItem.isAvailable && (
            <InterestForm item={currentItem} seller={seller} />
          )}
      </div>
    </div>
  );
}
