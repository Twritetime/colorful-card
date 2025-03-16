import { Language } from "@/contexts/LanguageContext";

// 翻译数据类型
export type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// 翻译数据
export const translations: Translations = {
  en: {
    // 导航
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.language': 'Language',
    'nav.close': 'Close menu',
    
    // 首页
    'home.hero.title': 'High-Quality Cards & Gifts <span class="text-primary">Solutions</span> for Global Business',
    'home.hero.description': 'Colorful Card Ltd. provides high-quality customized cards, packaging, and gift solutions for businesses worldwide.',
    'home.hero.browse': 'Browse Products',
    'home.hero.contact': 'Contact Us',
    
    // 页脚
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.products': 'Products',
    'footer.business': 'Business Cards',
    'footer.greeting': 'Greeting Cards',
    'footer.gift': 'Gift Cards',
    'footer.address': 'Address: XXX Building, Bao\'an District, Shenzhen',
    'footer.phone': 'Phone: +86 755-XXXX-XXXX',
    'footer.email': 'Email: info@colorfulcard.com',
    
    // 产品
    'products.title': 'Our Products',
    'products.search': 'Search products...',
    'products.empty': 'No products found matching your criteria',
    'products.loading': 'Loading...',
    'products.stock': 'Stock',
    'products.all': 'All',
    'products.category.business': 'Business Cards',
    'products.category.greeting': 'Greeting Cards',
    'products.category.gift': 'Gift Cards',
    'products.category.invitation': 'Invitation Cards',
    
    // 产品详情
    'product.features': 'Product Features',
    'product.specs': 'Specifications',
    'product.related': 'Related Products',
    'product.customize': 'Customize Your Order',
    'product.stock.status': 'Stock Status',
    'product.stock.available': 'In Stock',
    'product.stock.unavailable': 'Out of Stock',
    'product.getQuote': 'Get a Quote',
    'product.contact': 'Contact Us',
    'product.back': 'Back to Products',
    'product.notFound': 'Product not found',
    'product.uncategorized': 'Uncategorized',
    'product.type': 'Product Type',
    'product.price': 'Price',
    'product.createdAt': 'Created At',
    'product.updatedAt': 'Updated At',
    
    // 类别
    'categories.title': 'Product Categories',
    'categories.add': 'Add Category',
    'categories.edit': 'Edit Category',
    'categories.delete': 'Delete Category',
    'categories.name': 'Category Name',
    'categories.description': 'Description',
    'categories.slug': 'Slug',
    'categories.parent': 'Parent Category',
    'categories.none': 'None',
    'categories.icon': 'Icon',
    'categories.image': 'Image',
    'categories.order': 'Display Order',
    'categories.actions': 'Actions',
    'categories.confirm.delete': 'Are you sure you want to delete this category?',
    'categories.success.create': 'Category created successfully',
    'categories.success.update': 'Category updated successfully',
    'categories.success.delete': 'Category deleted successfully',
    'categories.error.create': 'Failed to create category',
    'categories.error.update': 'Failed to update category',
    'categories.error.delete': 'Failed to delete category',
    'categories.loading': 'Loading categories...',
    'categories.empty': 'No categories found',

    // 用户
    'user.login': 'Login',
    'user.logout': 'Logout',
    'user.profile': 'Profile',
    
    // 主题
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.dashboard': '仪表板',
    'nav.login': '登录',
    'nav.logout': '退出登录',
    'nav.language': '语言',
    'nav.close': '关闭菜单',
    
    // 首页
    'home.hero.title': '高品质卡片与礼品<span class="text-primary">解决方案</span>，服务全球商务',
    'home.hero.description': '彩卡有限公司为全球企业提供高质量定制卡片、包装和礼品解决方案。',
    'home.hero.browse': '浏览产品',
    'home.hero.contact': '联系我们',
    
    // 页脚
    'footer.rights': '版权所有',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.contact': '联系我们',
    'footer.company': '公司',
    'footer.about': '关于我们',
    'footer.products': '产品',
    'footer.business': '商务名片',
    'footer.greeting': '贺卡',
    'footer.gift': '礼品卡',
    'footer.address': '地址：深圳市宝安区XXX大厦',
    'footer.phone': '电话：+86 755-XXXX-XXXX',
    'footer.email': '邮箱：info@colorfulcard.com',
    
    // 产品
    'products.title': '我们的产品',
    'products.search': '搜索产品...',
    'products.empty': '没有找到匹配的产品',
    'products.loading': '加载中...',
    'products.stock': '库存',
    'products.all': '全部',
    'products.category.business': '名片',
    'products.category.greeting': '贺卡',
    'products.category.gift': '礼品卡',
    'products.category.invitation': '邀请卡',
    
    // 产品详情
    'product.features': '产品特点',
    'product.specs': '产品规格',
    'product.related': '相关产品',
    'product.customize': '定制您的订单',
    'product.stock.status': '库存状态',
    'product.stock.available': '有货',
    'product.stock.unavailable': '缺货',
    'product.getQuote': '获取报价',
    'product.contact': '联系我们',
    'product.back': '返回产品列表',
    'product.notFound': '产品不存在',
    'product.uncategorized': '未分类',
    'product.type': '产品类型',
    'product.price': '价格',
    'product.createdAt': '创建时间',
    'product.updatedAt': '更新时间',
    
    // 类别
    'categories.title': '产品类别',
    'categories.add': '添加类别',
    'categories.edit': '编辑类别',
    'categories.delete': '删除类别',
    'categories.name': '类别名称',
    'categories.description': '描述',
    'categories.slug': '别名',
    'categories.parent': '父类别',
    'categories.none': '无',
    'categories.icon': '图标',
    'categories.image': '图片',
    'categories.order': '显示顺序',
    'categories.actions': '操作',
    'categories.confirm.delete': '确定要删除此类别吗？',
    'categories.success.create': '类别创建成功',
    'categories.success.update': '类别更新成功',
    'categories.success.delete': '类别删除成功',
    'categories.error.create': '创建类别失败',
    'categories.error.update': '更新类别失败',
    'categories.error.delete': '删除类别失败',
    'categories.loading': '正在加载类别...',
    'categories.empty': '未找到类别',
    
    // 用户
    'user.login': '登录',
    'user.logout': '退出登录',
    'user.profile': '个人资料',
    
    // 主题
    'theme.light': '亮色',
    'theme.dark': '暗色',
    'theme.system': '系统',
  }
}; 