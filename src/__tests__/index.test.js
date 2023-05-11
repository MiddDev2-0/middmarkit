import { render, screen, fireEvent } from "@testing-library/react";
import { Album } from "@/pages";
import fetchMock from "fetch-mock-jest";
import mockRouter from "next-router-mock";

describe.skip("End-to-end testing for index.js", () => {
  beforeEach(() => {
    //jest.useFakeTimers();
    fetchMock.get("/", () => {
      return {
        item: {
          id: 1,
          description: "This is a mahogany brown round bed side table",
          price: 12,
          sellerEmail: "mtarantola@middlebury.edu",
          datePosted: "2016-12-07T23:22:33.357Z",
          isAvailable: true,
          images: "/Images/1.jpg",
        },
      };
    });
  });

  // afterEach(() => {
  //   jest.runOnlyPendingTimers();
  //   jest.useRealTimers();
  //   fetchMock.reset();
  // });

  test("Renders the heading", async () => {
    render(<Album LoginWidgetComponent={() => {}} />);
    const heading = await screen.findByText(/Midd Markit/);
    expect(heading).toBeInTheDocument();
  });

  test.skip("Clicking 'Sell' button navigates to seller page", () => {
    render(<Album LoginWidgetComponent={() => {}} />);
    const button = screen.getByRole("button", { name: /Sell/i });
    fireEvent.click(button);
    expect(mockRouter.asPath).toBe("/sellerpage");
  });
});
