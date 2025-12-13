// app/api/notifications/[slug]/route.ts

import { NextResponse } from "next/server";
// ¡IMPORTANTE! Asegúrate de que esta ruta relativa sea correcta
import {
  markAllStoreNotificationsRead,
  updateStoreNotification,
} from "../notificationsStore";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  
 const { slug } = await params;
 const [segment] = slug;
  ;
  try {
    if (segment === "mark-all-read") {
      // 1. LÓGICA DE NEGOCIO: Llama a la función que muta el estado
      markAllStoreNotificationsRead();

      console.log("Servidor: Ejecutando acción 'mark-all-read' y completada.");

      return NextResponse.json(
        { success: true, message: "Todas marcadas como leídas" },
        { status: 200 }
      );
    } else if (segment) {
      // 2. LÓGICA DE NEGOCIO: Maneja la actualización individual
      const notificationId = segment;
      updateStoreNotification(notificationId, false); // false = marcar como leído

      console.log(
        `Servidor: Marcando ID específico: ${notificationId} y completada.`
      );

      return NextResponse.json(
        { success: true, id: notificationId },
        { status: 200 }
      );
    }

    // 3. FALLBACK: Si el slug no coincide con ninguna acción.
    return NextResponse.json(
      { message: "Ruta de notificación no válida o acción desconocida" },
      { status: 400 }
    );
  } catch (error) {
    // 4. MANEJO DE ERROR CRÍTICO: Si la lógica de 'notificationsStore' falla.
    console.error(
      `Error interno al procesar PUT para segmento ${segment}:`,
      error
    );

    return NextResponse.json(
      { message: "Error interno del servidor al actualizar notificaciones" },
      { status: 500 } // <-- Este es el código que el cliente recibe si algo falla.
    );
  }
}
