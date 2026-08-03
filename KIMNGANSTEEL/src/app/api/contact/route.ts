import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  specs?: unknown;
  content?: unknown;
};

const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 3000;

function normalizeText(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll("\n", "<br />");
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactPayload;

    const fullName = normalizeText(data.fullName);
    const phone = normalizeText(data.phone);
    const email = normalizeText(data.email);
    const company = normalizeText(data.company);
    const message = normalizeText(data.specs || data.content, MAX_MESSAGE_LENGTH);

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ họ tên, số điện thoại và nội dung yêu cầu." },
        { status: 422 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    if (!emailUser || !emailPass || !emailTo) {
      return NextResponse.json(
        { error: "Chưa cấu hình email nhận báo giá. Vui lòng kiểm tra EMAIL_USER và EMAIL_PASS." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const safeFullName = escapeHtml(fullName);
    const safePhone = escapeHtml(phone);
    const safeEmail = email ? escapeHtml(email) : "<i>Không điền</i>";
    const safeCompany = company ? escapeHtml(company) : "<i>Không điền</i>";
    const safeMessage = escapeHtml(message);

    const info = await transporter.sendMail({
      from: `"Kim Ngân Steel Website" <${emailUser}>`,
      to: emailTo,
      replyTo: email || undefined,
      subject: `[KIM NGÂN STEEL] Yêu cầu báo giá mới từ ${fullName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: 0 auto; padding: 0; border: 1px solid #064e3b20; border-radius: 12px; overflow: hidden; color: #171717; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background-color: #043326; padding: 30px 24px; text-align: center;">
            <div style="color: #ea580c; font-size: 12px; font-weight: 700; letter-spacing: 3px; margin-bottom: 8px;">KIM NGÂN STEEL</div>
            <h2 style="margin: 0; color: #ffffff; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">YÊU CẦU BÁO GIÁ MỚI</h2>
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; width: 170px; color: #555;"><strong>Họ và tên</strong></td>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; color: #111; font-weight: 500;">${safeFullName}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; color: #555;"><strong>Số điện thoại</strong></td>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; font-weight: 700; color: #ea580c; font-size: 16px;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; color: #555;"><strong>Email</strong></td>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; color: #064e3b; font-weight: 500;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; color: #555;"><strong>Dự án / Công ty</strong></td>
                <td style="padding: 14px 0; border-bottom: 1px dashed #e5e5e5; color: #111;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 18px 0 10px; vertical-align: top; color: #555;"><strong>Nội dung yêu cầu</strong></td>
                <td style="padding: 18px 0 10px;"></td>
              </tr>
            </table>
            
            <div style="background-color: #fafafa; border-left: 4px solid #064e3b; padding: 16px; margin-top: 4px; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.6; color: #333;">
              ${safeMessage}
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
            <p style="margin: 0; font-size: 12px; color: #888;">
              Email này được tự động gửi từ hệ thống website <strong style="color: #064e3b;">Kim Ngân Steel</strong>.<br/>
              Vui lòng phản hồi sớm cho khách hàng để đạt tỷ lệ chốt cao nhất!
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Contact email error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "EAUTH"
    ) {
      return NextResponse.json(
        { error: "Email gửi chưa dùng Gmail App Password. Vui lòng kiểm tra cấu hình EMAIL_PASS." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Không thể gửi email. Vui lòng thử lại sau hoặc gọi hotline." },
      { status: 500 }
    );
  }
}
