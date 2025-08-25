import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShopStore } from '../store/useShopStore';
import '../styles/order-detail.css';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orders      = useShopStore(state => state.orders);
  const updateOrder = useShopStore(state => state.updateOrder);
  const addReturn   = useShopStore(state => state.addReturn);

  const [order, setOrder] = useState(null);
  const [qty, setQty] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    
    const found = orders.find(o => o.id === id);
    if (!found) return navigate('/orders');
    setOrder(found);

    const initialQty = {};
    found.items.forEach(item => {
      initialQty[item.id] = 0;
    });
    setQty(initialQty);
  }, [orders, id, navigate]);


  if (!order) return null;

  const handleReturn = () => {
    const itemsToReturn = order.items
      .filter(item => qty[item.id] > 0 && qty[item.id] <= item.quantity)
      .map(item => ({
        ...item,
        returnQuantity: qty[item.id],
      }));

    if (itemsToReturn.length === 0) {
      alert('No se seleccionó ninguna cantidad válida para devolución.');
      return;
    }

    const updatedItems = order.items
      .map(item => {
        const returnQty = qty[item.id];
        if (!returnQty) return item;
        return { ...item, quantity: item.quantity - returnQty };
      })
      .filter(item => item.quantity > 0);

    updateOrder({
      ...order,
      items: updatedItems,
    });

    addReturn({
      id: Date.now(),
      orderId: order.id,
      items: itemsToReturn,
      date: new Date().toISOString(),
    });

    setSaved(true);
  };

  return (
    <section className="order-detail">
      <h1>Detalle del pedido</h1>
      <p><strong>Código:</strong> {order.id}</p>
      <p><strong>Cliente:</strong> {order.name}</p>
      <p><strong>Correo:</strong> {order.email}</p>
      <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>

      <h2>Productos comprados</h2>
      <table className="order-detail__table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Comprado</th>
            <th>Devolver</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={item.quantity}
                  value={qty[item.id] || ''}
                  onChange={e =>
                    setQty({ ...qty, [item.id]: Number(e.target.value) })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="order-detail__submit" onClick={handleReturn}>
        Confirmar devolución
      </button>

      {saved && <p className="order-detail__success">¡Devolución realizada!</p>}
    </section>
  );
}
