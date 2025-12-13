// app/Dashboard/DashboardPage.tsx
'use server'
import { DashboardLayout } from "./layout/Dasboard.layout";
import { getNotifications } from "../api/notifications/orderApi";

// Importaciones de tus otros componentes de UI (presumiendo que no son Client Components)
import { KPICards } from "@/components/kpi-cards";
import { QuickInsights } from "@/components/quick-insights";
 // NUEVO COMPONENTE CLIENTE

// El componente es ASÍNCRONO, lo que lo convierte en un Server Component.
export default async function DashboardPage() {
  // 1. DATA FETCHING DEL SERVIDOR (para Notificaciones)
  // Esta llamada es muy eficiente ya que ocurre antes de que el HTML sea enviado al cliente.
  const inicialnotifications = await getNotifications();

  // NOTA: Si ServerOrdersFeed no necesita ningún filtro, puedes cargarlo directamente,
  // pero si lo necesita, debe estar dentro de OrdersFeedWithFilters.

  return (
    // 2. LAYOUT: Pasamos los datos precargados al Layout (Client Component)
    <DashboardLayout initialNotifications={inicialnotifications}>
      <div className="space-y-6">
        <KPICards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* 3. CONTENEDOR DE FILTROS Y FEED (CLIENTE) */}
            {/* Este NUEVO componente es el que usará useFilteredOrders() */}
            
          </div>

          <div className="lg:col-span-1">
            <QuickInsights />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
