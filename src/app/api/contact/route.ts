import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, service, message, references } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Fallback si no está configurada la API key todavía
      console.warn("RESEND_API_KEY no configurada en .env.local");
      return NextResponse.json({
        success: true,
        fallbackMailto: true,
      });
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #08040d; color: #edeae4; border: 1px solid #edc29e; border-radius: 12px;">
        <h2 style="color: #fdf5e6; border-bottom: 1px solid rgba(237,194,158,0.3); padding-bottom: 12px;">
          ✦ Nueva Solicitud de Encargo - Auralis
        </h2>
        <p style="margin: 12px 0;"><strong>Nombre:</strong> ${name}</p>
        <p style="margin: 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #edc29e;">${email}</a></p>
        <p style="margin: 12px 0;"><strong>Servicio:</strong> ${service || "Consulta general / No especificado"}</p>
        ${references ? `<p style="margin: 12px 0;"><strong>Referencias / Enlaces:</strong> <a href="${references}" style="color: #a87ffb;">${references}</a></p>` : ""}
        <div style="margin-top: 20px; padding: 16px; background: rgba(18,9,28,0.8); border-radius: 8px; border: 1px solid rgba(237,194,158,0.2);">
          <strong style="color: #edc29e;">Detalles de la idea:</strong>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #c9c3b8;">${message}</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Auralis Web <onboarding@resend.dev>",
      to: "auralis.inbox@gmail.com",
      replyTo: email,
      subject: `✦ Encargo Auralis de ${name}${service ? ` (${service})` : ""}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error al enviar email con Resend:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}

