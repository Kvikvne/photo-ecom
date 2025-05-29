import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { PrintifyProduct } from "../types/printify";
import { OrderDocument } from "../models/order";
const TOKEN = process.env.PRINTIFY_TOKEN;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

const printifyClient = axios.create({
    baseURL: `https://api.printify.com/v1/shops/${SHOP_ID}`,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

// ------------------------
// PRODUCT MANAGMENT
// ------------------------
/**
 * Find a product on Printify by title. This is used to make sure no duplicates are created during the createProduct script.
 * @param title REQUIRED - title of the product
 */
export async function findProductByTitle(title: string): Promise<any | null> {
    const allProducts = await getAllProducts();
    return allProducts.find((p: any) => p.title === title) || null;
}
/**
 * Create a product on Printify
 * @param body REQUIRED - request body with product details
 */
export async function createProduct(body: any = {}): Promise<any> {
    const res = await printifyClient.post("/products.json", body);
    return res.data;
}
/**
 * Delete a product on Printify
 * @param productId REQUIRED -  ID of the product you want to delete
 */
export async function deleteProduct(productId: string): Promise<any> {
    const res = await printifyClient.delete(`/products/${productId}.json`);
    return res;
}
/**
 * Update a product on Printify
 * @param productId REQUIRED - ID of the product you want to update
 * * @param body REQUIRED - request body with product details
 */
export async function updateProduct(
    productId: string,
    body: any
): Promise<any> {
    const res = await printifyClient.put(`/products/${productId}.json`, body);
    return res.data;
}

// ------------------------
// GET PRODUCTS
// ------------------------

export async function getAllProducts(): Promise<any> {
    const res = await printifyClient.get("/products.json");
    return res.data.data;
}

export async function getProductById(
    productId: string
): Promise<PrintifyProduct> {
    const res = await printifyClient.get(`/products/${productId}.json`);
    return res.data;
}

// ------------------------
// ORDERS MANAGMENT
// ------------------------

/**
 * Fetches all products on Printify
 */
export async function getAllOrders(): Promise<any> {
    const res = await printifyClient.get("/orders.json");
    return res.data;
}

/**
 * Gets a specific order from printify
 * @param printifyOrderId REQUIRED - ID of the order you want to fetch
 */
export async function getPrintifyOrder(printifyOrderId: string): Promise<any> {
    const res = await printifyClient.get(`/orders/${printifyOrderId}.json`);
    return res.data;
}

/**
 * Calculate the shipping cost of an order
 * @param formattedData REQUIRED (from the client) - formattedData = {
        line_items: cartContent
          .map((cartItem) => {
            return cartItem.line_items.map((item) => ({
              product_id: item.product_id,
              variant_id: parseInt(item.variant_id, 10),
              quantity: parseInt(item.quantity, 10),
              print_provider_id: parseInt(item.metadata.print_provider_id, 10),
              blueprint_id: parseInt(item.metadata.blueprint_id, 10),
              sku: item.metadata.sku,
            }));
          })
          .flat(),
        address_to: {
          first_name: deliveryData.first_name,
          last_name: deliveryData.last_name,
          email: deliveryData.email,
          phone: deliveryData.phone,
          country: deliveryData.country,
          region: "",
          address1: deliveryData.address1,
          address2: "",
          city: deliveryData.city,
          zip: deliveryData.zip,
        },
      };
 */
export async function shippingCost(
    formattedData: Record<string, any>
): Promise<any> {
    try {
        const res = await printifyClient.post(
            "/orders/shipping.json",
            formattedData
        );
        return res.data;
    } catch (error: any) {
        console.error(
            "Error in shippingCost:",
            error.response?.data || error.message
        );
        throw error;
    }
}

/**
 * Cancel an order on Printify
 * @param orderId REQUIRED - ID of the order you want cancelled
 */
export async function cancelPrintifyOrder(orderId: string): Promise<any> {
    try {
        const res = await printifyClient.post(`/orders/${orderId}/cancel.json`);
        return res.data;
    } catch (error: any) {
        console.error(
            "Error in cancelOrder:",
            error.response?.data || error.message
        );
        throw error;
    }
}

/**
 * Send an order to Printify
 * @param order REQUIRED - Order document from the DB
 */
export async function sendToPrintify(order: OrderDocument): Promise<string> {
    const shopId = process.env.PRINTIFY_SHOP_ID;
    const token = process.env.PRINTIFY_TOKEN;

    if (!shopId || !token) {
        throw new Error(
            "Missing PRINTIFY_SHOP_ID or PRINTIFY_TOKEN in environment"
        );
    }
    const formattedOrderData = {
        external_id: order._id.toString(),
        line_items: order.lineItems.map((item) => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
        })),
        shipping_method: order.shippingMethod,
        send_shipping_notification: false,
        address_to: order.addressTo,
    };

    try {
        const response = await axios.post(
            `https://api.printify.com/v1/shops/${shopId}/orders.json`,
            formattedOrderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.id; // This is the Printify order ID
    } catch (error: any) {
        console.error(
            "Error from Printify API:",
            error.response?.data || error.message,
            formattedOrderData
        );
        throw new Error("Failed to submit order to Printify");
    }
}
