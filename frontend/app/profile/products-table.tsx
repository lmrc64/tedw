"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "./product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search";

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

type ProductTableProps = {
  products: Product[];
  totalProducts: number;
  offset: number;
  onPrevPage: (event: React.MouseEvent) => void;
  onNextPage: (event: React.MouseEvent) => void;
  onSearch: (query: string) => void;
  onDelete: (id: string) => void; 
};

export function ProductsTable({
  products,
  totalProducts,
  offset,
  onPrevPage,
  onNextPage,
  onSearch, 
  onDelete
}: ProductTableProps) {
  const productsPerPage = 5;
  const startIndex = offset;
  const endIndex = Math.min(offset + productsPerPage, totalProducts);

  return (
    <Card>
      <CardHeader>
        <SearchInput onSearch={onSearch}/>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product._id} product={product}   onDelete={onDelete}/>
            ))}         
          </TableBody>
        </Table>

      </CardContent>
      <CardFooter>
        <div className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {startIndex + 1}-{endIndex}
            </strong>{" "}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              onClick={onPrevPage}
              variant="ghost"
              size="sm"
              disabled={offset <= 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={onNextPage}
              variant="ghost"
              size="sm"
              disabled={offset + productsPerPage >= totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
