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
//import LoginWidget from "@/components/LoginWidget";
//import { SessionProvider } from "next-auth/react";

// export default function Login({session}) {
//   const { data: status } = useSession({ required: true }); //sessionn

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
//   return (
//     <SessionProvider session={session}>
//       <ItemPage LoginWidgetComponent={LoginWidget} />;
//     </SessionProvider>
//   );
// }

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
        setUser(data);
      };
      getData();
    }
  }, [currentItem]);

  const { data: status } = useSession({ required: true }); //session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
