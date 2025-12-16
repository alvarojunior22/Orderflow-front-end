// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { getOrders, addOrder } from "./orderStore";
import { Order } from "@/app/Dashboard/interfaces/interface-Order";

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error server", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Validación mínima obligatoria
    if (!body.customer || !body.amount || !body.channel) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder: Order = {
      id: crypto.randomUUID(),
      customer: body.customer,
      amount: Number(body.amount),
      channel: body.channel, // "telegram"
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addOrder(newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
