import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// POST create a user
export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: { name, email }
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}