export default function VariantSelect2({ availibleVariants, onSelectVariant }) {
    const handleVariantSelect = (variantId) => {
      onSelectVariant(variantId);
    };
  
    return (
      <div>
        <div>
          <select
            onChange={(e) => handleVariantSelect(e.target.value)}
            name=""
            id=""
            defaultValue={availibleVariants && availibleVariants.length > 0 ? availibleVariants[0].id : ""}
          >
            <option value="" disabled>
              Select a size
            </option>
            {availibleVariants && availibleVariants.length > 0
              ? availibleVariants.map((variant, variantIndex) => (
                  <option key={variantIndex} value={variant.id}>
                    {variant.title}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
    );
  }
  