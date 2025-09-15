import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const Contact = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: t.contact.info.address,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: t.contact.info.phone,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: t.contact.info.email,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: t.contact.info.hours,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const emergencyContacts = [
    { service: 'Medical Emergency', number: '108', description: 'National Ambulance Service' },
    { service: 'Swasth Saathi Helpline', number: '+91-11-2XXX-XXXX', description: '24/7 Healthcare Support' },
    { service: 'Women Helpline', number: '1091', description: 'Emergency support for women' },
    { service: 'Child Protection', number: '1098', description: 'Child emergency services' }
  ];

  const offices = [
    {
      city: 'New Delhi',
      address: 'Ministry of Health & Family Welfare, Nirman Bhawan, New Delhi - 110011',
      phone: '+91-11-2XXX-XXXX',
      email: 'delhi@swasthsaathi.gov.in'
    },
    {
      city: 'Mumbai',
      address: 'Regional Office, BKC, Mumbai - 400051',
      phone: '+91-22-XXXX-XXXX',
      email: 'mumbai@swasthsaathi.gov.in'
    },
    {
      city: 'Bangalore',
      address: 'Tech Hub, Electronic City, Bangalore - 560100',
      phone: '+91-80-XXXX-XXXX',
      email: 'bangalore@swasthsaathi.gov.in'
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
              {t.contact.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {info.details}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t.contact.title}</CardTitle>
                    <CardDescription>
                      Send us a message and we'll respond within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{t.contact.form.name}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t.contact.form.namePlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t.contact.form.email}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t.contact.form.emailPlaceholder}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">{t.contact.form.subject}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={t.contact.form.subjectPlaceholder}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">{t.contact.form.message}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t.contact.form.messagePlaceholder}
                          rows={5}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        disabled={loading}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? t.contact.form.submitting : t.contact.form.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency Contacts & Regional Offices */}
              <div className="space-y-8">
                {/* Emergency Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600 dark:text-red-400">
                      Emergency Contacts
                    </CardTitle>
                    <CardDescription>
                      Important numbers for medical and healthcare emergencies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyContacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{contact.service}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">{contact.number}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Offices */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Regional Offices</CardTitle>
                    <CardDescription>
                      Our presence across major cities in India
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {offices.map((office, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{office.city}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{office.address}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2">
                            <p className="text-sm text-blue-600 dark:text-blue-400">{office.phone}</p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{office.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Quick answers to common questions about Swasth Saathi
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How do I register as a migrant worker?",
                  answer: "Click on 'Register' in the navigation menu, select 'Migrant Worker', and fill out the required information including your Aadhaar number and contact details."
                },
                {
                  question: "Is my health data secure?",
                  answer: "Yes, we use bank-level security encryption and comply with all government data protection regulations. Your health information is completely private and secure."
                },
                {
                  question: "Can I access services in my local language?",
                  answer: "Yes, Swasth Saathi supports multiple languages including English, Hindi, and Malayalam. More regional languages will be added soon."
                },
                {
                  question: "What should I do in a medical emergency?",
                  answer: "For immediate medical emergencies, call 108 (National Ambulance Service). For Swasth Saathi related urgent queries, call our 24/7 helpline at +91-11-2XXX-XXXX."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} />
      <ChatWidget t={t} language={language} />
    </div>
  );
};

export default Contact;