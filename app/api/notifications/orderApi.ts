import axios from "axios";



export async function getNotifications() {
  
  const response = await axios.get("http://localhost:3000/api/notifications");
  return response.data; 
}


export async function updateNotificationStatus(
  notificationId: string, 
  read: boolean = true
) {
  
  await axios.put(`/api/notifications/${notificationId}`, { read: !read });
}


export async function updateAllNotificationsRead() {
  await axios.put("/api/notifications/mark-all-read");
}
