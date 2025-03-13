import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Colorful Card</h3>
            <p className="text-sm text-muted-foreground">
              深圳市彩卡科技有限公司 - 专业的智能卡、RFID标签、PVC卡片制造商
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">产品</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/rfid-cards"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  RFID卡
                </Link>
              </li>
              <li>
                <Link
                  href="/products/pvc-cards"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  PVC卡
                </Link>
              </li>
              <li>
                <Link
                  href="/products/nfc-tags"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  NFC标签
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">关于</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  公司简介
                </Link>
              </li>
              <li>
                <Link
                  href="/about/factory"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  工厂展示
                </Link>
              </li>
              <li>
                <Link
                  href="/about/certificates"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  资质证书
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                地址: 深圳市宝安区
              </li>
              <li className="text-sm text-muted-foreground">
                电话: +86 123 4567 8910
              </li>
              <li className="text-sm text-muted-foreground">
                邮箱: info@colorfulcard.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Colorful Card. 保留所有权利。
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 