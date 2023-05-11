import Album from "@/pages";
import App from "@/pages/_app";
import { render, screen } from "@testing-library/react";
import { useSession, SessionProvider } from "next-auth/react";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/react");

describe("Client-side testing for index.js", () => {
  afterEach(() => {
  jest.resetAllMocks();
  });

  test("Render app with session provider", () => {
    // When rendering _app, (or any component containing the SessionProvider component)
    // we need to mock the provider to prevent NextAuth from attempting to make API requests
    // for the session.
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

    // Set the session prop expected by our _app component
    render(<App pageProps={{ session: undefined }} />);
    expect(screen.getByText(/Midd Markit/i)).toBeInTheDocument();
  });

  // test("Renders secure portions of page when logged in", async () => {
  //   useSession.mockReturnValue({
  //     data: {
  //       user: { id: 1 },
  //       expires: new Date(Date.now() + 2 * 86400).toISOString(),
  //     },
  //     status: "authenticated",
  //   });
  //   render(<Album />);
  //   expect(useSession).toBeCalledWith({required: true});
  //   expect(screen.getByText(/Midd Markit/)).toBeInTheDocument();
  // });

  // test("Renders the heading", async () => {
  //   render(<Album LoginWidgetComponent={() => {}} />);
  //   const heading = await screen.findByText(/Midd Markit/);
  //   expect(heading).toBeInTheDocument();
  // });

//   test("Clicking 'Sell' button navigates to seller page", () => {
//     render(<Album LoginWidgetComponent={() => {}} />);
//     const button = screen.getByRole("button", { name: /Sell/i });
//     fireEvent.click(button);
//     expect(mockRouter.asPath).toBe("/sellerpage");
//   });
});