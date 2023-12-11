import css from "./Styles/VariantSelect.module.css";
import AddToCartBtn from "./Addtocartbtn";
import he from "he";

const VariantSelect = ({
  product,
  productId,
  selectedVariants,
  handleVariantChange,
  productIndex,
  filteredProducts,
  photo,
}) => {
  const currentVariant = parseInt(selectedVariants[productId]?.variantId, 10);
  const selectedImages = filteredProducts[0]?.images.filter(
    (image) =>
      image.is_selected_for_publishing === true &&
      image.variant_ids.includes(currentVariant)
  );
 

  let photoDescription;

  photo.forEach((subArray) => {
    if (subArray.productId === productId) {
      photoDescription = subArray.description;
    }
  });

  

  return (
    <div className={css.container}>
      <p>${(selectedVariants[product.id]?.price / 100 || 0.00).toFixed(2)}</p>
      <select onChange={(e) => handleVariantChange(product.id, e.target.value)} defaultValue="" >
        <option value="" disabled>
          Select Variant
        </option>
        {product.variants
          ?.filter((variant) => variant.is_enabled === true)
          .map((variant, variantIndex) => (
            <option
              key={`${productIndex}-${variantIndex}`}
              value={`${variant.id},${variant.sku},${variant.price},${he.decode(
                variant.title
              )}`}
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
        title={
          selectedVariants[product.id] ? selectedVariants[product.id].title : ""
        }
        price={
          selectedVariants[product.id] ? selectedVariants[product.id].price : "" 
        }
        selectedImage={selectedImages[1]}
        productName={product.title}
        productDescription={photoDescription}
      />
    </div>
  );
};

export default VariantSelect;
