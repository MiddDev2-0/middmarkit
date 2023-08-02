import { useRouter } from "next/router";
import Editor from "@/components/Editor";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ItemEditor() {
  const router = useRouter();
  const { id } = router.query;
  const [currentItem, setCurrentItem] = useState();
  const { data: session } = useSession();

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
        };
        getData();
      } else {
        setCurrentItem();
      }
    }
  }, [id, router.isReady]);

  return (
    <div>
      <div>
        {session &&
          currentItem &&
          session.user.id !== currentItem.sellerId &&
          "You do not have permission to edit this item"}
      </div>
      <div>
        {currentItem && session.user.id === currentItem.sellerId && (
          <Editor item={currentItem} />
        )}
      </div>
    </div>
  );
}
