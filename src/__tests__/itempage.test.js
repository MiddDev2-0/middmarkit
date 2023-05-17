import { render, act } from "@testing-library/react";
import IndividualItemView from "../components/IndividualItemView";
import fetchMock from "fetch-mock-jest";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/react");

describe("IndividualItemView", () => {
  beforeEach(() => {
    fetchMock.get("/api/users/1", () => {
      return {
        firstName: "Alina",
        lastName: "Zatzick",
        email: "azatzick@middlebury.edu",
        reviewerStatus: true,
      };
    });
    fetchMock.get("/api/items", () => {
      return [];
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.reset();
  });

  test.skip("renders item name", async () => {
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

  test.skip("renders item price", async () => {
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

  test.skip("renders item description", async () => {
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
});
