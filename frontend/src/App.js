import "./App.css";
import axios from "axios";
import Header from "./component/layout/Header/Header";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/NotFound/NotFound.js";
import Protected from "./component/Protected";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />

          {/*ProtectedRoute Starts */}

          <Route element={<ProtectedRoute />}>
            <Route element={<Protected isAuthenticated={isAuthenticated} />}>
              <Route exact path="/account" element={<Profile />} />
              <Route exact path="/me/update" element={<UpdateProfile />} />
              <Route
                exact
                path="/password/update"
                element={<UpdatePassword />}
              />
              <Route
                exact
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
              <Route exact path="/login/shipping" element={<Shipping />} />
              <Route exact path="/order/confirm" element={<ConfirmOrder />} />
              <Route exact path="/success" element={<OrderSuccess />} />
              <Route
                exact
                path="/password/forgot"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route exact path="/order/:id" element={<OrderDetails />} />
              <Route exact path="/admin/dashboard" element={<Dashboard />} />
              <Route exact path="/admin/products" element={<ProductList />} />
              <Route exact path="/admin/product" element={<NewProduct />} />
              <Route exact path="/admin/orders" element={<OrderList />} />
              <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
              <Route exact path="/admin/users" element={<UsersList />} />
              <Route exact path="/admin/user/:id" element={<UpdateUser />} />
              <Route exact path="/admin/reviews" element={<ProductReviews />} />
              <Route
                exact
                path="/admin/product/:id"
                element={<UpdateProduct />}
              />
              <Route path="/orders" element={<MyOrders />} />
            </Route>
          </Route>
          {/*ProtectedRoute Ends */}

          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route
            path="/*"
            element={
              window.location.pathname === "/process/payment" ? null : (
                <NotFound />
              )
            }
          />
        </Routes>
        {/* <Routes>
        </Routes> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
