import { useShopStore } from '../store/useShopStore';

import '../styles/returns.css';

export default function Returns() {

  const returns = useShopStore(state => state.returns)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // más reciente arriba

  // Agrupar por orderId
  const grouped = returns.reduce((acc, ret) => {
    if (!acc[ret.orderId]) acc[ret.orderId] = [];
    acc[ret.orderId].push(ret);
    return acc;
  }, {});

  const orderIds = Object.keys(grouped);

  return (
    <section className="returns">
      <h1 className="returns__title">Historial de devoluciones</h1>

      {orderIds.length === 0 ? (
        <p>No se han registrado devoluciones.</p>
      ) : (
        orderIds.map(orderId => (
          <div key={orderId} className="returns__order-group">
            <h2 className="returns__order-title">
              Pedido: <span>{orderId}</span>
            </h2>

            <ul className="returns__order-list">
              {grouped[orderId].map(ret => (
                <li key={ret.id} className="returns__order-item">
                  <div className="returns__order-header">
                    <span>
                      <strong>Devolución:</strong>{' '}
                      {new Date(ret.date).toLocaleString()}
                    </span>
                  </div>

                  <ul className="returns__products">
                    {ret.items.map(item => (
                      <li key={item.id + ret.id} className="returns__product">
                        <span>{item.returnQuantity}x</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}
