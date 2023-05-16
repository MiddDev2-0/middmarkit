import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SellerPage from "@/pages/items/new";

describe("SellerPage", () => {
  it("renders the sell stuff title", () => {
    const { getByText } = render(<SellerPage />);
    expect(getByText(/Sell your item:/i)).toBeInTheDocument();
  });

  it("adds a new item to the list when a new item is saved", () => {
    const { getByText } = render(<SellerPage />);
    const nameInput = getByText(/Item Name/i);
    const descriptionInput = getByText(/Item Description/i);
    const priceInput = getByText(/Item Price/i);
    const saveButton = getByText(/Save/i);

    fireEvent.change(nameInput, { target: { value: "Test Item" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a test item." },
    });
    fireEvent.change(priceInput, { target: { value: "9.99" } });
    fireEvent.click(saveButton);

    const newItemName = getByText(/Test Item/i);
    expect(newItemName).toBeInTheDocument();
  });
});
