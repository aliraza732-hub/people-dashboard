import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}