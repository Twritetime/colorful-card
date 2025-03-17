"use client";

import { useState } from 'react';

export default function RedeployButton() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<{success?: boolean; message?: string} | null>(null);
  
  const handleRedeploy = async () => {
    if (isDeploying) return;
    
    setIsDeploying(true);
    setDeployStatus(null);
    
    try {
      const response = await fetch('/api/redeploy');
      const data = await response.json();
      
      setDeployStatus({
        success: data.success,
        message: data.success 
          ? `部署已触发成功！部署ID: ${data.deploymentId || 'unknown'}` 
          : `部署失败: ${data.message}`
      });
    } catch (error) {
      setDeployStatus({
        success: false,
        message: `触发部署出错: ${error}`
      });
    } finally {
      setIsDeploying(false);
    }
  };
  
  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">网站部署控制</h2>
      <p className="mb-4 text-gray-600">
        更新数据后，点击下面的按钮触发网站重新部署，使变更生效
      </p>
      
      <button 
        onClick={handleRedeploy}
        disabled={isDeploying}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isDeploying ? '部署中...' : '重新部署网站'}
      </button>
      
      {deployStatus && (
        <div className={`mt-4 p-3 rounded ${deployStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {deployStatus.message}
        </div>
      )}
    </div>
  );
} 