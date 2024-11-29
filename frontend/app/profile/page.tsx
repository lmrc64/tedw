"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./products-table";
import Link from "next/link";
interface Product {
  _id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  stock: number;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}

async function getProducts(userId: string, search: string, offset: number) {
  const response = await fetch(
    process.env.API_ROUTE +`/products/user/${userId}?q=${search}&offset=${offset}&limit=5`
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const data = await response.json();

  return {
    products: data.products,
    newOffset: data.newOffset,
    totalProducts: data.totalProducts,
  };
}

export default function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newOffset, setNewOffset] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState(0);
  let user = sessionStorage.getItem("id");

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const { products, newOffset, totalProducts } = await getProducts(
            user,
            search,
            offset
          );
          const mappedProducts = products.map((p: Product) => ({
            ...p,
            id: p._id,
          }));
          setProducts(mappedProducts);
          setNewOffset(newOffset);
          setTotalProducts(totalProducts);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [user, search, offset]);

  function handlePrevPage() {
    if (offset > 0) {
      setOffset(offset - 5);
    }
  }

  function handleNextPage() {
    if (offset + 5 < totalProducts) {
      setOffset(offset + 5);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/profile/newProduct">
            <Button
              size="sm"
              className="h-8 gap-1 bg-purple-500 hover:bg-purple-900"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <TabsContent value="all">
        <ProductsTable
          products={products}
          totalProducts={totalProducts}
          offset={offset}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </TabsContent>
    </Tabs>
  );
}
