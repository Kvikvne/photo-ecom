// In VariantSelect.js

const VariantSelect = ({ product, selectedVariants, handleVariantChange, productIndex }) => {
    return (
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
              value={`${variant.id},${variant.sku},${variant.price}`}
            >
              {variant.title}
            </option>
          ))}
      </select>
    );
  };
  
  export default VariantSelect;
  