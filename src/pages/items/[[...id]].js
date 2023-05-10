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
import * as React from "react";

export default function ItemPage() {
  const [user, setUser] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [currentItem, setCurrentItem] = useState();

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
          setCurrentItem(data);
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
        setUser(data);
      };
      getData();
    }
  }, [currentItem]);

  const { status } = useSession({ required: true });
  if (status !== "authenticated") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{currentItem && <IndividualItemView item={currentItem} />}</div>
      <div>
        {currentItem && user && (
          <InterestForm item={currentItem} seller={user} />
        )}
      </div>
    </div>
  );
}
