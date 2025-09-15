import React from 'react';
import { Shield, Heart, Globe, Clock, Users, Stethoscope } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const About = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const features = [
    {
      icon: Heart,
      title: t.about.features.feature1,
      description: "Secure, comprehensive digital health records accessible from anywhere in India.",
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Globe,
      title: t.about.features.feature2,
      description: "Full support for English, Hindi, and Malayalam with more languages coming soon.",
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      title: t.about.features.feature3,
      description: "Round-the-clock emergency medical assistance and consultation services.",
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Stethoscope,
      title: t.about.features.feature4,
      description: "Remote consultations with certified healthcare professionals.",
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: t.about.features.feature5,
      description: "Full compliance with government healthcare regulations and data privacy laws.",
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: t.about.features.feature6,
      description: "Dedicated support team available 24/7 to help with any healthcare needs.",
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Registered Workers' },
    { number: '500+', label: 'Healthcare Providers' },
    { number: '28', label: 'States Covered' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Sharma',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      description: 'Leading healthcare digitization with 20+ years of experience in public health.'
    },
    {
      name: 'Priya Patel',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b6e3c2ee?w=150&h=150&fit=crop&crop=face',
      description: 'Expert in healthcare technology solutions and data security systems.'
    },
    {
      name: 'Anil Kumar',
      role: 'Policy Advisor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Former government healthcare official specializing in migrant worker policies.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
                    {t.about.mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t.about.mission.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                    {t.about.vision.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t.about.vision.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t.about.features.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Comprehensive healthcare solutions designed for the modern mobile workforce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Leadership Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experienced professionals dedicated to transforming healthcare for migrant workers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Built with Modern Technology
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Leveraging cutting-edge technology to deliver secure, scalable, and reliable healthcare solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {[
                { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
                { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <img src={tech.logo} alt={tech.name} className="w-12 h-12" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Swasth Saathi?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the first step towards better healthcare management for migrant workers across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors">
                Get Started Today
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
      <ChatWidget t={t} language={language} />
    </div>
  );
};

export default About;