"use client";

import { useState, useEffect } from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllProducts } from '@/lib/productService';
import { getAllCategories } from '@/lib/categoryService';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    product: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 在实际应用中，这里应该调用API提交表单
      console.log("Form submitted:", formData);
      
      // 重置表单
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        product: "",
      });
      
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(language === 'en' ? "An error occurred when submitting the form. Please try again later." : "提交表单时出错，请稍后再试。");
      console.error("表单提交错误:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理类别变化
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      setFilteredProducts(products.filter(product => product.category === categoryId));
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          {language === 'en' ? "Contact Us" : "联系我们"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === 'en'
            ? "Whether you have questions, need a quote, or want to learn more about our products, we're here to help."
            : "无论您有任何问题、需要报价或希望了解更多关于我们产品的信息，我们都很乐意为您提供帮助。"
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* 联系信息 */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold mb-6">
              {language === 'en' ? "Contact Information" : "联系方式"}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium">
                    {language === 'en' ? "Phone" : "电话"}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    +86 755-1234-5678
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {language === 'en' ? "Mon-Fri: 9:00 AM - 6:00 PM" : "周一至周五: 9:00 - 18:00"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium">
                    {language === 'en' ? "Email" : "电子邮件"}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    info@colorfulcard.com
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {language === 'en' ? "Business Cooperation: sales@colorfulcard.com" : "业务合作: sales@colorfulcard.com"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium">
                    {language === 'en' ? "Address" : "地址"}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {language === 'en' ? "Xixiang Street, Bao'an District" : "广东省深圳市宝安区西乡街道"}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {language === 'en' ? "Colorful Card Building, 15th Floor, No.88 Chuangye Road, Shenzhen, China" : "创业路88号彩卡大厦15楼"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3">
                {language === 'en' ? "Social Media" : "社交媒体"}
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* 地图 */}
          <div className="mt-8 h-64 md:h-80 bg-muted rounded-lg border border-border overflow-hidden">
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">
                {language === 'en' ? "Loading map..." : "地图加载中..."}
              </p>
              {/* 实际应用中，这里可以嵌入Google Maps或百度地图 */}
            </div>
          </div>
        </div>
        
        {/* 联系表单 */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold mb-6">
              {language === 'en' ? "Send an Inquiry" : "发送询价"}
            </h2>
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {language === 'en' ? "Submission Successful" : "提交成功"}
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        {language === 'en' 
                          ? "Thank you for your inquiry! Our team will contact you shortly."
                          : "感谢您的询价！我们的团队将尽快与您联系。"
                        }
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        {language === 'en' ? "Send New Inquiry" : "发送新询价"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {language === 'en' ? "Submission Error" : "提交出错"}
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{submitError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                      {language === 'en' ? "Name" : "姓名"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                      {language === 'en' ? "Email" : "电子邮箱"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium">
                      {language === 'en' ? "Company Name" : "公司名称"}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium">
                      {language === 'en' ? "Phone" : "电话"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="product" className="block text-sm font-medium">
                    {language === 'en' ? "Product Interest" : "感兴趣的产品"}
                  </label>
                  <div className="space-y-4">
                    <select
                      id="category"
                      name="category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <option value="">{t('contact.allCategories')}</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <option value="">{t('contact.selectProduct')}</option>
                      {filteredProducts.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium">
                    {language === 'en' ? "Message" : "留言"} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    placeholder={language === 'en' ? "Please describe your requirements..." : "请描述您的需求..."}
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-primary rounded-lg hover:bg-primary/90 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {language === 'en' ? "Submitting..." : "提交中..."}
                      </>
                    ) : (
                      language === 'en' ? "Submit Inquiry" : "提交询价"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* FAQ部分 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {language === 'en' ? "Frequently Asked Questions" : "常见问题"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-3">
              {language === 'en' ? "What is the minimum order quantity?" : "最小起订量是多少？"}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en'
                ? "Different products have different minimum order quantities. Generally, business cards have a minimum order of 100 pieces, and greeting cards have a minimum order of 50 pieces. For detailed information, please check the product page or contact us directly."
                : "不同产品有不同的最小起订量。一般情况下，商务名片最小订单为100张，贺卡最小订单为50张。详细信息请查看产品页面或直接联系我们。"
              }
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-3">
              {language === 'en' ? "Can samples be provided?" : "能否提供样品？"}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en'
                ? "Yes, we can provide samples before formal orders. Sample costs will vary depending on the product type and complexity, and can be partially deducted from subsequent large orders."
                : "是的，我们可以在正式订单前提供样品。样品费用将根据产品类型和复杂程度而定，并且在后续大订单中可部分抵扣。"
              }
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-3">
              {language === 'en' ? "What design file formats do you support?" : "支持哪些设计文件格式？"}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en'
                ? "We accept design files in AI, PSD, PDF, CDR and other formats. If you don't have design files, our design team can also provide design services based on your requirements."
                : "我们接受AI、PSD、PDF、CDR等格式的设计文件。如果您没有设计文件，我们的设计团队也可以根据您的需求提供设计服务。"
              }
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium mb-3">
              {language === 'en' ? "How long does it take to receive products?" : "大概需要多长时间可以收到产品？"}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en'
                ? "The production cycle for standard orders is usually 5-10 working days, depending on the product type and order quantity. Rush services are also available, but may require additional fees."
                : "标准订单的生产周期通常为5-10个工作日，具体取决于产品类型和订单数量。加急服务也可提供，但可能需要额外费用。"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 