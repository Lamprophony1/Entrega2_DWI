
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';
import { useShopStore } from '../store/useShopStore';
import { fetchItems, searchItems } from '../services/api';


export default function Home() {

  const addToCart = useShopStore(state => state.addToCart);

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = query ? await searchItems(query) : await fetchItems();
      setProducts(data);
    };
    load();
  }, [query]);

  const handleAdd = product => {
    addToCart(product);
  };

  return (
    <section className="home">
      <h1 className="home__title">Productos disponibles</h1>

      <input
        className="home__search"
        type="search"
        placeholder="Buscar por nombre, categoría o empresa..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {products.length === 0 ? (
        <p className="home__empty">No se encontraron productos.</p>
      ) : (
        <div className="home__grid">
          {products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}
