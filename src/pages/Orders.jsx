
import { Link } from 'react-router-dom';
import '../styles/orders.css';
import { useShopStore } from '../store/useShopStore';

export default function Orders() {
  
  const orders = useShopStore(state => state.orders)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="orders">
      <h1 className="orders__title">Mis pedidos</h1>

      {orders.length === 0 ? (
        <p>No has realizado compras todavía.</p>
      ) : (
        <ul className="orders__list">
          {orders.map(order => (
            <li key={order.id} className="orders__item">
              <div className="orders__summary">
                <span className="orders__code">{order.id}</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              <Link to={`/orders/${order.id}`} className="orders__btn">
                Ver detalle
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
