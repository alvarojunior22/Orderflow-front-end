"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Notification } from "../interfaces/interface-Notifications";
import {
  getStoreNotifications,
  markAllStoreNotificationsRead,
  subscribeStoreNotifications,
  updateStoreNotification,
} from "@/app/api/notifications/notificationsStore";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getStoreNotifications()
  );

  useEffect(() => {
    return subscribeStoreNotifications(setNotifications);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const markAsRead = useCallback((id: string) => {
    updateStoreNotification(id, false);
  }, []);

  const markAllRead = useCallback(() => {
    markAllStoreNotificationsRead();
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
  };
}
