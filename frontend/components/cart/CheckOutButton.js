import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import ShippingAddressForm from "./ShippingAddressForm";
import BillingAddressForm from "./BillingAddressForm";
import PaymentMethod from "./PayMethod";
import { useCartContext  } from "@/context/Store";
import { ToastContainer, toast, Flip } from "react-toastify";
import { showToast } from "@/components/interfaces/ToastNotification";
import { useClearCartContext } from "@/context/Store"; 

function CheckOutButton({ disabled }) {
  const cart = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    name: "",
    phone: "",
    company: "",
    mail: "",
  });
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const clearCart  = useClearCartContext();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  //Calcular Subtotal
  useEffect(() => {
    if (cart && cart.length > 0) {
      setSubtotal(
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    } else {
      setSubtotal(0);
    }
  }, [cart]);

  //Validación
  const validateFields = () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      return "Please, fill in all fields of the shipping address.";
    }
    if (isNaN(shippingAddress.zipCode)) return "Shipping address zip code must be numeric.";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (billingAddress.mail && !emailRegex.test(billingAddress.mail)) return "Please, enter a valid email address.";
    const phoneRegex = /^[0-9]{10}$/; 
    if (billingAddress.phone && !phoneRegex.test(billingAddress.phone)) return "Please, enter a valid phone number (10 digits).";
    
    if (!paymentMethod) return "Please, add a method of payment.";

    if (isBillingSameAsShipping) {
      if (!billingAddress.name || !billingAddress.phone || !billingAddress.mail || !billingAddress.street || !billingAddress.city || !billingAddress.state || !billingAddress.zipCode) return "Please, complete all billing address fields.";
      if (isNaN(billingAddress.zipCode)) return "Billing address zip code must be numeric.";
    }
    return null;
  };

  // Evento al confirmar el pedido
  const handleCreate = (e) => {
    e.preventDefault();
    const shippingAddressString = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}`;
    const validationError = validateFields();
    if (validationError) {
      showToast(validationError, "warn");
      return; 
    }
    const orderDetails = {
      user: sessionStorage.getItem("id"),
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      coupons: coupon || null,
      subtotal: subtotal,
      total: total,
      address: shippingAddressString,
      paymentMethod: paymentMethod,
      delivery_date: new Date().toISOString(),
    };
    if (isBillingSameAsShipping) {
      const billingAddressString = `${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.zipCode}`;
      orderDetails.billaddress = billingAddressString;
      orderDetails.billname = billingAddress.name;
      orderDetails.billphone = billingAddress.phone;
      orderDetails.billemail = billingAddress.mail;
      orderDetails.billcompany = billingAddress.company;
    }
    //console.log(orderDetails);
    createOrder(orderDetails);
    closeModal();
  };
  // Evento Fetch
  const createOrder = async (orderDetails) => {
    try {
      const response = await fetch(process.env.API_ROUTE + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Order created successfully:", data);
        console.log(clearCart); // Verifica si la función clearCart está disponible
          if (clearCart) {
            clearCart(); // Limpiar el carrito
          } else {
            //console.error("clearCart no está disponible");
          }
        showToast("Order created successfully!!!", "success");
      } else {
        const error = await response.json();
        //console.error("Error creating order:", error);
        showToast("So sorry, an error occurred while creating your order", "error");
      }
    } catch (err) {
      showToast("So sorry, an error occurred while creating your order", "error");
      //console.error("Error:", err);
    }
  };

  return (
    <div>
      <ToastContainer pauseOnFocusLoss={false} />
      <button
        aria-label="checkout-products"
        className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
        focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 
        disabled:from-purple-100 disabled:via-purple-200 disabled:to-purple-100   "
        onClick={openModal}
        disabled={disabled}
      >
        Check Out
        <FontAwesomeIcon icon={faArrowRight} className="w-4 ml-2 inline-flex" />
      </button>

      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        <form onSubmit={handleCreate}>
          <ShippingAddressForm
            shippingAddress={shippingAddress}
            handleShippingChange={(e) => {
              const { name, value } = e.target;
              setShippingAddress((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <PaymentMethod
            paymentMethod={paymentMethod}
            handlePaymentMethodChange={handlePaymentMethodChange}
          />

          <br></br>
          {/* Checkbox para dirección de facturación */}
          <div className="mb-4">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isBillingSameAsShipping}
                onChange={(e) => setIsBillingSameAsShipping(e.target.checked)}
                className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="flex ml-2 text-palette-primary">
                Make a bill
              </span>
            </label>
          </div>

          {isBillingSameAsShipping && (
            <BillingAddressForm
              billingAddress={billingAddress}
              handleBillingChange={(e) => {
                const { name, value } = e.target;
                setBillingAddress((prev) => ({ ...prev, [name]: value }));
              }}
            />
          )}
          <button
            type="submit"
            className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
          >
            Confirm Order
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default CheckOutButton;
//<button type="button" 

