// app/Dashboard/components/DashboardLayout.tsx (o donde lo tengas)

"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  HelpCircle,
  Search,
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  MessageSquare,
  Box,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../interfaces/interface-Notification";
// Reemplazar la llamada a axios.post con una función de API de cliente (buena práctica)
// import axios from "axios";

// --- Componente: NotificationCenter (Mejorado) ---

function NotificationCenter({
  initialNotifications,
}: {
  initialNotifications: Notification[];
}) {
  const [open, setOpen] = useState(false);
  // Incluir 'error'
  const { notifications, unreadCount, markAsRead, markAllRead, error } =
    useNotifications({ initialNotifications });

  // Muestra solo las no leídas en el dropdown
  const activeNotifications = notifications.filter((n) => n.unread);

  const ref = useRef<HTMLDivElement | null>(null);

  // Lógica de cierre externo y ESC (use client)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Maneja el clic en el ítem: Marca como leído y cierra el menú (mejor UX)
  const handleItemClick = useCallback(
    (id: string) => {
      markAsRead(id);
      setOpen(false);
    },
    [markAsRead]
  );

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="relative"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </Button>

      {/* Indicador de Error */}
      {error && (
        <div className="absolute top-full right-0 mt-2 p-2 bg-red-100 text-red-700 rounded-md shadow-md z-50 w-80 border border-red-300">
          <p className="text-sm">⚠️ Error de sincronización: {error}</p>
        </div>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <strong className="text-sm font-semibold">
              Notifications ({unreadCount})
            </strong>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {activeNotifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                No new notifications
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {activeNotifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${
                      notification.unread
                        ? "ring-1 ring-blue-50 bg-blue-50/30"
                        : ""
                    }`}
                    onClick={() => handleItemClick(notification.id)}
                  >
                    <AlertTitle className="text-sm">
                      {notification.title}
                    </AlertTitle>
                    <AlertDescription>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-600">
                          {notification.message}
                        </span>
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                          {notification.time}
                        </span>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
            <Link
              href="/Dashboard/views/orders"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setOpen(false)} // Cierra al navegar
            >
              View all orders →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}



const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/Dashboard" },
  { name: "Live Orders", icon: ShoppingCart, href: "/Dashboard/views/orders" },
  {
    name: "Inventory Catalog",
    icon: Package,
    href: "/Dashboard/views/inventory",
  },
  { name: "Analytics", icon: BarChart3, href: "/Dashboard/views/analytics" },
  { name: "Settings", icon: Settings, href: "/Dashboard/views/settings" },
];

// --- Componente: DashboardLayout (sin cambios funcionales, sólo limpieza) ---

interface DashboardLayoutProps {
  children: React.ReactNode;
  initialNotifications: Notification[];
}

export function DashboardLayout({
  children,
  initialNotifications,
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // NOTA: handleLogout debería usar una función de API cliente dedicada para la desautenticación.
  const handleLogout = () => {
    // Simulamos un logout, idealmente usando una función async de un archivo de API:
    // try { await logoutUser(); router.push("/"); } catch (error) { ... }
    console.log("Simulating Logout...");
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
              <Box className="w-3 h-3 text-white -ml-2 -mb-1" />
            </div>
            <span className="text-xl font-semibold text-slate-900">
              OrderFlow
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src="/professional-user.jpg" />
              <AvatarFallback className="bg-slate-200 text-slate-700">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                John Doe
              </p>
              <p className="text-xs text-slate-500 truncate">Store Owner</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search orders, products..."
                  className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <NotificationCenter initialNotifications={initialNotifications} />
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
