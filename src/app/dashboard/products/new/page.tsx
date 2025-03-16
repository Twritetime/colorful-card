import ProductForm from "@/components/dashboard/products/ProductForm";

export default function NewProductPage() {
  // 在实际应用中，这些数据应该从数据库中获取
  const categories = [
    { id: "1", name: "Business Cards", slug: "business-cards" },
    { id: "2", name: "Gift Cards", slug: "gift-cards" },
    { id: "3", name: "Greeting Cards", slug: "greeting-cards" },
    { id: "4", name: "Packaging", slug: "packaging" },
    { id: "5", name: "Membership Cards", slug: "membership-cards" },
    { id: "6", name: "Custom Printing", slug: "custom-printing" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product to add to your catalog
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
} 