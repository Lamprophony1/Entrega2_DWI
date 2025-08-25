
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';
import '../styles/home.css'; // aquí pondremos la cuadrícula
import { useShopStore } from '../store/useShopStore';
import { useSearch } from '../hooks/useSearch';


export default function Home() {

  const addToCart = useShopStore(state => state.addToCart);

  const { filtered, query, setQuery } = useSearch(productsData);

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

      {filtered.length === 0 ? (
        <p className="home__empty">No se encontraron productos.</p>
      ) : (
        <div className="home__grid">
          {filtered.map(prod => (
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
