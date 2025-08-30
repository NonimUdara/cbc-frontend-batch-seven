import Header from "../components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary ">
            <Header />
            <Routes path="/">
                <Route path="/" element={<h1>Welcome to the Home Page</h1>}></Route>
                <Route path="/products" element={<ProductPage /> }></Route>
                <Route path="/contact" element={<h1>Contact Us</h1>}></Route>
                <Route path="/about" element={<h1>About Us</h1>}></Route>
                <Route path="/*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </div>
    );
}