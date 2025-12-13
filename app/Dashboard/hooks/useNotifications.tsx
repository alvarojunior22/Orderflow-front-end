

"use client";

import { useState, useCallback, useMemo } from "react";
import { Notification } from "../interfaces/interface-Notification";
import { updateAllNotificationsRead, updateNotificationStatus } from "@/app/api/notifications/orderApi";

interface UseNotificationsProps {
  initialNotifications?: Notification[];
}

export function useNotifications({
  initialNotifications = [],
}: UseNotificationsProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length;
  }, [notifications]);

  const markAsRead = useCallback(
    async (id: string) => {
      const originalNotifications = notifications;
      setLoading(true);

      // Optimistic Update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      );

      try {
        await updateNotificationStatus(id, false);
        setError(null);
      } catch (err) {
        console.error("Fallo al persistir la lectura:", err);
        setError(`Error al marcar ${id} como leído. Se ha revertido.`);

        // Rollback
        setNotifications(originalNotifications);
      } finally {
        setLoading(false);
      }
    },
    [notifications]
  );

  const markAllRead = useCallback(async () => {
    const originalNotifications = notifications;
    setLoading(true);

    // Optimistic Update
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

    try {
      await updateAllNotificationsRead();
      setError(null);
    } catch (err) {
      console.error("Fallo al persistir la lectura masiva:", err);
      setError("Error al marcar todas como leídas. Se ha revertido.");

      // Rollback
      setNotifications(originalNotifications);
    } finally {
      setLoading(false);
    }
  }, [notifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  return {
    notifications,
    unreadCount,
    error,
    loading,
    markAsRead,
    markAllRead,
    removeNotification,
    addNotification,
  };
}
