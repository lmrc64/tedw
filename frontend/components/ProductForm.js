import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ProductForm() {
  // Datos simulados para variantes
  const variants = [
    { id: 'variant1', title: 'Small', price: 30 },
    { id: 'variant2', title: 'Medium', price: 40 },
    { id: 'variant3', title: 'Large', price: 50 }
  ];

  const mainImg = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg";

  // Datos estáticos del producto
  const productTitle = "Producto Estático";
  const productHandle = "producto-estatico";

  // Estado simulado para la selección (puedes cambiar estos valores para probar)
  const quantity = 1;
  const selectedVariant = variants[0];

  // Estilos para el botón
  const atcBtnStyle = `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex justify-center items-baseline hover:bg-palette-dark`;

  return (
    <div className="w-full">
      <div className="flex justify-start space-x-2 w-full">
        {/* Campo de cantidad (no reactivo) */}
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Qty.</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            defaultValue={quantity}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
            readOnly
          />
        </div>
        {/* Selector de variante (no reactivo) */}
        <div className="flex flex-col items-start space-y-1 flex-grow">
          <label className="text-gray-500 text-base">Size</label>
          <select
            id="size-selector"
            name="size-selector"
            className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
            defaultValue={selectedVariant.id}
          >
            {variants.map(item => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Botón estático */}
      <button className={atcBtnStyle} aria-label="cart-button">
        Add To Cart
        <FontAwesomeIcon icon={faShoppingCart} className="w-5 ml-2" />
      </button>
    </div>
  );
}

export default ProductForm;
