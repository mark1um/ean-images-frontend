import { NextRequest, NextResponse } from 'next/server';

/**
 * Endpoint de health check
 * Retorna 200 OK para indicar que a aplicação está ativa
 * Útil para manter a aplicação acordada no Render
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 }
  );
}
