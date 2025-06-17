"use client";

import React, { useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

// Cancels an order and returns updated data
async function cancelOrder(orderId: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/orders/cancel-order/${orderId}`,
    {
      method: "POST",
      credentials: "include"
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
    currency: "USD"
  });
}

export default function OrderTable({
  orders,
  setOrders
}: {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [cancelingOrderId, setCancelingOrderId] = useState<string | null>(null);

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
      setOrders((prev: Order[]) =>
        prev.map((o) => (o._id === orderId ? updatedOrder : o))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        toast.error(err.message || "Failed to cancel order");
      } else {
        console.error("Unknown error", err);
        toast.error("Unknown error");
      }
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
              Try seaching for the order with your order ID provided in your
              confirmation email.
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
              <TableCell className="font-medium">{order._id}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "canceled" ? "destructive" : "default"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </TableCell>
              <TableCell>
                <div>
                  <p>
                    {order.addressTo.first_name} {order.addressTo.last_name}
                  </p>
                  <p>{order.addressTo.address1}</p>
                  <p>
                    {order.addressTo.city}, {order.addressTo.region}{" "}
                    {order.addressTo.zip}
                  </p>
                </div>
              </TableCell>
              <TableCell>{formatPrice(order.totalAmountPaidInCents)}</TableCell>
              <TableCell className="text-right">
                {/* Tracking link */}
                {order.trackingUrl ? (
                  <Button className="mr-4" asChild>
                    <Link href={order.trackingUrl} target="_blank">
                      Tracking
                    </Link>
                  </Button>
                ) : (
                  <Button className="mr-4" disabled>
                    Tracking
                  </Button>
                )}
                {/* Cancel Button */}
                {["pending", "on-hold"].includes(order.printifyStatus) ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"destructive"}>Cancel</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          We&rsquo;ll check your order status to determine if
                          it&rsquo;s eligible for cancellation. If eligible,
                          your order will be canceled and a refund will be
                          issued to your card.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        onClick={() => handleCancel(order._id)}
                        variant={"destructive"}
                        disabled={cancelingOrderId === order._id}
                      >
                        {cancelingOrderId === order._id ? (
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
