
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const validUsername = process.env.ADMIN_USERNAME || "admin";
        const validPassword = process.env.ADMIN_PASSWORD;

        if (!validPassword) {
            return new NextResponse("Server misconfigured: ADMIN_PASSWORD missing", { status: 500 });
        }

        if (username === validUsername && password === validPassword) {
            return NextResponse.json({ success: true });
        }

        return new NextResponse("Invalid credentials", { status: 401 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
