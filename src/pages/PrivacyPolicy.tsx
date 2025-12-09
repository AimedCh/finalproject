import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad - Emprendedor Multidisciplinario</title>
        <meta name="description" content="Política de privacidad de Emprendedor Multidisciplinario" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Responsable del Tratamiento</h2>
                <p className="text-gray-700 leading-relaxed">
                  De conformidad con la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de derechos digitales (LOPD), el responsable del tratamiento de sus datos personales es:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                  <li><strong>Titular:</strong> Aimed Dine Chebili</li>
                  <li><strong>Email:</strong> chebiliaimed9@gmail.com</li>
                  <li><strong>Ubicación:</strong> Alicante, España</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Datos Personales Recopilados</h2>
                <p className="text-gray-700 leading-relaxed">
                  Recopilamos los siguientes datos personales:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección postal</li>
                  <li>Información de pago</li>
                  <li>Datos de navegación y cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Finalidad del Tratamiento</h2>
                <p className="text-gray-700 leading-relaxed">
                  Sus datos personales se utilizan para:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                  <li>Procesar sus pedidos y reservas</li>
                  <li>Enviar confirmaciones y actualizaciones</li>
                  <li>Responder a sus consultas</li>
                  <li>Mejorar nuestros servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Base Legal</h2>
                <p className="text-gray-700 leading-relaxed">
                  El tratamiento de sus datos se basa en:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                  <li>Su consentimiento explícito</li>
                  <li>La ejecución de un contrato</li>
                  <li>Cumplimiento de obligaciones legales</li>
                  <li>Intereses legítimos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Derechos del Usuario</h2>
                <p className="text-gray-700 leading-relaxed">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                  <li>Acceder a sus datos personales</li>
                  <li>Rectificar datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Limitar el tratamiento</li>
                  <li>Portabilidad de datos</li>
                  <li>Oponerse al tratamiento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Seguridad de Datos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Implementamos medidas técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  Este sitio web utiliza cookies para mejorar la experiencia del usuario. Consulte nuestra Política de Cookies para más información.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contacto</h2>
                <p className="text-gray-700 leading-relaxed">
                  Para ejercer sus derechos o si tiene preguntas sobre esta política, contacte a:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> chebiliaimed9@gmail.com</p>
                  <p className="text-gray-700"><strong>Ubicación:</strong> Alicante, España</p>
                </div>
              </section>

              <div className="border-t pt-8 mt-8">
                <p className="text-gray-600 text-sm">
                  Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

