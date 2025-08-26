const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export async function fetchItems() {
  const res = await fetch(`${API_BASE}/items`);
  return res.json();
}

export async function searchItems(q) {
  const res = await fetch(`${API_BASE}/items/search?name=${encodeURIComponent(q)}`);
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  return res.json();
}

export async function fetchOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`);
  return res.json();
}

