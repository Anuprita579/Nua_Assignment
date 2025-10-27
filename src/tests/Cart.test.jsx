import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../stores/cartSlice";
import Cart from "../pages/Cart";

describe("Cart Component", () => {
  test("Add item and increment/decrement quantity", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: { items: [{ id: 1, title: "Item 1", price: 100, quantity: 1 }] },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();

    const incrementButton = screen.getByTestId("increment-btn");
    const decrementButton = screen.getByTestId("decrement-btn");

    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(1); // Back to 1 after increment and decrement
  });
});
