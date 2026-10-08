import { NextResponse } from 'next/server';
import { portfolioData } from '@/data/portfolio';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: portfolioData.projects.length,
    projects: portfolioData.projects,
  });
}
