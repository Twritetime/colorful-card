import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  // 在实际应用中，您可以从数据库或API获取产品信息
  return {
    title: `产品详情 #${params.id}`,
    description: "查看和编辑产品详情",
  };
}; 