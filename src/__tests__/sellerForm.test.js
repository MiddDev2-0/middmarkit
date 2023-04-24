import { render, screen, fireEvent } from "@testing-library/react";
import SellerForm from "../components/SellerForm";

describe("SellerForm", () => {
  test("renders all input fields", () => {
    render(<SellerForm />);
    expect(screen.getByPlaceholderText("Item Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Item Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Item Description")).toBeInTheDocument();
  });

  test("enables the Save button only when all fields are populated", () => {
    render(<SellerForm />);
    const nameInput = screen.getByPlaceholderText("Item Name");
    const priceInput = screen.getByPlaceholderText("Item Price");
    const descriptionInput = screen.getByPlaceholderText("Item Description");
    const saveButton = screen.getByRole("button", { name: "Save" });

    //the Save button should be disabled
    expect(saveButton).toBeDisabled();

    // Populate all fields
    fireEvent.change(nameInput, { target: { value: "Test Item" } });
    fireEvent.change(priceInput, { target: { value: "10" } });
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });

    // Save button should be enabled now
    expect(saveButton).toBeEnabled();
  });

});