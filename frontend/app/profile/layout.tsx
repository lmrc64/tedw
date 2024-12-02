"use client"
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  Store,
  FileChartColumnIncreasing, 
  FilePlus ,
  Ticket  
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Providers from "./providers";
import { NavItem } from "./nav-item";
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = sessionStorage.getItem("admin");

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    if (userRole === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/profile"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-purple-700 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src={"/icon.svg"}
            width={40}
            height={40}
            alt="Icon"
            className="overflow-hidden rounded-full"
          />
        </Link>

        <NavItem href="/" label="Go to Store">
          <Store className="h-5 w-5" />
        </NavItem>

        <NavItem href="/profile/myOrders" label="My Orders">
          <ShoppingCart className="h-5 w-5" />
        </NavItem>

        <NavItem href="/profile" label="My Products">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/customers" label="My profile">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/profile/charts/routes" label="Charts">
          <LineChart className="h-5 w-5" />
        </NavItem>
        {/* Mostrar opciones adicionales si es administrador */}
        {isAdmin && (
          <>
            <NavItem href="/profile/charts/admin/routes" label="site Charts">
              <FileChartColumnIncreasing className="h-5 w-5" />
            </NavItem>
            <NavItem href="/profile/admin/vouchers" label="Vouche">
              <Ticket  className="h-5 w-5" />
            </NavItem>
            <NavItem href="/profile/admin/categories" label="Categories">
              <FilePlus  className="h-5 w-5" />
            </NavItem>
          </>
        )}
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <ToastContainer pauseOnFocusLoss={false} />
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-purple-700 text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Store</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Store className="h-5 w-5" />
            Go to Store
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            My Orders
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            My Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            My Profile
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Charts
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
