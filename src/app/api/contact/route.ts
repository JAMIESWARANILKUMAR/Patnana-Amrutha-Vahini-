import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Missing name or email" }), { status: 400 });
    }

    // Ensure configuration exists
    const host = process.env.EMAIL_HOST;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
    const secure = (process.env.EMAIL_SECURE === "true");

    if (!host && !user) {
      // If no SMTP configured, return informative error so frontend can fallback
      return new Response(JSON.stringify({ error: "Email not configured on server. Please set EMAIL_HOST/EMAIL_USER/EMAIL_PASS env vars." }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user ? { user, pass } : undefined,
    } as any);

    const to = process.env.EMAIL_TO || "amruthapatnana217@gmail.com";

    const subject = `Portfolio contact form — ${name}`;
    const html = `
      <h3>New contact form submission</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Message:</strong><div>${message ? message.replace(/</g,"&lt;").replace(/>/g,"&gt;") : "(none)"}</div></li>
      </ul>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || user || "no-reply@example.com",
      to,
      subject,
      html,
      text: `${name} (${email}) says:\n\n${message || "(no message)"}`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), { status: 500 });
  }
}
