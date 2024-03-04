import css from "./Styles/ProductCard.module.css";
import CardBtn from "./CardBtn";

export default function ProductCard({
  variant,
  cardPhoto,
  cardDescription,
  price,
  title,
  productId,
  tag,
  products,
}) {
  const productTypes = {
    Decor: "Acrylic",
    Canvas: "Canvas",
    'iPhone Cases': "iPhone Cases",
    'Mouse pad': 'Desk mat'
  };


  const getProductType = (tags) => {
    for (const type in productTypes) {
      if (tags.includes(type)) {
        return productTypes[type];
      }
    }
  };

  // Filter products with matching names
  const matchingProducts = products.filter(
    (product) => product.title === title
  );

  return (
    <div className={css.container}>
      <div className={css.productCard}>
        <a href={`/products/${getProductType(tag) || ""}/${productId}`}>
          <div className={css.productImg}>
            <img src={cardPhoto} alt="" />
          </div>
        </a>
        <div className={css.productP}>
          <h4>{title}</h4>
        </div>

        <div className={css.bottom}>
          <div className={css.price}>
            <p>From ${price.toFixed(2)}</p>
          </div>
          <div className={css.size}>
            <h4>Size Range</h4>
            <p>{variant}</p>
          </div>
          <div className={css.categoryContainer}>
            {matchingProducts.map((item, index) => (
              <div className={css.category}>
                <p key={index}>
                  {productTypes[item.tags[4]]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <CardBtn productId={productId} tag={getProductType(tag) || ""} />
      </div>
    </div>
  );
}
