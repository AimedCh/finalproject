import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const LegalNotice: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Aviso Legal - Emprendedor Multidisciplinario</title>
        <meta name="description" content="Aviso legal de Emprendedor Multidisciplinario" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Aviso Legal</h1>

            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Información General</h2>
                <p className="text-gray-700 leading-relaxed">
                  De conformidad con lo establecido en la Ley 34/1988, de 11 de noviembre, sobre publicidad y promoción por correo electrónico, se informa que:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                  <li><strong>Titular:</strong> Aimed Dine Chebili</li>
                  <li><strong>Ubicación:</strong> Alicante, España</li>
                  <li><strong>Email:</strong> chebiliaimed9@gmail.com</li>
                  <li><strong>Actividad:</strong> Comercio electrónico de productos y servicios</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Condiciones de Uso</h2>
                <p className="text-gray-700 leading-relaxed">
                  El acceso y uso de este sitio web está sujeto a los términos y condiciones que se describen en este aviso legal. Al acceder y utilizar este sitio web, usted acepta estar vinculado por estos términos y condiciones.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Propiedad Intelectual</h2>
                <p className="text-gray-700 leading-relaxed">
                  Todos los contenidos de este sitio web, incluyendo pero no limitado a textos, gráficos, logos, imágenes, videos y software, son propiedad de Aimed Dine Chebili o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Limitación de Responsabilidad</h2>
                <p className="text-gray-700 leading-relaxed">
                  Este sitio web se proporciona "tal cual" sin garantías de ningún tipo. Aimed Dine Chebili no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar este sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Enlaces Externos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Este sitio web puede contener enlaces a sitios web de terceros. Aimed Dine Chebili no es responsable del contenido, precisión o prácticas de privacidad de estos sitios externos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Modificaciones</h2>
                <p className="text-gray-700 leading-relaxed">
                  Aimed Dine Chebili se reserva el derecho de modificar este aviso legal en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Ley Aplicable</h2>
                <p className="text-gray-700 leading-relaxed">
                  Este aviso legal se rige por las leyes de España. Cualquier disputa relacionada con este sitio web estará sujeta a la jurisdicción exclusiva de los tribunales españoles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contacto</h2>
                <p className="text-gray-700 leading-relaxed">
                  Para cualquier pregunta sobre este aviso legal, por favor contacte a:
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

export default LegalNotice;

