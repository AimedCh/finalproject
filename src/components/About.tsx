import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    { key: 'trust', icon: '🤝' },
    { key: 'innovation', icon: '💡' },
    { key: 'quality', icon: '⭐' },
    { key: 'closeness', icon: '❤️' }
  ];

  const timeline = [
    { key: 'idea', year: '2015' },
    { key: 'airpods', year: '2018' },
    { key: 'rentals', year: '2020' },
    { key: 'workshop', year: '2022' }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-slate-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-slate-50 text-blue-600 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Sobre Mí
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('home.about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.about.biography')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Values */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              {t('home.about.values.title')}
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={value.key} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {t(`home.about.values.${value.key}`)}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              {t('home.about.timeline.title')}
            </h3>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.key} className="flex items-center group">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{item.year}</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {t(`home.about.timeline.${item.key}`)}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Hito importante en mi trayectoria profesional
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
