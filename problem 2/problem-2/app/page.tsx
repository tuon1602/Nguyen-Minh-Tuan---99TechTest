import { notFound } from "next/navigation";
import CurrencyForm from "./_components/CurrencyForm";
import { clearDuplicate } from "@/utils";

import Image from "next/image";

export async function getDataCurrency(){
  const res = await fetch("https://interview.switcheo.com/prices.json",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next:{
      revalidate:300
    }
  })
  if(!res.ok){
    return notFound
  }
  const data =await res.json()
  return data
}

export default async function Home() {
  const currencyData = await getDataCurrency()
  return (
    <main className="flex min-h-screen flex-col items-center mt-10 space-y-10">
      <h2 className="text-4xl ">Problem 2</h2>
      <CurrencyForm currency={clearDuplicate(currencyData,"currency")}/>
    </main>
  );
}
