// src/data/mockOrders.ts

import { Order } from "../app/Dashboard/interfaces/interface-Order"; // Asegúrate de que esta ruta sea correcta

export const mockOrders: Order[] = [
  {
    id: "ORD-3000",
    customer: "Elena Ramírez",
    channel: "whatsapp",
    amount: 72.5,
    status: "ready",
    createdAt: new Date("2025-12-12T17:20:00Z"),
    updatedAt: new Date("2025-12-12T17:20:00Z"),
  },
  {
    id: "ORD-2999",
    customer: "Carlos Soler",
    channel: "telegram",
    amount: 12.99,
    status: "processing",
    createdAt: new Date("2025-12-12T15:00:00Z"),
    updatedAt: new Date("2025-12-12T15:00:00Z"),
  },

  {
    id: "ORD-2998",
    customer: "María Díaz",
    channel: "whatsapp",
    amount: 120.0,
    status: "ready",
    createdAt: new Date("2025-12-11T19:45:00Z"),
    updatedAt: new Date("2025-12-12T10:00:00Z"), // Se actualizó hoy
  },
  {
    id: "ORD-2997",
    customer: "Javier Castro",
    channel: "telegram",
    amount: 34.75,
    status: "processing",
    createdAt: new Date("2025-12-11T12:15:00Z"),
    updatedAt: new Date("2025-12-11T12:15:00Z"),
  },
  // DÍA ANTERIOR (Dec 10, 2025)
  {
    id: "ORD-2996",
    customer: "Ana Romero",
    channel: "whatsapp",
    amount: 98.9,
    status: "ready",
    createdAt: new Date("2025-12-10T08:00:00Z"),
    updatedAt: new Date("2025-12-10T14:30:00Z"),
  },
  {
    id: "ORD-2995",
    customer: "Pedro Gómez",
    channel: "telegram",
    amount: 45.0,
    status: "awaiting",
    createdAt: new Date("2025-12-10T11:50:00Z"),
    updatedAt: new Date("2025-12-10T11:50:00Z"),
  },

  {
    id: "ORD-2994",
    customer: "Laura Sanz",
    channel: "whatsapp",
    amount: 21.0,
    status: "processing",
    createdAt: new Date("2025-12-08T14:00:00Z"),
    updatedAt: new Date("2025-12-08T14:00:00Z"),
  },
  {
    id: "ORD-2993",
    customer: "Miguel Torres",
    channel: "telegram",
    amount: 60.5,
    status: "ready",
    createdAt: new Date("2025-12-07T09:10:00Z"),
    updatedAt: new Date("2025-12-07T18:00:00Z"),
  },
  {
    id: "ORD-2992",
    customer: "Sofía Vargas",
    channel: "whatsapp",
    amount: 15.0,
    status: "awaiting",
    createdAt: new Date("2025-12-06T21:30:00Z"),
    updatedAt: new Date("2025-12-06T21:30:00Z"),
  },
  {
    id: "ORD-2991",
    customer: "Ricardo Núñez",
    channel: "telegram",
    amount: 150.99,
    status: "processing",
    createdAt: new Date("2025-12-05T16:00:00Z"),
    updatedAt: new Date("2025-12-05T16:00:00Z"),
  },
];
