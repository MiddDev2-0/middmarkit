import { render, screen, fireEvent, act } from "@testing-library/react";
import SellerForm from "../components/SellerForm";
import SellerPage from "@/pages/items/new";
import fetchMock from "fetch-mock-jest";
import { useSession, SessionProvider } from "next-auth/react";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/react");
global.gtag = jest.fn();

describe("End-to-End testing for seller page", () => {
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

  test("Client side rendering of seller form and seller page", async () => {
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
    expect(screen.getByText(/Sell your stuff!/i)).toBeInTheDocument();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  test("Save button disabled when fields are empty", async () => {
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
    render(<SellerForm />);
    const saveButton = screen.getByRole("button", {
      name: "Submit your item!",
    });
    expect(saveButton).toBeDisabled();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  test("clicking Cancel button navigates to home page", async () => {
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
    render(<SellerForm />);
    const button = await screen.findByRole("button", { name: /Cancel/i });
    fireEvent.click(button);
    expect(mockRouter.asPath).toBe("/");
    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  //   test.skip("enables the Save button when all fields are populated", () => {
  //     SessionProvider.mockImplementation(({ children }) => (
  //       <mock-provider>{children}</mock-provider>
  //     ));
  //     useSession.mockReturnValue({
  //       data: {
  //         user: { id: 1 },
  //         expires: new Date(Date.now() + 2 * 86400).toISOString(),
  //       },
  //       status: "authenticated",
  //     });
  //     render(<SellerForm />);
  //     const nameInput = screen.getByDisplayValue("Item Name");
  //     const priceInput = screen.getByDisplayValue("Price");
  //     const descriptionInput = screen.getByDisplayValue("Description");
  //     const saveButton = screen.getByRole("button", { name: "POST YOUR ITEM!" });

  //     //the Save button should be disabled
  //     expect(saveButton).toBeDisabled();

  //     // Populate all fields
  //     fireEvent.change(nameInput, { target: { value: "Test Item" } });
  //     fireEvent.change(priceInput, { target: { value: "10" } });
  //     fireEvent.change(descriptionInput, {
  //       target: { value: "Test Description" },
  //     });

  //     // Save button should be enabled now
  //     expect(saveButton).toBeEnabled();
  //   });

  //   test.skip("renders all input fields", () => {
  //     SessionProvider.mockImplementation(({ children }) => (
  //       <mock-provider>{children}</mock-provider>
  //     ));
  //     useSession.mockReturnValue({
  //       data: {
  //         user: { id: 1 },
  //         expires: new Date(Date.now() + 2 * 86400).toISOString(),
  //       },
  //       status: "authenticated",
  //     });
  //     render(<SellerPage />);
  //     expect(screen.getByPlaceholderText("Item Name")).toBeInTheDocument();
  //     expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
  //     expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  //   });
});
