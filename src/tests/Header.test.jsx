import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../stores/store";
import Header from "../components/Header";

describe("Header Component", () => {
  test("Check logo present in header", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Assert the logo is present
    const logo = screen.getByTestId("logo-test");
    expect(logo).toBeInTheDocument();
  });
});
