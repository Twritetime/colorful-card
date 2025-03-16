import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function ProductsPage() {
  // 在实际应用中，这些数据应该从数据库中获取
  const products = [
    {
      id: "1",
      name: "Premium Business Card",
      description: "High-quality business cards with custom design",
      price: 49.99,
      images: ["https://images.unsplash.com/photo-1572502007796-bf53841bc530"],
      stock: 100,
      minOrder: 50,
      categoryId: "1",
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: "1",
        name: "Business Cards",
        slug: "business-cards",
      },
    },
    {
      id: "2",
      name: "Luxury Gift Card",
      description: "Elegant gift cards for special occasions",
      price: 29.99,
      images: ["https://images.unsplash.com/photo-1607344645866-009c320b63e0"],
      stock: 200,
      minOrder: 25,
      categoryId: "2",
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: "2",
        name: "Gift Cards",
        slug: "gift-cards",
      },
    },
    {
      id: "3",
      name: "Corporate Greeting Card",
      description: "Professional greeting cards for business communications",
      price: 19.99,
      images: ["https://images.unsplash.com/photo-1512909006721-3d6018887383"],
      stock: 150,
      minOrder: 20,
      categoryId: "3",
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: {
        id: "3",
        name: "Greeting Cards",
        slug: "greeting-cards",
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Product
        </Link>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6">
                  Product
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                  Price
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                  Stock
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      {product.images[0] && (
                        <div className="h-10 w-10 flex-shrink-0 rounded-md border overflow-hidden">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="font-medium text-foreground">{product.name}</div>
                        <div className="text-muted-foreground truncate max-w-[250px]">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="text-foreground">{product.category.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="text-foreground">${product.price.toFixed(2)}</div>
                    <div className="text-muted-foreground">min: {product.minOrder}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="text-foreground">{product.stock}</div>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="text-primary hover:text-primary/80"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 