import { NextRequest, NextResponse } from 'next/server';

// Vercel Deploy Hook URL
const DEPLOY_HOOK_URL = 'https://api.vercel.com/v1/integrations/deploy/prj_EeVz83Ew8k82vyl9uRKGX2fWYCqs/NSM7Z5B7wm';

export async function GET(request: NextRequest) {
  try {
    // 触发Vercel部署钩子
    const response = await fetch(DEPLOY_HOOK_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Deploy failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Deployment triggered successfully', 
      deploymentId: result.job?.id || 'unknown',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Redeploy error:', error);
    return NextResponse.json({ 
      success: false, 
      message: String(error) 
    }, { status: 500 });
  }
} 