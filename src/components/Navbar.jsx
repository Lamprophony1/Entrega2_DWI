import { Link } from "react-router-dom";
import { useShopStore } from "../store/useShopStore";
import { selectTotalItems } from '../store/selectors';


export default function Navbar() {

  const totalItems = useShopStore(selectTotalItems); 

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/orders">Mis pedidos</Link>
      <Link to="/returns">Devoluciones</Link>
      <Link to="/checkout">Carrito ({totalItems})</Link>
    </nav>
  );
}
