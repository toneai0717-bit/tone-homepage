import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "kabu.tone50@gmail.com";

/** HTMLメール埋め込み用にユーザー入力をエスケープする */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      phone?: string;
      email?: string;
      message?: string;
      inquiryTypes?: string[];
    };

    const { name, phone, email, message, inquiryTypes } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "お名前とご相談内容は必須です" }, { status: 400 });
    }

    const inquiryText = Array.isArray(inquiryTypes) && inquiryTypes.length > 0
      ? inquiryTypes.join("、")
      : "未選択";

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json({ error: "メール設定が完了していません" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"戸根HP お問い合わせ" <${gmailUser}>`,
      to: TO_EMAIL,
      replyTo: email?.trim() || gmailUser,
      subject: `【HP問い合わせ】${name}様よりご連絡`,
      text: [
        `お名前：${name}`,
        `電話番号：${phone || "未記入"}`,
        `メールアドレス：${email || "未記入"}`,
        `お困りごとの種類：${inquiryText}`,
        ``,
        `【ご相談内容】`,
        message,
      ].join("\n"),
      html: `
        <h2>HPよりお問い合わせがありました</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;width:150px"><b>お名前</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>電話番号</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone || "未記入")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>メールアドレス</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email || "未記入")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>お困りごとの種類</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(inquiryText)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9"><b>ご相談内容</b></td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "送信に失敗しました。しばらくしてから再度お試しください。" }, { status: 500 });
  }
}
