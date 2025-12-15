"use client";

import { useCallback, useMemo, useState } from "react";
import { Notification } from "../interfaces/interface-Notifications";
import { getStoreNotifications } from "@/app/api/notifications/notificationsStore";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getStoreNotifications()
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
  };
}
