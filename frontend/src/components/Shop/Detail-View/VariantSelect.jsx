import css from "./Styles/VariantSelect.module.css";
import AddToCartBtn from "./Addtocartbtn";

const VariantSelect = ({
  product,
  selectedVariants,
  handleVariantChange,
  productIndex,
}) => {

  console.log(selectedVariants)

  return (
    <div className={css.container}>
      <p>${selectedVariants[product.id]?.price / 100 || 0}</p>
      <select
        onChange={(e) => handleVariantChange(product.id, e.target.value)}
        value={
          selectedVariants[product.id] ? selectedVariants[product.id].title : ""
        }
      >
        <option value="" disabled>
          Select Variant
        </option>
        {product.variants
          ?.filter((variant) => variant.is_enabled === true)
          .map((variant, variantIndex) => (
            <option
              key={`${productIndex}-${variantIndex}`}
              value={`${variant.id},${variant.sku},${variant.price}, ${variant.cost}, ${variant.title}`}
            >
              {variant.title}
            </option>
          ))}
      </select>

      <AddToCartBtn
        productId={product.id}
        variantId={
          selectedVariants[product.id]
            ? selectedVariants[product.id].variantId
            : ""
        }
        sku={
          selectedVariants[product.id] ? selectedVariants[product.id].sku : ""
        }
        title={selectedVariants[product.id] ? selectedVariants[product.id].title : ""}
        price={selectedVariants[product.id] ? selectedVariants[product.id].price : ""}
      />
    </div>
  );
};

export default VariantSelect;
