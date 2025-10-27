# NUA Assignment

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

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

## Usage
- **Browse Products**: Navigate through the product list and view item details.
- **Add to Cart**: Click “Add” to include a product in the cart. The button switches to a quantity counter for easy updates.
- **Cart Management**: Increase or decrease the item count, or remove items completely.
- **Data Persistence**: The cart and quantities remain saved even after refreshing or closing the tab.
