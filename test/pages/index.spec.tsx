import { render, screen } from "@testing-library/react";
import Home from "../../pages";

describe("Home page", () => {
  it("should render", () => {
    render(<Home />);
    const marquee = screen.getByText("Welcome to Sportified");
    expect(marquee).toBeInTheDocument();
  });
});
