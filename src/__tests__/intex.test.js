import { render, screen, fireEvent } from "@testing-library/react";
import { Album } from "@/pages";
//import { useRouter } from "next/router";

jest.mock("next/router", () => require("next-router-mock"));

describe("End-to-end testing for index.js", () => {
  test("Renders the heading", () => {
    render(<Album LoginWidgetComponent={() => {}} />);
    const heading = screen.getByText(/Welcome to MiddMarket!/i);
    expect(heading).toBeInTheDocument();
  });

  test("Clicking 'Sell' button navigates to seller page", () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    useRouterMock.mockImplementation(() => ({
      push: pushMock,
    }));
    render(<Album LoginWidgetComponent={() => {}} />);
    const button = screen.getByRole("button", { name: /Sell/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/sellerpage");

    useRouterMock.mockRestore();
  });

  // test("Clicking 'Home' button navigates to home page", () => {
  //   const pushMock = jest.fn();
  //   const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
  //   useRouterMock.mockImplementation(() => ({
  //     push: pushMock,
  //   }));
  //   render(<Album />);
  //   const button = screen.getByRole("button", { name: /Home/i });
  //   fireEvent.click(button);

  //   expect(pushMock).toHaveBeenCalledWith("/");

  //   useRouterMock.mockRestore();
  // });

  // test("Clicking item card navigates to item page", () => {
  //   const pushMock = jest.fn();
  //   const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
  //   useRouterMock.mockImplementation(() => ({
  //     push: pushMock,
  //   }));
  //   render(<Album />);
  //   const card = screen.getByRole("img", { name: /Heading 1/i });
  //   fireEvent.click(card);

  //   expect(pushMock).toHaveBeenCalledWith("/itempage");

  //   useRouterMock.mockRestore();
  // });
});
