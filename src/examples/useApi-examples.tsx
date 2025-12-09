import { useApi } from '../hooks/useApi';
import { useEffect } from 'react';

/**
 * EJEMPLO 1: Obtener lista de productos (GET automático)
 */
export function ProductListExample() {
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }

  const { data: products, loading, error } = useApi<Product[]>(
    '/airpods/catalog',
    { autoFetch: true }
  );

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Catálogo de AirPods</h2>
      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * EJEMPLO 2: Crear una orden (POST manual)
 */
export function CreateOrderExample() {
  interface OrderData {
    customer_name: string;
    customer_email: string;
    quantity: number;
    total_amount: number;
  }

  interface OrderResponse {
    id: number;
    purchase_number: string;
    order_status: string;
  }

  const { data: order, loading, error, fetch } = useApi<OrderResponse>(
    '/airpods/order',
    { autoFetch: false, method: 'POST' }
  );

  const handleCreateOrder = async () => {
    const orderData: OrderData = {
      customer_name: 'Juan Pérez',
      customer_email: 'juan@example.com',
      quantity: 2,
      total_amount: 599.98,
    };

    await fetch({ body: orderData });
  };

  return (
    <div>
      <button onClick={handleCreateOrder} disabled={loading}>
        {loading ? 'Creando orden...' : 'Crear Orden'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {order && (
        <div style={{ color: 'green' }}>
          <p>✅ Orden creada exitosamente</p>
          <p>Número de compra: {order.purchase_number}</p>
          <p>Estado: {order.order_status}</p>
        </div>
      )}
    </div>
  );
}

/**
 * EJEMPLO 3: Rastrear orden (GET con parámetro dinámico)
 */
export function TrackOrderExample({ purchaseNumber }: { purchaseNumber: string }) {
  interface TrackingInfo {
    purchase_number: string;
    order_status: string;
    tracking_number: string;
    shipped_at: string;
    delivered_at: string | null;
  }

  const { data: tracking, loading, error, fetch } = useApi<TrackingInfo>(
    `/airpods/track/${purchaseNumber}`,
    { autoFetch: true }
  );

  if (loading) return <div>Rastreando orden...</div>;
  if (error) return <div>Error al rastrear: {error}</div>;

  return (
    <div>
      <h3>Estado de tu orden</h3>
      {tracking && (
        <div>
          <p>Número de compra: {tracking.purchase_number}</p>
          <p>Estado: {tracking.order_status}</p>
          <p>Número de seguimiento: {tracking.tracking_number}</p>
          <p>Enviado: {new Date(tracking.shipped_at).toLocaleDateString()}</p>
          {tracking.delivered_at && (
            <p>Entregado: {new Date(tracking.delivered_at).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * EJEMPLO 4: Formulario de contacto (POST con validación)
 */
export function ContactFormExample() {
  interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
    service: string;
  }

  interface ContactResponse {
    id: number;
    status: string;
    message: string;
  }

  const { data: response, loading, error, fetch } = useApi<ContactResponse>(
    '/contacto',
    { autoFetch: false, method: 'POST' }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const contactData: ContactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      service: formData.get('service') as string,
    };

    await fetch({ body: contactData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Tu nombre" required />
      <input type="email" name="email" placeholder="Tu email" required />
      <input type="text" name="subject" placeholder="Asunto" required />
      <textarea name="message" placeholder="Tu mensaje" required />
      <select name="service" required>
        <option value="">Selecciona un servicio</option>
        <option value="airpods">AirPods</option>
        <option value="alquileres">Alquileres</option>
        <option value="taller">Taller</option>
        <option value="general">General</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && <p style={{ color: 'green' }}>✅ {response.message}</p>}
    </form>
  );
}

/**
 * EJEMPLO 5: Actualizar datos (PUT)
 */
export function UpdateProfileExample({ userId }: { userId: number }) {
  interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
  }

  const { data: profile, loading, error, fetch } = useApi<UserProfile>(
    `/users/${userId}`,
    { autoFetch: true, method: 'GET' }
  );

  const handleUpdate = async (updatedData: Partial<UserProfile>) => {
    await fetch({
      method: 'PUT',
      body: updatedData,
    });
  };

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Mi Perfil</h3>
      {profile && (
        <div>
          <p>Nombre: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Teléfono: {profile.phone}</p>
          <p>Dirección: {profile.address}</p>

          <button
            onClick={() =>
              handleUpdate({
                name: 'Nuevo Nombre',
                phone: '+34 600 000 000',
              })
            }
          >
            Actualizar Perfil
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * EJEMPLO 6: Eliminar recurso (DELETE)
 */
export function DeleteItemExample({ itemId }: { itemId: number }) {
  const { loading, error, fetch } = useApi(
    `/items/${itemId}`,
    { autoFetch: false, method: 'DELETE' }
  );

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      await fetch();
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Eliminando...' : 'Eliminar'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

