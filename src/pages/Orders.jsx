
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/orders.css';
import { fetchOrders } from '../services/api';

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const sorted = orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="orders">
      <h1 className="orders__title">Mis pedidos</h1>

      {sorted.length === 0 ? (
        <p>No has realizado compras todavía.</p>
      ) : (
        <ul className="orders__list">
          {sorted.map(order => (
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
