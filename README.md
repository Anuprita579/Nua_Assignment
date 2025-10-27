# NUA Assignment

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Design Decisions](#design-decisions)
- [Trade-offs](#trade-offs)


## Overview

This project is an e-commerce web application where users can browse different products, view their details, and add them to a shopping cart. The main focus of the project is to provide a smooth and consistent shopping experience with persistent cart data, minimal reloads, and improved performance through caching and debouncing.


## Features

- **Debouncing**: The search bar waits for a short pause before making a request, preventing unnecessary API calls.
- **Cached Result**: Product details and listings are cached locally so users don’t lose progress or experience delays when revisiting pages.
- **Cart Management**: Users can add products, adjust quantities, or remove items. The cart state is stored in localStorage, so it remains even after reloading the page.
- **Persistent Update**: The product quantity updates are reflected and preserved across page reloads.
- **Responsive Design**: The interface adjusts smoothly across different screen sizes.
- **Optimized State Management**: All products and cart operations are managed through a global Redux store for predictable state updates.


## Demo

https://nua-assignment-two.vercel.app/


## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Anuprita579/Nua_Assignment.git
   ```
2. Navigate to project directory
   ```
   cd Nua_Assignment
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm run dev
   ```
Open your browser and visit http://localhost:5173


## Technologies Used

- React: Frontend
- Redux Toolkit: State Management 
- TailwindCSS: Styling
- Vite: Bundler
- React Testing Library: Testing

## Design Decisions

- **State Management**: I used Redux Toolkit to manage global state for the cart and products. It helps maintain consistent data between different pages (like Product and Cart) and also simplifies debugging.
- **Local Storage Sync**: The cart data is saved to localStorage after every update to make sure the cart persists even after page reloads.
- **Debouncing & Caching**: I implemented debouncing in the search input to avoid multiple API calls while typing. Cached results are reused to improve load times and reduce network requests.
- **Responsiveness**: Used Tailwind CSS utility classes for quick responsive design without writing extra CSS files.


## Trade-offs

- The product data is cached locally in memory or localStorage. Any changes made to the data source won’t appear until a manual refresh, since the app isn’t connected to a backend.
- Some features like user authentication and checkout flow are not yet implemented. However, the app structure is modular, so these can be easily integrated later using Firebase, Express.js, or any REST API backend.
- Using cached data improves speed and reduces re-rendering, but it trades off data freshness. This can be addressed by adding an expiry mechanism for the cache in localStorage.