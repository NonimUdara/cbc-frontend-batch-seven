import Header from "../components/header";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary ">
            <Header />
            <Routes path="/">
                <Route path="/" element={<h1>Welcome to the Home Page</h1>}></Route>
                <Route path="/products" element={<ProductPage />}></Route>
                <Route path="/contact" element={<h1>Contact Us</h1>}></Route>
                <Route path="/about" element={<h1>About Us</h1>}></Route>
                <Route path="/overview/:id" element={<ProductOverview />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </div>
    );
}