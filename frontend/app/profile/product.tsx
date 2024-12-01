import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from 'next/link';

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

interface ChildProps {
  onDelete: (id: string) => void; 
  product: Product;
}
  
export function Product({ onDelete, product }: ChildProps) {


  const handleDelete = () => {
    onDelete(product._id);
  };

  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={product.image[0].trim()}
            width="64"
          />
        </TableCell>
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {product.status}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
        <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
        <TableCell className="hidden md:table-cell">
          {new Date(product.createdAt).toLocaleDateString("es-ES")}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  href={`profile/editProduct/${product._id}`}
                  className="w-full block text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={handleDelete}
                  className="block text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {sessionStorage.getItem("visibility") === "True" ? "Delete Product" : "Restore Product"}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>


    </>
  );
}



