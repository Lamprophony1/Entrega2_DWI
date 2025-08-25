
import '../styles/product-card.css';
import { ExpandableText } from './ExpandableText';

export default function ProductCard({ product, onAdd }) {
  const { name, brand, company, description, category, image, price } = product;
  
  return (
    <article className="product-card">
      <img
        src={`/${image}`}
        alt={name}
        className="product-card__image"
        loading="lazy"
      />

      <div className="product-card__body">
        <h3 className="product-card__title">{name}</h3>

        <ul className="product-card__meta">
          <li><strong>Marca:</strong> {brand}</li>
          <li><strong>Empresa:</strong> {company}</li>
          <li><strong>Categoría:</strong> {category}</li>
        </ul>

        <ExpandableText text={description} limit={50} />

        <p className="product-card__price">${price.toFixed(2)}</p>

        <button className="product-card__button" onClick={() => onAdd(product)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}