"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Printer, ArrowRight } from "lucide-react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderItem {
    variantId: number;
    productId: string;
    quantity: number;
    priceInCents: number;
    title?: string;
    image?: string;
}

interface AddressTo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string; // ISO 3166-1 alpha-2 country code (e.g., "US")
    region: string; // State or province
    city: string;
    address1: string;
    address2?: string; // Optional
    zip: string;
}

interface Order {
    _id: string;
    stripeSessionId: string;
    email?: string;
    status: string;
    lineItems: OrderItem[];
    stripeCustomerId?: string;
    stripePaymentIntentId?: string;
    createdAt: string;
    fulfilledAt?: string;
    printifyOrderId?: string;
    error?: string;
    shippedAt?: string;
    deliveredAt?: string;
    trackingUrl?: string;
    addressTo: AddressTo;
    subtotalInCents: number;
    shippingInCents: number;
    discountInCents?: number;
    taxInCents: number;
    totalAmountPaidInCents: number;
}

export default function SuccessPage() {
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            const res = await fetch(`http://localhost:5000/api/orders`, {
                credentials: "include",
            });
            const data = await res.json();
            setOrder(data);
        }
        fetchOrder();
    }, []);

    if (!order) return <Loader2 className="animate-spin mx-auto" />;

    return (
        <div className="flex flex-col items-center">
            <div className=" rounded-sm p-18 shadow max-w-fit">
                <h1 className="text-2xl font-bold text-center">
                    Thank you for your order!
                </h1>
                <p className="mt-2 text-muted-foreground text-center">
                    Order #{order._id.toUpperCase()}
                </p>
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {order.lineItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between gap-6 mb-4 border-b-2 pb-4"
                            >
                                {/* <Image
                        height={100}
                        width={100}
                        src={item.image}
                        alt={item.productTitle}
                        /> */}
                                <div>
                                    <p className="">{item.title}</p>
                                </div>
                                <span>Quantity: {item.quantity}</span>
                                <p className="" key={idx}>
                                    ${(item.priceInCents / 100).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="justify-between items-center">
                        <div>
                            <p className="mb-2">
                                <strong>Shipping to:</strong>
                            </p>
                            <p>
                                {order.addressTo.first_name}{" "}
                                {order.addressTo.last_name}
                            </p>
                            <p>{order.addressTo.address1}</p>
                            <p>
                                {order.addressTo.city}, {order.addressTo.region}{" "}
                                {order.addressTo.zip}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p>
                                Sub total: $
                                {(order.subtotalInCents / 100).toFixed(2)}
                            </p>
                            <p>
                                Shipping: $
                                {(order.shippingInCents / 100).toFixed(2)}
                            </p>
                            <p>
                                Sales tax: $
                                {(order.taxInCents / 100).toFixed(2)}
                            </p>
                            {order.discountInCents && (
                                <p>
                                    Discount: $
                                    {(order.discountInCents / 100).toFixed(2)}
                                </p>
                            )}
                            <p className="mt-2 border-t-2 pt-2">
                                <strong>Total Paid:</strong> $
                                {(order.totalAmountPaidInCents / 100).toFixed(
                                    2
                                )}
                            </p>
                        </div>
                    </CardFooter>
                </Card>
                <div className="flex justify-end gap-2">
                    <Button className="mt-4">
                        Print order <Printer />
                    </Button>
                    <Button asChild className="mt-4">
                        <Link href={"/shop/prints"}>
                            continue shopping <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
