import { Link } from 'react-router-dom';  // ← Add this import

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Marz Computers</h1>
        <p className="text-xl text-gray-600 mb-8">Your one-stop shop for premium laptops, desktops, and accessories. Browse our collection today!</p>
        <Link  // ← Changed from <a> to <Link>
          to="/products"  // ← 'to' instead of 'href'
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;