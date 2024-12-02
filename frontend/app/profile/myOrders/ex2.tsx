<div className="p-4 md:p-5 text-center">
<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
  Order Details
</h3>
{/* Detalles de la orden */}
<div className="space-y-4">
  {/* Usuario y correo */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      User
    </label>
    <p>{selectedOrder.user}</p>
    <label className="block text-sm font-medium text-gray-700">
      Email
    </label>
    <p>{selectedOrder.email}</p>
  </div>

  {/* Productos y cantidad */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Product Count
    </label>
    <p>{selectedOrder.productCount}</p>
  </div>

  {/* Fecha de entrega */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Delivery Date
    </label>
    <p>{selectedOrder.deliveryDate}</p>
  </div>

  {/* Total */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Total
    </label>
    <p>${selectedOrder.total}</p>
  </div>

  {/* Método de pago */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Payment Method
    </label>
    <p>{selectedOrder.paymentMethod}</p>
  </div>

  {/* Estado de la orden */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Status
    </label>
    <p>{selectedOrder.orderStatus}</p>
  </div>
</div>

<div className="mt-4">
  <button
    onClick={closeModal}
    className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-5 py-2.5 rounded-lg"
  >
    Close
  </button>
</div>
</div>