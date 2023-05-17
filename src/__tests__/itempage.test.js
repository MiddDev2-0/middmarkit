import { render, act } from "@testing-library/react";
import IndividualItemView from "../components/IndividualItemView";
import fetchMock from "fetch-mock-jest";
import { useSession, SessionProvider } from "next-auth/react";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/react");

describe("IndividualItemView", () => {
  beforeEach(() => {
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
  });
  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.reset();
  });

  test("renders item name", async () => {
    const item = {
      name: "Test Item",
      price: 10,
      description: "Test Description",
      id: 1,
      sellerId: 1,
      sellerEmail: "mtarantola@middlebury.edu",
      datePosted: "2016-12-07T23:22:33.357Z",
      isAvailable: true,
      images: "listings/igcyn5wksqm2xyurxyeg",
      adminRemoved: false,
    };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Test Item/)).toBeInTheDocument();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  test("renders item price", async () => {
    const item = {
      name: "Test Item",
      price: 10,
      description: "Test Description",
      id: 1,
      sellerId: 1,
      sellerEmail: "mtarantola@middlebury.edu",
      datePosted: "2016-12-07T23:22:33.357Z",
      isAvailable: true,
      images: "listings/igcyn5wksqm2xyurxyeg",
      adminRemoved: false,
    };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/\$10/)).toBeInTheDocument();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  test("renders item description", async () => {
    const item = {
      name: "Test Item",
      price: 10,
      description: "Test Description",
      id: 1,
      sellerId: 1,
      sellerEmail: "mtarantola@middlebury.edu",
      datePosted: "2016-12-07T23:22:33.357Z",
      isAvailable: true,
      images: "listings/igcyn5wksqm2xyurxyeg",
      adminRemoved: false,
    };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Test Description/)).toBeInTheDocument();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  test("edit button doesn't appear when viewing other person's item", async () => {
    const item = {
      name: "Test Item",
      price: 10,
      description: "Test Description",
      id: 1,
      sellerId: 4,
      sellerEmail: "mtarantola@middlebury.edu",
      datePosted: "2016-12-07T23:22:33.357Z",
      isAvailable: true,
      images: "listings/igcyn5wksqm2xyurxyeg",
      adminRemoved: false,
    };

    const { queryByText } = render(<IndividualItemView item={item} />);
    expect(queryByText(/Edit item/)).not.toBeInTheDocument();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });

  test("edit button appears when viewing your own item", async () => {
    const item = {
      name: "Test Item",
      price: 10,
      description: "Test Description",
      id: 1,
      sellerId: 1,
      sellerEmail: "mtarantola@middlebury.edu",
      datePosted: "2016-12-07T23:22:33.357Z",
      isAvailable: true,
      images: "listings/igcyn5wksqm2xyurxyeg",
      adminRemoved: false,
    };

    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Edit item/)).toBeInTheDocument();

    await act(async () => {
      await new Promise(process.nextTick);
    });
  });
});
