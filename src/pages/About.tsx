import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  const personalInfo = {
    name: "Aimed Dine Chebili",
    birthDate: "6 de octubre de 2004",
    location: "Alicante, 03013",
    email: "chebiliaimed9@gmail.com",
    phone: "604148681",
  };

  const languages = [
    { name: "Inglés", level: 85, color: "from-blue-500 to-blue-600" },
    { name: "Francés", level: 90, color: "from-red-500 to-red-600" },
    { name: "Español", level: 85, color: "from-yellow-500 to-orange-500" },
    { name: "Árabe", level: 100, color: "from-green-500 to-green-600" },
  ];

  const skills = [
    { name: "HTML/CSS", level: 90, color: "from-orange-500 to-red-500" },
    { name: "JavaScript", level: 85, color: "from-yellow-400 to-yellow-600" },
    { name: "React", level: 80, color: "from-blue-400 to-blue-600" },
    { name: "PHP", level: 75, color: "from-purple-500 to-purple-600" },
    { name: "Laravel", level: 70, color: "from-red-500 to-pink-500" },
    { name: "MySQL/MongoDB", level: 80, color: "from-green-500 to-teal-500" },
    { name: "Git/GitHub", level: 75, color: "from-gray-600 to-gray-800" },
    { name: "WordPress", level: 80, color: "from-blue-600 to-indigo-600" },
  ];

  const experiences = [
    {
      title: "Gestión de Alquiler de Habitaciones",
      company: "Autónomo",
      period: "Mostaganem, Argel — Veranos 2020 - Actualidad",
      description:
        "Alquiler y gestión de 4 viviendas distribuidas y diferentes apartamentos. Encargado de la atención a inquilinos, limpieza, organización de estancias y cobros.",
      icon: "🏠",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Diagnóstico de Vehículos",
      company: "Autónomo",
      period: "Birtouta, Argel — 2022 - Actualidad",
      description:
        "Reparación y análisis técnico de automóviles de marcas como Volkswagen, Renault y otras. Trabajo autónomo, orientado a la resolución de problemas.",
      icon: "🔧",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Entrenador de Perros",
      company: "Autónomo",
      period: "Birtouta, Argel — 2019 - 2023",
      description:
        "Práctica de entrenamiento con diferentes razas, enfocado en disciplina, control y comportamiento. Trabajo con constancia, respeto y responsabilidad.",
      icon: "🐕",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const education = [
    {
      title: "FP Grado Superior y Desarrollo de Aplicaciones Web",
      institution: "IES Formació, Alicante",
      period: "2023 - 2025",
      icon: "💻",
    },
    {
      title: "Licenciatura en Ciencias Humanas",
      institution: "Universidad Argel 2",
      period: "2022 - 2023",
      icon: "🎓",
    },
    {
      title: "Técnico Superior en Comercio Internacional",
      institution: "INSIM Alger",
      period: "2022 - 2023",
      icon: "🌍",
    },
    {
      title: "Diploma Estatal en Diagnóstico del Automóvil",
      institution: "Alger Pro Electronics",
      period: "2022",
      icon: "🚗",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Mí - Aimed Dine Chebili | Portfolio Profesional</title>
        <meta
          name="description"
          content="Portfolio profesional de Aimed Dine Chebili - Desarrollador Full Stack, emprendedor multidisciplinario especializado en tecnología, alojamientos y automoción."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 text-blue-300 text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {t("home.hero.highlight")}
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Aimed Dine
                  </span>
                  <br />
                  <span className="text-white">Chebili</span>
                </h1>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
                  {t("home.hero.subtitle")}
                </h2>

                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {t("home.about.biography")}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center text-gray-300">
                    <span className="text-blue-400 mr-2">📍</span>
                    {personalInfo.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">📧</span>
                    {personalInfo.email}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-2">📱</span>
                    {personalInfo.phone}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/in/aimed-dine-chebili-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/AimedCh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://instagram.com/_aimed_dine_ch_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@aimed_k9_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    TikTok
                  </a>
                  <a
                    href="mailto:chebiliaimed9@gmail.com"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Contacto
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                    <img
                      src="/img/negocios.png"
                      alt="Aimed Dine Chebili"
                      className="w-48 h-48 object-cover rounded-full mx-auto mb-6 border-4 border-gradient-to-r from-blue-400 to-purple-400"
                    />
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Portfolio Digital
                      </h3>
                      <p className="text-gray-400">
                        Desarrollador & Emprendedor
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("home.about.languages.title")}
              </h2>
              <p className="text-xl text-gray-400">
                {t("home.about.languages.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-3">
                      {lang.name}
                    </h3>
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="30"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-gray-700"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="30"
                          stroke="url(#gradient)"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 30}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 30 * (1 - lang.level / 100)
                          }`}
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              className={`text-${lang.color.split("-")[1]}-500`}
                            />
                            <stop
                              offset="100%"
                              className={`text-${lang.color.split("-")[3]}-600`}
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {lang.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("home.about.skills.title")}
              </h2>
              <p className="text-xl text-gray-400">
                {t("home.about.skills.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold text-lg">
                      {skill.name}
                    </span>
                    <span className="text-gray-400 font-medium">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("home.about.experience.title")}
              </h2>
              <p className="text-xl text-gray-400">
                {t("home.about.experience.subtitle")}
              </p>
            </motion.div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${exp.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}
                    >
                      {exp.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-blue-400 font-semibold">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-gray-400 bg-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("home.about.education.title")}
              </h2>
              <p className="text-xl text-gray-400">
                {t("home.about.education.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {edu.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {edu.title}
                      </h3>
                      <p className="text-blue-400 font-medium mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-gray-400 text-sm">{edu.period}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {t("home.about.cta.title")}
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {t("home.about.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {t("home.about.cta.contact")}
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {t("home.about.cta.services")}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
