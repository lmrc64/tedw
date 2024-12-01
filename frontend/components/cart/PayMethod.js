import React from "react";

function PaymentMethod({ handlePaymentMethodChange, paymentMethod }) {
    return (
        <div className="mt-3">
            <div className="grid grid-cols-2 gap-4">
                {/* Visa Tab */}
                <div
                    className={`flex justify-center items-center p-4 border-2 rounded-lg transition ${
                        paymentMethod === "Visa"
                            ? "border-palette-primary bg-gray-100"
                            : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodChange("Visa")}
                >
                    <img
                        src="https://i.imgur.com/sB4jftM.png"
                        width="80"
                        alt="Visa"
                    />
                </div>

                {/* PayPal Tab */}
                <div
                    className={`flex justify-center items-center p-4 border-2 rounded-lg transition ${
                        paymentMethod === "Paypal"
                            ? "border-palette-primary bg-gray-100"
                            : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodChange("Paypal")}
                >
                    <img
                        src="https://i.imgur.com/yK7EDD1.png"
                        width="80"
                        alt="PayPal"
                    />
                </div>
            </div>
        </div>
    );
}

export default PaymentMethod;
