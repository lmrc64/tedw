"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./products-table";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/interfaces/ToastNotification";


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
  visible: boolean;
}

async function getProducts(userId: string, search: string, offset: number, visibility: string) {
  
  const response = await fetch(
    process.env.API_ROUTE +
      `/products/user/${userId}/${visibility}?q=${search}&offset=${offset}&limit=5`
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
  const [modalVisible, setModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [visibility, setVisibility] = useState<string>("true");

  const [search, setSearch] = useState<string>(""); // Estado de búsqueda
  const [offset, setOffset] = useState(0);
  const user = sessionStorage.getItem("id");
  
  useEffect(() => {
    if(visibility=="true") sessionStorage.setItem("visibility", "True")
    else  sessionStorage.setItem("visibility", "False")
    if (user) {
      const fetchProducts = async () => {
        try {
          const { products, newOffset, totalProducts } = await getProducts(
            user,
            search,
            offset,
            visibility
          );
          const mappedProducts = products.map((p: Product) => ({
            ...p,
            id: p._id,
          }));
          setProducts(mappedProducts);
          setNewOffset(newOffset);
          setTotalProducts(totalProducts);
        } catch (error: any) {
          //setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [user, search, offset, visibility]);

  function handlePrevPage(event: React.MouseEvent) {
    event.preventDefault();
    if (offset > 0) {
      setOffset(offset - 5);
    }
  }

  function handleNextPage(event: React.MouseEvent) {
    event.preventDefault();
    if (offset + 5 < totalProducts) {
      setOffset(offset + 5);
    }
  }

  function handleSearch(query: string) {
    setSearch(query);
    setOffset(0);
  }

  const handleDeleteRequest = (productId: string) => {
    setProductIdToDelete(productId);
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    let visible
    if(visibility=="true") visible = false
    else  visible = true
    if (productIdToDelete) {
      try {
        const response = await fetch(
          `${process.env.API_ROUTE}/products/${productIdToDelete}/visibility`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ visible: visible }),
          }
        );

        if (!response.ok) {
          //throw new Error("Failed to update visibility");
        }

        const updatedProduct = await response.json();
        setProducts((prev) =>
          prev.map((p) =>
            p._id === productIdToDelete
              ? { ...p, visible: updatedProduct.visible }
              : p
          )
        );
        setOffset(0);
        setVisibility(""+visible);
        closeModal();
        let idea = sessionStorage.getItem("visibility") === "True" ? "not" : ""
        
        showToast("Product are " + idea + " visible now!!!", "default");

      } catch (error: any) {
        console.error("Error updating product visibility:", error.message);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setProductIdToDelete(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
        >
          <div className="relative bg-white rounded-lg shadow-lg p-5 w-96">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900"
            >
              <span className="sr-only">Close modal</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              <h3 className="mb-4 text-lg font-medium text-gray-700">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 text-white bg-red-600 rounded-lg hover:bg-red-800"
                >
                  Yes, delete
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer pauseOnFocusLoss={false} />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setVisibility("true")}>Active</TabsTrigger>
            <TabsTrigger value="archived" onClick={() => setVisibility("false")} >Archived</TabsTrigger>
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
            onDelete={handleDeleteRequest}
            products={products}
            totalProducts={totalProducts}
            offset={offset}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onSearch={handleSearch}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ProductsTable
            onDelete={handleDeleteRequest}
            products={products}
            totalProducts={totalProducts}
            offset={offset}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onSearch={handleSearch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
