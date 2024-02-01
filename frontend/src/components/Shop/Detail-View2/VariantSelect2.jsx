import css from "./Styles/VariantSelect2.module.css";
import { useState, useEffect } from "react";

export default function VariantSelect2({ availibleVariants, onSelectVariant }) {
  const [selectedVariant, setSelectedVariant] = useState();

  const handleVariantSelect = (variantId, buttonValue) => {
    setSelectedVariant(variantId);
    onSelectVariant(buttonValue);
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
                  className={`${css.variantBtn} ${
                    selectedVariant === variant.id ? css.selectedVariant : ""
                  }`}
                  key={variantIndex}
                  value={variant.id}
                  onClick={(e) =>
                    handleVariantSelect(variant.id, e.target.value)
                  }
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
