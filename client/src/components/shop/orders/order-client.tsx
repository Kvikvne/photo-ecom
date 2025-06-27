"use client";

import OrderTable from "./order-table";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
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
  CardTitle
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, TriangleAlert } from "lucide-react";

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
    .max(24, { message: "Your order ID must be 24 characters" })
});

// --- API CALLS ---

// Fetches a single order by ID (_id)
async function handleOrderIdSubmit(orderId: string) {
  const res = await fetch(`${API_BASE_URL}/api/orders/get/${orderId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
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
    credentials: "include"
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error || "Failed to fetch order");
  }
  return await res.json();
}

export default function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: ""
    }
  });

  // Fetches orders when filter is "all"
  useEffect(() => {
    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        const allOrders = await getAllOrders();
        setOrders(allOrders.orders);
        setError(null); // clear any existing error
      } catch (err: unknown) {
        console.error("Failed to fetch orders", err);
        setError("We couldn&rsquo;t load your orders. Please try again later.");
        toast.error("Error loading orders.");
      } finally {
        setLoading(false);
      }
    };

    if (filter === "all") {
      fetchOrders();
    } else {
      setOrders([]); // Clear search results when switching away
    }

    return () => controller.abort();
  }, [filter]);

  // Handles manual search by ID
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const orderData = await handleOrderIdSubmit(values.orderId);

      setOrders([orderData]);
    } catch (err) {
      console.error(err);
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
        <Button onClick={() => window.location.reload()}>Reload Page</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-bold">Your Orders</h1>
      <p className="max-w-screen md:w-2xl">
        Here are all of your orders. If you don&rsquo;t find what you&rsquo;re
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
