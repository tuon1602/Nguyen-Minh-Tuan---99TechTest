"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ICurrency } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React, { useState } from "react";

const currencyFormSchema = z.object({
  fromValue: z.string({ required_error: "Please select currency" }),
  toValue: z.string({ required_error: "Please select currency" }),
  amount: z.coerce
    .number({ required_error: "Please enter an amount" })
    .positive({
      message: "Amount must be greater than zero",
    }),
  result: z.number().optional(),
});

const CurrencyForm: React.FC<ICurrency> = ({ currency }) => {
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
  });
  function onSubmit(values: z.infer<typeof currencyFormSchema>) {
    setLoading(true);
    setTimeout(() => {
      const fromValueConverter = currency.find(
        (value) => value.currency === values.fromValue
      )!;
      const toValueConverter = currency.find(
        (value) => value.currency === values.toValue
      )!;
      const exchangeResult = (
        (values.amount * fromValueConverter?.price) /
        toValueConverter?.price
      ).toFixed(2);
      setResult(parseFloat(exchangeResult));
      setLoading(false);
    }, 1000);
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Select your preferred currency to convert amounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="fromValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currency.map((item, index) => (
                            <SelectItem value={item.currency}>
                              {item.currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="toValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currency.map((item, index) => (
                            <SelectItem value={item.currency}>
                              {item.currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        id="amount"
                        type="number"
                        inputMode="numeric"
                        placeholder="Enter amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result</FormLabel>
                    <FormControl>
                      <Input readOnly value={result} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Converting ..." : "Convert"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CurrencyForm;
