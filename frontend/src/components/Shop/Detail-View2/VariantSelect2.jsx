import css from "./Styles/VariantSelect2.module.css";

export default function VariantSelect2({ availibleVariants, onSelectVariant }) {
  const handleVariantSelect = (variantId) => {
    onSelectVariant(variantId);
  };

  return (
    <div>
      <div>
        <p>Select a size:</p>
        <p>(width x height / depth)</p>
        <div className={css.btnContainer}>
          {availibleVariants && availibleVariants.length > 0
            ? availibleVariants.map((variant, variantIndex) => (
                <button
                  className={css.variantBtn}
                  key={variantIndex}
                  value={variant.id}
                  onClick={(e) => handleVariantSelect(e.target.value)}
                >
                  {variant.title}
                </button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
