export interface OrderItem {
    variantId: number;
    productId: string;
    quantity: number;
    priceInCents: number;
    title?: string;
    image?: string;
}
