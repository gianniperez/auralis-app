import { EmailTemplate } from "@/utils/emailTemplate";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.email ||
      !body.reason ||
      (body.reason !== "order" && !body.message)
    ) {
      console.error("Missing required fields");
      return Response.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    const emailProps = {
      name: body.name,
      email: body.email,
      reason: body.reasonLabel || body.reason,
      type: body.typeLabel || body.type,
      description: body.description,
      references: body.references,
      budget: body.budgetLabel || body.budget,
      date: body.date,
      message: body.message,
      consent: body.consent,
    };

    const attachments = body.references
      ? body.references.map((url: string) => ({ path: url }))
      : [];

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.EMAIL as string],
      subject: `Nuevo mensaje de ${body.name}`,
      // eslint-disable-next-line react-hooks/error-boundaries
      react: <EmailTemplate {...emailProps} />,
      attachments: attachments,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return Response.json({ error }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return Response.json(data);
  } catch (error) {
    console.error("SERVER INTERNAL ERROR:", error);
    return Response.json(
      {
        error: "Error en el servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
