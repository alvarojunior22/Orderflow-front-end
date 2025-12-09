type Role = "customer" | "admin" | "employee";

interface Users {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  address: string;
  createdAt: Date;
}

export const data: Users[] = [
  {
    id: 1,
    fullName: "alvaro ariza",
    email: "alvaro@example.com",
    password: "alvaro123",
    role: "admin",
    address: "Cra 45 #10-15, Barranquilla",
    createdAt: new Date("2025-01-10"),
  },
  {
    id: 2,
    fullName: "María González",
    email: "maria@example.com",
    password: "maria123",
    role: "employee",
    address: "Calle 80 #30-50, Bogotá",
    createdAt: new Date("2025-02-02"),
  },
  {
    id: 3,
    fullName: "Luis Herrera",
    email: "luis@example.com",
    password: "luis123",
    role: "employee",
    address: "Av. Libertad #22-17, Cali",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: 4,
    fullName: "Ana Torres",
    email: "ana@example.com",
    password: "ana123",
    role: "customer",
    address: "Cl 50 #18-23, Medellín",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: 5,
    fullName: "Javier Martínez",
    email: "javier@example.com",
    password: "javi123",
    role: "customer",
    address: "Carrera 5 #25-12, Cartagena",
    createdAt: new Date("2025-03-18"),
  },
];
