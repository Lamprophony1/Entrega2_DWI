import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Checkout from "./pages/Checkout"
import Returns from "./pages/Returns"
import Orders from "./pages/Orders"
import OrderDetail from "./pages/OrderDetail"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/returns" element={<Returns />} />
      </Routes>
    </>
  )
}

export default App
