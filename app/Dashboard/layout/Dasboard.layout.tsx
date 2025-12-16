"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  Bell,
  Box,
  ChevronRight,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useNotifications } from "../hooks/useNotifications";
import { useAuth } from "@/app/context/authcontext";
import { Notification } from "../interfaces/interface-Notifications";

/* -------------------- Notification Center -------------------- */

function NotificationCenter() {
  const [open, setOpen] = useState(false);

  const { notifications, unreadCount, markAsRead, markAllRead } =
    useNotifications();

  const activeNotifications = notifications.filter((n) => n.unread);
  const ref = useRef<HTMLDivElement | null>(null);

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

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <strong className="text-sm font-semibold">
              Notifications ({unreadCount})
            </strong>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-slate-500 hover:text-slate-700"
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
                    className="cursor-pointer"
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
                        <span className="text-xs text-slate-400 ml-2">
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
              onClick={() => setOpen(false)}
            >
              View all orders →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------- Navigation -------------------- */

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

/* -------------------- Layout -------------------- */

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <Link href="/Dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
              <Box className="w-3 h-3 text-white -ml-2 -mb-1" />
            </div>
            <span className="text-xl font-semibold text-slate-900">
              OrderFlow
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
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

        <div className="p-4 border-t border-slate-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search orders, products..."
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <NotificationCenter />
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
