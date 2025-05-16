export function filterEnabledVariants(product: any) {
    const enabledVariants = product.variants?.filter(
        (variant: any) => variant.is_enabled === true
    );

    const selectedImages = product.images?.filter(
        (image: any) => image.is_selected_for_publishing
    );

    return {
        id: product.id,
        title: product.title,
        description: product.description,
        variants: enabledVariants,
        images: selectedImages,
    };
}
