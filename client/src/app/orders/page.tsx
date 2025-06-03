"use client";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// --- Interfaces and validation ---

// Defines the shape of a single order object
interface Order {
    _id: string;
    status: string;
    createdAt: string;
    addressTo: {
        first_name: string;
        last_name: string;
        address1: string;
        city: string;
        region: string;
        zip: string;
    };
    totalAmountPaidInCents: number;
    trackingUrl?: string;
    printifyStatus: string;
}

// Order ID form validation schema
export const formSchema = z.object({
    orderId: z
        .string()
        .trim()
        .min(24, { message: "Your order ID must be 24 characters" })
        .max(24, { message: "Your order ID must be 24 characters" }),
});

// --- APQI CALLS ---

// Fetches a single order by ID (_id)
async function handleOrderIdSubmit(orderId: string) {
    const res = await fetch(`${API_BASE_URL}/api/orders/get/${orderId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to fetch order");
    }
    return await res.json();
}

// Fetches all orders associated with the user/session
async function getAllOrders() {
    const res = await fetch(`${API_BASE_URL}/api/orders/all`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to fetch order");
    }
    return await res.json();
}

// Cancels an order and returns updated data
async function cancelOrder(orderId: string) {
    const res = await fetch(
        `${API_BASE_URL}/api/orders/cancel-order/${orderId}`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    const result = await res.json();
    if (!res.ok) throw new Error(result?.error || "Cancel failed");
    return result.order;
}

// Utility to format price from cents to USD string
function formatPrice(cents: number) {
    return (cents / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}

// --- ORDER TABLE COMPONENT ---

function OrderTable({
    orders,
    setOrders,
}: {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<any>>;
}) {
    const [cancelingOrderId, setCancelingOrderId] = useState<string | null>(
        null
    );

    if (!orders) return null;

    // if (orders && orders.length === 0) {
    //     return <p className="mt-8 text-muted-foreground">No orders found.</p>;
    // }

    // Handles the cancellation process
    const handleCancel = async (orderId: string) => {
        setCancelingOrderId(orderId);
        try {
            const updatedOrder = await cancelOrder(orderId);
            toast.success("Order canceled successfully");

            // Update only the canceled order in the state
            setOrders((prev: any[]) =>
                prev.map((o) => (o._id === orderId ? updatedOrder : o))
            );
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to cancel order");
        } finally {
            setCancelingOrderId(null);
        }
    };
    return (
        <div className="bg-white px-8 py-4 rounded-md shadow mt-8">
            <Table>
                {orders && orders.length === 0 ? (
                    <TableCaption>
                        <p>No orders found.</p>
                        <p>
                            Try seaching for the order with your order ID
                            provided in your confirmation email.
                        </p>
                    </TableCaption>
                ) : (
                    <></>
                )}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Shipping Address</TableHead>
                        <TableHead>Total Paid</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">
                                {order._id}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        order.status === "canceled"
                                            ? "destructive"
                                            : "default"
                                    }
                                >
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {new Date(order.createdAt).toLocaleString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p>
                                        {order.addressTo.first_name}{" "}
                                        {order.addressTo.last_name}
                                    </p>
                                    <p>{order.addressTo.address1}</p>
                                    <p>
                                        {order.addressTo.city},{" "}
                                        {order.addressTo.region}{" "}
                                        {order.addressTo.zip}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                {formatPrice(order.totalAmountPaidInCents)}
                            </TableCell>
                            <TableCell className="text-right">
                                {/* Tracking link */}
                                {order.trackingUrl ? (
                                    <Button className="mr-4" asChild>
                                        <Link
                                            href={order.trackingUrl}
                                            target="_blank"
                                        >
                                            Tracking
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button className="mr-4" disabled>
                                        Tracking
                                    </Button>
                                )}
                                {/* Cancel Button */}
                                {["pending", "on-hold"].includes(
                                    order.printifyStatus
                                ) ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant={"destructive"}>
                                                Cancel
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Are you sure?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    We'll check your order
                                                    status to determine if it's
                                                    eligible for cancellation.
                                                    If eligible, your order will
                                                    be canceled and a refund
                                                    will be issued to your card.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Button
                                                onClick={() =>
                                                    handleCancel(order._id)
                                                }
                                                variant={"destructive"}
                                                disabled={
                                                    cancelingOrderId ===
                                                    order._id
                                                }
                                            >
                                                {cancelingOrderId ===
                                                order._id ? (
                                                    <div className="flex justify-center items-center w-full">
                                                        <Loader2 className="animate-spin" />
                                                    </div>
                                                ) : (
                                                    "Cancel order"
                                                )}
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <Button disabled variant={"destructive"}>
                                        Cancel
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// --- MAIN COMPONENT ---

export default function Orders() {
    const [orders, setOrders] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderId: "682e6d5e3b2eb8f0965c1495",
        },
    });

    // Fetches orders when filter is "all"
    useEffect(() => {
        const controller = new AbortController();

        const fetchOrders = async () => {
            try {
                const allOrders = await getAllOrders();
                setOrders(allOrders.orders);
                setError(null); // clear any existing error
            } catch (err: any) {
                console.error("Failed to fetch orders", err);
                setError(
                    "We couldn't load your orders. Please try again later."
                );
                toast.error("Error loading orders.");
            } finally {
                setLoading(false);
            }
        };

        if (filter === "all") {
            fetchOrders();
        } else {
            setOrders(null); // Clear search results when switching away
        }

        return () => controller.abort();
    }, [filter]);

    // Handles manual search by ID
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const orderData = await handleOrderIdSubmit(values.orderId);

            setOrders([orderData]);
        } catch (err) {
            toast.error("Order not found");
        }
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center">
                <div className="text-red-500">
                    <TriangleAlert size={48} />
                </div>
                <p className="text-lg font-medium">{error}</p>
                <Button onClick={() => window.location.reload()}>
                    Reload Page
                </Button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-6xl font-bold">Your Orders</h1>
            <p className="w-2xl">
                Here are all of your orders. If you don't find what you're
                looking for, enter your order ID from your confirmation email.
            </p>
            <div className="mt-8">
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select filter..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filter</SelectLabel>
                            <SelectItem value="all">All Orders</SelectItem>
                            <SelectItem value="id">Search by ID</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {filter === "id" && (
                    <Card className="w-sm mt-8">
                        <CardHeader>
                            <CardTitle>Order ID</CardTitle>
                            <CardDescription>
                                Enter your 24-character order ID
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="orderId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                )}
                {loading ? (
                    <div className="flex justify-center items-center w-full">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <>
                        <OrderTable orders={orders} setOrders={setOrders} />
                    </>
                )}
            </div>
        </div>
    );
}
