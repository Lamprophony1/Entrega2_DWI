
import { useShopStore } from '../store/useShopStore';
import { selectTotalPrice } from '../store/selectors';
import { useState } from 'react';
import '../styles/checkout.css';

export default function Checkout() {
  const cart = useShopStore(state => state.cart);
  const updateQty = useShopStore(state => state.updateQty);
  const removeFromCart  = useShopStore(state => state.removeFromCart);
  const clearCart = useShopStore(state => state.clearCart);
  const addOrder = useShopStore(state => state.addOrder);
  const totalPrice = useShopStore(selectTotalPrice);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const handleOrder = () => {
    if (!name || !email || cart.length === 0) {
      alert('Por favor, completa todos los campos y agrega productos.');
      return;
    }

    const order = {
      id: crypto.randomUUID(), // código único
      name,
      email,
      items: cart,
      total: totalPrice,
      date: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();

    setOrderCode(order.id);
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <section className="checkout">
        <h2>✅ Pedido realizado</h2>
        <p>Gracias por tu compra, {name}.</p>
        <p>Código de pedido: <strong>{orderCode}</strong></p>
      </section>
    );
  }

  return (
    <section className="checkout">
      <h1>Tu carrito</h1>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="checkout__table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e =>
                        updateQty(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <div className="checkout__form">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button onClick={handleOrder}>Confirmar pedido</button>
          </div>
        </>
      )}
    </section>
  );
}
