import Header from "../components/header";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import HomePageView from "./homePageView";
import AboutPageView from "./aboutPage";
import ContactPageView from "./contactPage";
import OrdersPage from "./ordersPage";

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary ">
            <Header />
            <Routes path="/">
                <Route path="/" element={<HomePageView />}></Route>
                <Route path="/products" element={<ProductPage />}></Route>
                <Route path="/contact" element={<ContactPageView />}></Route>
                <Route path="/about" element={<AboutPageView />}></Route>
                <Route path="/overview/:id" element={<ProductOverview />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </div>
    );
}