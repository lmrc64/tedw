//import { CartProvider } from '@/context/Store'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <Nav />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
/*
return (
    <CartProvider>
      <div className="flex flex-col justify-between min-h-screen">
        <Nav />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
*/
