import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SellerPage from "@/pages/sellerpage";

describe("SellerPage", () => {
  it("renders the sell stuff title", () => {
    const { getByText } = render(<SellerPage />);
    expect(getByText(/Sell your stuff!/i)).toBeInTheDocument();
  });

  it("adds a new item to the list when a new item is saved", () => {
    const { getByPlaceholderText, getByText } = render(<SellerPage />);
    const nameInput = getByPlaceholderText(/Item Name/i);
    const descriptionInput = getByPlaceholderText(/Item Description/i);
    const priceInput = getByPlaceholderText(/Item Price/i);
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