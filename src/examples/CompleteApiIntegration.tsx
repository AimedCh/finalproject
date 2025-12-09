import { useState } from 'react';
import { useApi } from '../hooks/useApi';

/**
 * EJEMPLO COMPLETO: Sistema de Gestión de Órdenes
 * 
 * Este ejemplo muestra cómo usar useApi en un componente completo
 * que maneja múltiples operaciones (GET, POST, PUT, DELETE)
 */

interface Order {
  id: number;
  purchase_number: string;
  customer_name: string;
  total_amount: number;
  order_status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
}

interface CreateOrderPayload {
  customer_name: string;
  customer_email: string;
  quantity: number;
  total_amount: number;
}

export function OrderManagementSystem() {
  // Estado local
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Hook para obtener lista de órdenes
  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
    fetch: refreshOrders,
  } = useApi<Order[]>('/airpods/orders', { autoFetch: true });

  // Hook para obtener detalles de una orden
  const {
    data: selectedOrder,
    loading: orderDetailLoading,
    error: orderDetailError,
    fetch: fetchOrderDetail,
  } = useApi<Order>(
    selectedOrderId ? `/airpods/orders/${selectedOrderId}` : '',
    { autoFetch: !!selectedOrderId }
  );

  // Hook para crear una nueva orden
  const {
    data: newOrder,
    loading: createLoading,
    error: createError,
    fetch: createOrder,
  } = useApi<Order>('/airpods/orders', {
    autoFetch: false,
    method: 'POST',
  });

  // Hook para actualizar estado de orden
  const {
    loading: updateLoading,
    error: updateError,
    fetch: updateOrderStatus,
  } = useApi<Order>('', {
    autoFetch: false,
    method: 'PUT',
  });

  // Hook para eliminar una orden
  const {
    loading: deleteLoading,
    error: deleteError,
    fetch: deleteOrder,
  } = useApi<{ message: string }>('', {
    autoFetch: false,
    method: 'DELETE',
  });

  // Manejadores de eventos
  const handleSelectOrder = (orderId: number) => {
    setSelectedOrderId(orderId);
    fetchOrderDetail();
  };

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: CreateOrderPayload = {
      customer_name: formData.get('customer_name') as string,
      customer_email: formData.get('customer_email') as string,
      quantity: parseInt(formData.get('quantity') as string),
      total_amount: parseFloat(formData.get('total_amount') as string),
    };

    const result = await createOrder({ body: payload });
    if (result) {
      setShowCreateForm(false);
      refreshOrders();
      (e.target as HTMLFormElement).reset();
    }
  };

  const handleUpdateStatus = async (orderId: number, newStatus: Order['order_status']) => {
    await updateOrderStatus({
      body: { order_status: newStatus },
    });
    refreshOrders();
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      await deleteOrder();
      refreshOrders();
      setSelectedOrderId(null);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>📦 Sistema de Gestión de Órdenes</h1>

      {/* Sección de Órdenes */}
      <section style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Mis Órdenes</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {showCreateForm ? 'Cancelar' : '+ Nueva Orden'}
          </button>
        </div>

        {/* Formulario de Creación */}
        {showCreateForm && (
          <form
            onSubmit={handleCreateOrder}
            style={{
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <label>Nombre del Cliente:</label>
              <input
                type="text"
                name="customer_name"
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Email:</label>
              <input
                type="email"
                name="customer_email"
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Cantidad:</label>
              <input
                type="number"
                name="quantity"
                min="1"
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Monto Total:</label>
              <input
                type="number"
                name="total_amount"
                step="0.01"
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <button
              type="submit"
              disabled={createLoading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {createLoading ? 'Creando...' : 'Crear Orden'}
            </button>

            {createError && <p style={{ color: 'red', marginTop: '10px' }}>Error: {createError}</p>}
            {newOrder && (
              <p style={{ color: 'green', marginTop: '10px' }}>
                ✅ Orden creada: {newOrder.purchase_number}
              </p>
            )}
          </form>
        )}

        {/* Lista de Órdenes */}
        {ordersLoading && <p>Cargando órdenes...</p>}
        {ordersError && <p style={{ color: 'red' }}>Error: {ordersError}</p>}

        {orders && orders.length > 0 ? (
          <div style={{ display: 'grid', gap: '10px' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleSelectOrder(order.id)}
                style={{
                  padding: '15px',
                  border: selectedOrderId === order.id ? '2px solid #007bff' : '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: selectedOrderId === order.id ? '#e7f3ff' : 'white',
                }}
              >
                <p>
                  <strong>Orden:</strong> {order.purchase_number}
                </p>
                <p>
                  <strong>Cliente:</strong> {order.customer_name}
                </p>
                <p>
                  <strong>Monto:</strong> ${order.total_amount.toFixed(2)}
                </p>
                <p>
                  <strong>Estado:</strong> {order.order_status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay órdenes disponibles</p>
        )}
      </section>

      {/* Detalles de Orden Seleccionada */}
      {selectedOrderId && (
        <section style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '4px' }}>
          <h2>Detalles de la Orden</h2>

          {orderDetailLoading && <p>Cargando detalles...</p>}
          {orderDetailError && <p style={{ color: 'red' }}>Error: {orderDetailError}</p>}

          {selectedOrder && (
            <div>
              <p>
                <strong>Número de Compra:</strong> {selectedOrder.purchase_number}
              </p>
              <p>
                <strong>Cliente:</strong> {selectedOrder.customer_name}
              </p>
              <p>
                <strong>Monto Total:</strong> ${selectedOrder.total_amount.toFixed(2)}
              </p>
              <p>
                <strong>Estado Actual:</strong> {selectedOrder.order_status}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}
              </p>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <select
                  onChange={(e) =>
                    handleUpdateStatus(selectedOrder.id, e.target.value as Order['order_status'])
                  }
                  disabled={updateLoading}
                  style={{ padding: '8px' }}
                >
                  <option value="">Cambiar estado...</option>
                  <option value="pending">Pendiente</option>
                  <option value="processing">Procesando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                </select>

                <button
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                  disabled={deleteLoading}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {deleteLoading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>

              {updateError && <p style={{ color: 'red', marginTop: '10px' }}>Error: {updateError}</p>}
              {deleteError && <p style={{ color: 'red', marginTop: '10px' }}>Error: {deleteError}</p>}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default OrderManagementSystem;

