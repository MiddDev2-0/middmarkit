import { render } from "@testing-library/react";
import IndividualItemView from "../components/IndividualItemView";
// import InterestForm from "../components/InterestForm";

describe.skip("IndividualItemView", () => {
  test("renders item name", () => {
    const item = {
      name: "Test Item",
      price: "$10",
      description: "Test Description",
      id: 1,
    };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Test Item/)).toBeInTheDocument();
  });

  test("renders item price", () => {
    const item = {
      name: "Test Item",
      price: "$10",
      description: "Test Description",
    };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/\$10/)).toBeInTheDocument();
  });

  test("renders item description", () => {
    const item = {
      name: "Test Item",
      price: "$10",
      description: "Test Description",
    };
    const { getByText } = render(<IndividualItemView item={item} />);
    expect(getByText(/Test Description/)).toBeInTheDocument();
  });
});
