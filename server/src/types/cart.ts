export interface CartItem {
    variantId: number;
    productId: string;
    quantity: number;
    price: number;
    title: string;
    image: string;
}

export interface CartDocument extends Document {
    sessionId: string;
    items: CartItem[];
    updatedAt: Date;
}
