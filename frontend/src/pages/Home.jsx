import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Stethoscope, Shield, Heart, ArrowRight, CheckCircle, Clock, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import ServiceCard from '../components/ServiceCard';
import ChatWidget from '../components/ChatWidget';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwd29ya2Vyc3xlbnwwfHx8fDE3NTc5MjUzMDN8MA&ixlib=rb-4.1.0&q=85',
      alt: 'Healthcare Team',
      caption: t.home.hero.slide1.title,
      description: t.home.hero.slide1.description
    },
    {
      src: 'https://images.unsplash.com/photo-1641723345378-a701b30b2d36?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxoZWFsdGhjYXJlJTIwd29ya2Vyc3xlbnwwfHx8fDE3NTc5MjUzMDN8MA&ixlib=rb-4.1.0&q=85',
      alt: 'Healthcare Worker',
      caption: t.home.hero.slide2.title,
      description: t.home.hero.slide2.description
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDB8fHx8MTc1NzkyNTMxMHww&ixlib=rb-4.1.0&q=85',
      alt: 'Digital Health',
      caption: t.home.hero.slide3.title,
      description: t.home.hero.slide3.description
    },
    {
      src: 'https://images.unsplash.com/photo-1631217872822-1c2546d6b864?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDB8fHx8MTc1NzkyNTMxMHww&ixlib=rb-4.1.0&q=85',
      alt: 'Medical Technology',
      caption: t.home.hero.slide4.title,
      description: t.home.hero.slide4.description
    }
  ];

  const services = [
    {
      icon: Users,
      title: t.home.services.migrant.title,
      description: t.home.services.migrant.description,
      link: '/migrant',
      buttonText: t.home.services.migrant.button,
      color: 'blue'
    },
    {
      icon: Stethoscope,
      title: t.home.services.doctor.title,
      description: t.home.services.doctor.description,
      link: '/doctor',
      buttonText: t.home.services.doctor.button,
      color: 'green'
    },
    {
      icon: Shield,
      title: t.home.services.admin.title,
      description: t.home.services.admin.description,
      link: '/admin',
      buttonText: t.home.services.admin.button,
      color: 'purple'
    },
    {
      icon: Heart,
      title: t.home.services.emergency.title,
      description: t.home.services.emergency.description,
      link: '/emergency',
      buttonText: t.home.services.emergency.button,
      color: 'orange'
    }
  ];

  const features = [
    { icon: CheckCircle, text: t.home.features.secure },
    { icon: Clock, text: t.home.features.available },
    { icon: Globe, text: t.home.features.multilingual },
    { icon: Heart, text: t.home.features.comprehensive }
  ];

  const testimonials = [
    {
      name: 'राजेश कुमार',
      role: 'Migrant Worker',
      text: t.home.testimonials.testimonial1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'General Physician',
      text: t.home.testimonials.testimonial2,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'അനിൽ നായർ',
      role: 'Healthcare Administrator',
      text: t.home.testimonials.testimonial3,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.brand.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t.home.loading}</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />
      
      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative">
          <ImageSlider images={heroImages} />
          
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {t.brand.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {t.brand.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/migrant">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    {t.home.cta.migrant}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/doctor">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                    {t.home.cta.doctor}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-blue-50 dark:bg-blue-900/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t.home.services.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t.home.services.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t.home.testimonials.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t.home.testimonials.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.home.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.home.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  {t.home.cta.register}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  {t.home.cta.learnMore}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
      <ChatWidget t={t} language={language} />
    </div>
  );
};

export default Home;