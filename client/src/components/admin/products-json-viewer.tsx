"use client";

import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/config";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

type Product = {
  title: string;
  description: string;
  safety_information: string;
  blueprint_id: number;
  print_provider_id: number;
  tags: string[];
  variants: {
    id: number;
    price: number;
    is_enabled: boolean;
  }[];
  print_areas: {
    variant_ids: number[];
    placeholders: {
      position: string;
      images: {
        id: string;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }[];
    }[];
  }[];
  print_details: {
    print_on_side: string;
  };
};

type ProductList = Product[];

export default function ProductsJsonViewer() {
  const [productsData, setProductsData] = useState<ProductList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductsJson() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/products/get-queue`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (!data || typeof data !== "object") {
          throw new Error("Data format is incorrect or incomplete");
        }

        setProductsData(data.products);
      } catch (err: unknown) {
        console.log(err);
        toast.error("There was a problem fetching data from JSON.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductsJson();
  }, []);

  return (
    <div className="p-6 bg-card rounded-xl">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="space-y-3">
          <h1 className="font-bold">Your Pending Products</h1>
          <p className="mb-2 text-sm text-muted-foreground">
            Here is your list of products you added. You can check this list
            before submitting them to Printify, Stripe, and your DB
          </p>
          {!productsData?.length && !loading && <p>No products found.</p>}
          <div className="">
            {productsData?.map((product, idx) => (
              <Accordion key={idx} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {product.title} ({product.tags[0]})
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mb-2">
                      <h4 className="font-medium">Variants:</h4>
                      <ul className="ml-4 list-disc space-y-1.5">
                        {product.variants.map((v) => (
                          <li key={v.id} className="font-normal">
                            ID: <Badge variant={"outline"}>{v.id}</Badge>,
                            Price:{" "}
                            <Badge variant={"outline"}>
                              ${(v.price / 100).toFixed(2)}
                            </Badge>
                            , Enabled:{" "}
                            {v.is_enabled ? (
                              <Badge variant={"outline"}>True</Badge>
                            ) : (
                              <Badge variant={"destructive"}>False</Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-2">
                      <h4 className="font-medium">Print Areas:</h4>
                      {product.print_areas.map((area, i) => (
                        <div key={i}>
                          {area.placeholders.map((ph, j) => (
                            <div key={j}>
                              Position: {ph.position}
                              {ph.images.map((img, k) => (
                                <div key={k} className="ml-4 text-xs">
                                  Image ID: {img.id}, X: {img.x}, Y: {img.y},
                                  Scale: {img.scale}, Angle: {img.angle}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-medium">Print Details:</h4>
                      <p className="ml-4 text-sm">
                        Print on side: {product.print_details.print_on_side}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
