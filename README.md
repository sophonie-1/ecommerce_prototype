## Marz E-Commerce Prototype

A simple, responsive e-commerce prototype for selling computers (laptops, desktops, accessories). Built with React and Vite for fast development and deployment. This is a frontend-only app using mock data—no backend required for demo purposes.

**Live Demo**: [https://sophonie-1.github.io/ecommerce_prototype](https://sophonie-1.github.io/ecommerce_prototype) <!-- Replace with your actual GitHub Pages URL -->

## 🚀 Features
- **Product Browsing**: Grid view of 8 sample products with images, prices, ratings, and descriptions.
- **Search & Filter**: Real-time search by name/description + category dropdown (Laptop, Desktop, Accessory).
- **Product Details**: Dynamic pages with zoomable images, quantity selector, and add-to-cart.
- **Shopping Cart**: Global state management—add/remove/update quantities, subtotal calculations.
- **Checkout**: Form for shipping/payment (mock validation), order summary, and simulated purchase.
- **Responsive Design**: Mobile-first with Tailwind CSS—fixed header, hamburger menu, touch-friendly.
- **Polish**: Loading spinners, error fallbacks (e.g., image placeholders), and smooth transitions.
- **Deployment-Ready**: Optimized for static hosting (e.g., GitHub Pages, Vercel).

## 🛠 Tech Stack
- **Frontend**: React 18 (hooks, Context API for cart state)
- **Build Tool**: Vite (fast HMR, ES modules)
- **Routing**: React Router DOM (dynamic routes like `/product/:id`)
- **Styling**: Tailwind CSS (utility-first, responsive)
- **Data**: Mock JSON (expandable to API)
- **Other**: localStorage optional (cart persistence commented out)

## 📦 Installation

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/sophonie-1/ecommerce_prototype.git
   cd marz-ecommerce
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   - Outputs to `/dist` folder.

## 🎮 Usage

1. **Browse Products**: Navigate to `/products`—use search bar (e.g., "dell") or filter by category.
2. **View Details**: Click "View Details" on a card → `/product/1` (e.g., Dell XPS).
3. **Add to Cart**: Select quantity → "Add to Cart" (alert + console log).
4. **Manage Cart**: Go to `/cart`—update qty, remove items, see totals.
5. **Checkout**: From cart → "Proceed to Checkout" → Fill form → Submit (mocks success, clears cart, redirects home).

**Pro Tips**:
- Cart resets on refresh (add localStorage persistence from `CartContext.jsx` if needed).
- Images from Unsplash (CDN)—replace with your assets in `src/data/products.js`.
- Test mobile: Resize browser or use DevTools device emulation.

## 🗺 Roadmap
- **v2**: Backend integration (e.g., Firebase for auth/orders, real API).
- **v3**: User authentication (login/register), wishlist, reviews.
- **Polish**: Image carousel in details, Stripe payments, email receipts.
- **Performance**: Lazy loading for products, PWA setup.

## 🤝 Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add some amazing feature'`).
4. Push to branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Feedback? Issues? Open a ticket or DM on X @yourhandle.

## 📄 License
This project is open-source under the MIT License. See [LICENSE](LICENSE) for details.

---

*Built with ❤️ by BUKIRA SOPHONIE on November 29, 2025. Inspired by modern e-comm UX.*  
*Star the repo if it helps! ⭐*