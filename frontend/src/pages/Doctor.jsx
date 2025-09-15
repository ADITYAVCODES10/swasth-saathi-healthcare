import React, { useState } from 'react';
import { Search, Users, FileText, Upload, Stethoscope, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../components/ui/toast';

const Doctor = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    specialization: '',
    phone: '',
    email: '',
    clinic: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
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
        title: "Registration Successful!",
        description: "Your doctor profile has been created and is pending verification.",
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

  const todayStats = [
    { label: t.doctor.dashboard.appointments, value: '12', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: t.doctor.dashboard.pendingReports, value: '4', icon: FileText, color: 'from-green-500 to-green-600' },
    { label: 'Consultations', value: '8', icon: Stethoscope, color: 'from-purple-500 to-purple-600' },
    { label: 'Follow-ups', value: '3', icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
  ];

  const recentPatients = [
    { id: 'MIG-001', name: 'राजेश कुमार', lastVisit: '2024-01-15', condition: 'Diabetes Management' },
    { id: 'MIG-002', name: 'Anil Nair', lastVisit: '2024-01-14', condition: 'Blood Pressure' },
    { id: 'MIG-003', name: 'Mohammed Ali', lastVisit: '2024-01-13', condition: 'General Checkup' },
    { id: 'MIG-004', name: 'सुनीता देवी', lastVisit: '2024-01-12', condition: 'Respiratory Issues' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.doctor.title}
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              {t.doctor.subtitle}
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
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Registration
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
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
                    <CardTitle className="text-2xl">{t.doctor.register.title}</CardTitle>
                    <CardDescription>{t.doctor.register.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="name">{t.doctor.register.form.name}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t.doctor.register.form.namePlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="regNo">{t.doctor.register.form.regNo}</Label>
                          <Input
                            id="regNo"
                            name="regNo"
                            value={formData.regNo}
                            onChange={handleInputChange}
                            placeholder={t.doctor.register.form.regNoPlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="specialization">{t.doctor.register.form.specialization}</Label>
                          <Input
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            placeholder={t.doctor.register.form.specializationPlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t.doctor.register.form.phone}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t.doctor.register.form.phonePlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t.doctor.register.form.email}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t.doctor.register.form.emailPlaceholder}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="clinic">{t.doctor.register.form.clinic}</Label>
                          <Input
                            id="clinic"
                            name="clinic"
                            value={formData.clinic}
                            onChange={handleInputChange}
                            placeholder={t.doctor.register.form.clinicPlaceholder}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label>{t.doctor.register.form.certifications}</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {t.doctor.register.form.certificationsHelp}
                        </p>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <Button type="button" variant="outline">
                            Upload Certificates
                          </Button>
                          <p className="mt-2 text-sm text-gray-500">
                            PDF files up to 5MB each
                          </p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                        {loading ? t.doctor.register.form.submitting : t.doctor.register.form.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Welcome & Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Welcome, Dr. Priya Sharma
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">General Medicine</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder={t.doctor.dashboard.patientSearchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Today's Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t.doctor.dashboard.todayStats}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {todayStats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-center">
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Patients & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Patients */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Patients</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentPatients.map((patient) => (
                            <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{patient.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {patient.id}</p>
                                  <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{patient.condition}</p>
                                <Button size="sm" variant="outline" className="mt-2">
                                  View History
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <FileText className="w-4 h-4 mr-2" />
                          {t.doctor.dashboard.actions.viewHistory}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          {t.doctor.dashboard.actions.uploadReport}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          {t.doctor.dashboard.actions.writePrescription}
                        </Button>
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

export default Doctor;