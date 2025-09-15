import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Heart, Calendar, User, QrCode, Activity } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const MigrantWorker = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    aadhaar: '',
    emergency: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Your migrant worker profile has been created successfully.",
      });
      
      setActiveTab('dashboard');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      icon: Heart,
      title: t.migrant.dashboard.cards.medicalHistory.title,
      description: t.migrant.dashboard.cards.medicalHistory.description,
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FileText,
      title: t.migrant.dashboard.cards.prescriptions.title,
      description: t.migrant.dashboard.cards.prescriptions.description,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Activity,
      title: t.migrant.dashboard.cards.alerts.title,
      description: t.migrant.dashboard.cards.alerts.description,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Calendar,
      title: t.migrant.dashboard.cards.appointments.title,
      description: t.migrant.dashboard.cards.appointments.description,
      color: 'from-green-500 to-green-600'
    }
  ];

  const recentActivities = [
    "Health checkup completed - Dr. Sharma",
    "Blood pressure medication prescribed",
    "Appointment scheduled for next week",
    "Health card downloaded"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.migrant.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t.migrant.subtitle}
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white dark:bg-gray-800 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('register')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'register'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Registration
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Dashboard
              </button>
            </nav>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'register' && (
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t.migrant.register.title}</CardTitle>
                    <CardDescription>{t.migrant.register.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t.migrant.register.form.personalInfo}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">{t.migrant.register.form.fullName}</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder={t.migrant.register.form.fullNamePlaceholder}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="dob">{t.migrant.register.form.dob}</Label>
                            <Input
                              id="dob"
                              name="dob"
                              type="date"
                              value={formData.dob}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="gender">{t.migrant.register.form.gender}</Label>
                            <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">{t.migrant.register.form.genderMale}</SelectItem>
                                <SelectItem value="female">{t.migrant.register.form.genderFemale}</SelectItem>
                                <SelectItem value="other">{t.migrant.register.form.genderOther}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="phone">{t.migrant.register.form.phone}</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder={t.migrant.register.form.phonePlaceholder}
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="email">{t.migrant.register.form.email}</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder={t.migrant.register.form.emailPlaceholder}
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="address">{t.migrant.register.form.address}</Label>
                            <Textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder={t.migrant.register.form.addressPlaceholder}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="aadhaar">{t.migrant.register.form.aadhaar}</Label>
                            <Input
                              id="aadhaar"
                              name="aadhaar"
                              value={formData.aadhaar}
                              onChange={handleInputChange}
                              placeholder={t.migrant.register.form.aadhaarPlaceholder}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="emergency">{t.migrant.register.form.emergency}</Label>
                            <Input
                              id="emergency"
                              name="emergency"
                              value={formData.emergency}
                              onChange={handleInputChange}
                              placeholder={t.migrant.register.form.emergencyPlaceholder}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <Label>{t.migrant.register.form.documents}</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {t.migrant.register.form.documentsHelp}
                        </p>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Choose Files
                              </Button>
                              <p className="mt-2 text-sm text-gray-500">
                                PDF, JPG, PNG up to 5MB each
                              </p>
                            </div>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                        {files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                <span className="text-sm">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t.migrant.register.form.submitting : t.migrant.register.form.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t.migrant.dashboard.welcome}, राजेश कुमार
                  </h2>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center mb-2`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{card.description}</CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Health Card & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Health Card */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <QrCode className="w-5 h-5" />
                          <span>{t.migrant.dashboard.healthCard.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">राजेश कुमार</h3>
                              <p className="text-blue-100">ID: MIG-2024-001234</p>
                            </div>
                            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                              <QrCode className="w-10 h-10" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-blue-100">DOB</p>
                              <p>15/08/1985</p>
                            </div>
                            <div>
                              <p className="text-blue-100">Blood Group</p>
                              <p>B+</p>
                            </div>
                            <div>
                              <p className="text-blue-100">Emergency Contact</p>
                              <p>+91 98765 43210</p>
                            </div>
                            <div>
                              <p className="text-blue-100">Location</p>
                              <p>Mumbai, Maharashtra</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {t.migrant.dashboard.healthCard.download}
                          </Button>
                          <Button size="sm" variant="outline">
                            {t.migrant.dashboard.healthCard.print}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.migrant.dashboard.recentActivity}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{activity}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer t={t} />
      <ChatWidget t={t} language={language} />
    </div>
  );
};

export default MigrantWorker;