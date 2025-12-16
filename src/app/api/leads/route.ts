import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Lead } from '@/models';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const { name, phone, academyName, region, message } = body;

        // Validation
        if (!name || !phone || !academyName || !region) {
            return NextResponse.json(
                { error: '필수 항목을 모두 입력해주세요.' },
                { status: 400 }
            );
        }

        // Save to DB
        const lead = await Lead.create({
            name,
            phone,
            academyName,
            region,
            message,
        });

        // Send Email Notification
        // Note: User needs to configure env vars for this to work
        if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: 'inkbook84@gmail.com',
                subject: `[신규 가맹 문의] ${academyName} - ${name} 원장님`,
                text: `
                신규 가맹 문의가 접수되었습니다.

                - 학원명: ${academyName}
                - 원장명: ${name}
                - 연락처: ${phone}
                - 지역: ${region}
                - 메시지: ${message || '없음'}
                
                관리자 페이지에서 확인하세요.
            `,
            };

            try {
                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Don't fail the request if email fails, but log it
            }
        }

        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error) {
        console.error('Lead submission error:', error);
        return NextResponse.json(
            { error: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.' },
            { status: 500 }
        );
    }
}
