/* setup

Individual Item View
-----
Interest Form

in the future this component would take in an item


*/

import IndividualItemView from "@/components/IndividualItemView";
import { useState } from "react";
import InterestForm from "@/components/InterestForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as React from "react";

import AppBar from "../../components/AppBar.js";

export default function ItemPage() {
  const [user, setUser] = useState();
  const router = useRouter();
  const { id } = router.query;

  // const id = +router.query.id;
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

  // useEffect(() => {
  //   if (!id) {
  //     setCurrentItem();
  //   } else if (!currentItem || currentItem.id !== id) {
  //     (async () => {
  //       const response = await fetch(`/api/items/${id}`, { method: "GET" });
  //       if (response.ok) {
  //         const currItem = await response.json();
  //         setCurrentArticle(currentItem);
  //         console.log(currItem)
  //       }
  //     })();
  //   }
  // }, [id, currentItem]);

  console.log(currentItem);

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
        console.log(data);
        setUser(data);
        console.log(user);
      };
      getData();
    }
  }, [currentItem]);

  return (
    <div>
      <AppBar />
      <div>{currentItem && <IndividualItemView item={currentItem} />}</div>
      <div>
        {currentItem && user && (
          <InterestForm
            item={currentItem}
            seller={user}
            buyer={{ firstName: "test" }}
          />
        )}
      </div>
    </div>
  );
}
