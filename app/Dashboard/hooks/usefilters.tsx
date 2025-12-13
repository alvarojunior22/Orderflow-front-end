// src/hooks/useFilteredOrders.tsx
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
// Asegúrate de importar tu tipo Order y tus datos mockOrders
import { mockOrders } from "@/components/orders-table";

// 1. Definición de la interfaz de filtros
export interface OrdersFilters {
  status: string;
  dateRange: DateRange | undefined;
}

// 2. Definición del hook
export function useFilteredOrders() {
  const [filters, setFilters] = useState<OrdersFilters>({
    status: "all",
    dateRange: undefined,
  });

  // Función para actualizar los filtros (para pasar al OrdersHeader)
  const handleFilterChange = (newFilters: OrdersFilters) => {
    setFilters(newFilters);
  };

  // 3. Lógica de Filtrado (Centralizada)
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // a. Status Match
      const statusMatch =
        filters.status === "all" ||
        filters.status === "" ||
        order.status === filters.status;

      // b. Date Match
      let dateMatch = true;
      if (filters.dateRange?.from) {
        // ... (La lógica de comparación de fechas que ya definimos) ...
        const orderDate = new Date(order.date);
        orderDate.setHours(0, 0, 0, 0);

        const fromDate = filters.dateRange.from;
        const toDate = filters.dateRange.to || filters.dateRange.from;

        const startDate = new Date(fromDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(toDate);
        endDate.setHours(23, 59, 59, 999);

        dateMatch = orderDate >= startDate && orderDate <= endDate;
      }

      return statusMatch && dateMatch;
    });
  }, [filters]); // Se recalcula solo cuando 'filters' cambia

  // 4. Retornar los datos y las funciones que los componentes necesitan
  return {
    orders: mockOrders,
    filteredOrders,
    filters,
    handleFilterChange,
  };
}
