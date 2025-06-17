"use client";

import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { API_BASE_URL } from "@/lib/config";

const productFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  tags: z.string().min(2), // comma-separated
  blueprint_id: z.string().min(1),
  print_provider_id: z.string().min(1),
  print_image_id: z.string().min(1),
  variants: z
    .array(
      z.object({
        id: z.string().min(1),
        price: z.string().min(1)
      })
    )
    .min(1)
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function NewPrintifyProductForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      blueprint_id: "1159",
      print_provider_id: "105",
      print_image_id: "",
      variants: [{ id: "", price: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants"
  });

  const handleFormSubmit = async (values: ProductFormValues) => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        tags: values.tags.split(",").map((tag) => tag.trim()),
        blueprint_id: parseInt(values.blueprint_id),
        print_provider_id: parseInt(values.print_provider_id),
        variants: values.variants.map((v) => ({
          id: parseInt(v.id),
          price: parseInt(v.price),
          is_enabled: true
        })),
        print_areas: [
          {
            variant_ids: values.variants.map((v) => parseInt(v.id)),
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: values.print_image_id,
                    x: 0.5,
                    y: 0.5,
                    scale: 1,
                    angle: 0
                  }
                ]
              }
            ]
          }
        ],
        print_details: {
          print_on_side: "mirror"
        }
      };

      const res = await fetch(`${API_BASE_URL}/admin/products/queue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to create product");
      toast.success("Product created successfully!");
      form.reset();
    } catch (err) {
      toast.error("Product creation failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full md:max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Create Printify Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="canvas,ocean,wave" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="blueprint_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blueprint ID</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="print_provider_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider ID</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="print_image_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Print Image ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel>Variants</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ id: "", price: "" })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-2 items-center"
                >
                  <FormField
                    control={form.control}
                    name={`variants.${idx}.id` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant ID</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${idx}.price` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (cents)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button disabled={loading} type="submit">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Product"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
