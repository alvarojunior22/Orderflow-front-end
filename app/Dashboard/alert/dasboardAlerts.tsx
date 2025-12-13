"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../interfaces/interface-Order";

interface DashboardAlertsProps {
  initialNotifications: Notification[];
}

export function DashboardAlerts({
  initialNotifications,
}: DashboardAlertsProps) {
  const [open, setOpen] = useState(false);

  const { notifications, unreadCount, markAsRead, markAllRead, error } =
    useNotifications({ initialNotifications });

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

      {/* --- Indicador de Error (opcional) --- */}
      {error && (
        <Alert className="absolute top-full right-0 mt-2 p-2 bg-red-100 text-red-700 rounded-md shadow-md z-50 w-80">
          <p className="text-sm">⚠️ {error}</p>
        </Alert>
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
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                No notifications
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {notifications.map((notification) => (
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
              href="/orders"
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
