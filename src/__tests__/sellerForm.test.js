import { render, screen, fireEvent } from "@testing-library/react";
import SellerForm from "../components/SellerForm";
import SellerPage from "@/pages/items/new";
import fetchMock from "fetch-mock-jest";
import { useSession, SessionProvider } from "next-auth/react";
//import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/react");

describe("SellerForm", () => {
  beforeEach(() => {
    fetchMock.get("api/items/new", () => {
      return [];
    });
    fetchMock.get("api/users/1", () => {
      return {
        firstName: "Alina",
        lastName: "Zatzick",
        email: "azatzick@middlebury.edu",
        reviewerStatus: true,
      };
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.reset();
  });

  test("Client side rendering of seller form", () => {
    SessionProvider.mockImplementation(({ children }) => (
      <mock-provider>{children}</mock-provider>
    ));
    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
    });
    render(<SellerPage />);
    //expect(useSession).toBeCalledWith({ required: true });
    expect(screen.getByText(/Sell your stuff!/i)).toBeInTheDocument();
  });

  test.skip("renders all input fields", () => {
    render(<SellerForm />);
    expect(screen.getByPlaceholderText("Item Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Item Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Item Description")).toBeInTheDocument();
  });

  test.skip("enables the Save button only when all fields are populated", () => {
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
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    // Save button should be enabled now
    expect(saveButton).toBeEnabled();
  });
});
