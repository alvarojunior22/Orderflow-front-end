"use client"

import { useState, useCallback } from "react"
import  { Notification } from "../interfaces/interface-Notification"

interface UseNotificationsProps {
  initialNotifications?: Notification[]
}

export function useNotifications({ initialNotifications = [] }: UseNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }, [])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
    removeNotification,
    addNotification,
  }
}