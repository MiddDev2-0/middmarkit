import { render } from "@testing-library/react";
import IndividualItemView from "../components/IndividualItemView";
import InterestForm from "../components/InterestForm";


describe("IndividualItemView", () => {
  test("renders item name", () => {
    const item = { name: "Test Item", price: "$10", description: "Test Description" };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Test Item/)).toBeInTheDocument();
  });

  test("renders item price", () => {
    const item = { name: "Test Item", price: "$10", description: "Test Description" };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/\$10/)).toBeInTheDocument();
  });

  test("renders item description", () => {
    const item = { name: "Test Item", price: "$10", description: "Test Description" };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Test Description/)).toBeInTheDocument();
  });
});

// describe("InterestForm", () => {
//     test("generates email contents", () => {
//       const buyerEmail = "john@example.com";
//       const item = { name: "Test Item", sellerId: 1 };
//       const { getByLabelText } = render(<InterestForm buyerEmail={buyerEmail} item={item} />);
//       const contentsInput = getByLabelText(/Contents/);
//       expect(contentsInput).toHaveValue(`Hi , \n \nI'm interested in buying your item (Test Item). My bid is __$__. Please let me know if this works for you. \n\nThanks, \n`);
//     });
//   });

