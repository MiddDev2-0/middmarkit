/* setup

Individual Item View
-----
Interest Form

in the future this component would take in an item


*/

import IndividualItemView from "@/components/IndividualItemView";
import ItemData from "../../data/ItemData.json";
import UserData from "../../data/UserData.json";
import { useState } from "react";
import InterestForm from "@/components/InterestForm";

import AppBar from "../components/AppBar.js";

export default function ItemPage() {
  const [itemCollection] = useState(ItemData);
  const [userCollection] = useState(UserData);

  return (
    <div>
      <AppBar />
      <div>
        <IndividualItemView item={itemCollection[0]} />
      </div>
      <div>
        <InterestForm item={itemCollection[0]} buyer={userCollection[1]} />
      </div>
    </div>
  );
}
