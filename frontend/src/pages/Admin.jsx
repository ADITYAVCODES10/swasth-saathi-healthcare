import React, { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Download, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Admin = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for analytics
  const [analyticsData, setAnalyticsData] = useState({
    dailyUsers: [],
    appointmentsBySpecialty: [],
    diseaseDistribution: []
  });

  useEffect(() => {
    // Generate mock analytics data
    const generateMockData = () => {
      const dailyUsers = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 50) + 10
      }));

      const appointmentsBySpecialty = [
        { specialty: 'General Medicine', count: 120 },
        { specialty: 'Cardiology', count: 80 },
        { specialty: 'Orthopedics', count: 60 },
        { specialty: 'Dermatology', count: 40 },
        { specialty: 'Pediatrics', count: 35 },
        { specialty: 'Gynecology', count: 30 }
      ];

      const diseaseDistribution = [
        { name: 'Diabetes', value: 30, color: '#FF6384' },
        { name: 'Hypertension', value: 25, color: '#36A2EB' },
        { name: 'Respiratory Issues', value: 20, color: '#FFCE56' },
        { name: 'Skin Conditions', value: 15, color: '#4BC0C0' },
        { name: 'Digestive Issues', value: 10, color: '#9966FF' }
      ];

      setAnalyticsData({
        dailyUsers,
        appointmentsBySpecialty,
        diseaseDistribution
      });
    };

    generateMockData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (loginData.email.includes('admin') && loginData.password.length > 0) {
        toast({
          title: "Login Successful!",
          description: "Welcome to the admin dashboard.",
        });
        setActiveTab('dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Chart configurations
  const lineChartData = {
    labels: analyticsData.dailyUsers.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'New Users',
        data: analyticsData.dailyUsers.map(d => d.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: analyticsData.appointmentsBySpecialty.map(d => d.specialty),
    datasets: [
      {
        label: 'Appointments',
        data: analyticsData.appointmentsBySpecialty.map(d => d.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const pieChartData = {
    labels: analyticsData.diseaseDistribution.map(d => d.name),
    datasets: [
      {
        data: analyticsData.diseaseDistribution.map(d => d.value),
        backgroundColor: analyticsData.diseaseDistribution.map(d => d.color),
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Mock data for tables
  const users = [
    { id: '1', name: 'राजेश कुमार', type: 'Migrant Worker', phone: '+91 9876543210', status: 'pending', date: '2024-01-15' },
    { id: '2', name: 'Dr. Priya Sharma', type: 'Doctor', phone: '+91 9876543211', status: 'approved', date: '2024-01-14' },
    { id: '3', name: 'Mohammed Ali', type: 'Migrant Worker', phone: '+91 9876543212', status: 'pending', date: '2024-01-13' },
    { id: '4', name: 'Dr. Anil Kumar', type: 'Doctor', phone: '+91 9876543213', status: 'rejected', date: '2024-01-12' },
  ];

  const applications = [
    { id: '1', name: 'सुनीता देवी', type: 'Migrant Worker', documents: 3, status: 'review', date: '2024-01-16' },
    { id: '2', name: 'Dr. Ravi Patel', type: 'Doctor', documents: 5, status: 'pending', date: '2024-01-15' },
    { id: '3', name: 'Abdul Rahman', type: 'Migrant Worker', documents: 2, status: 'incomplete', date: '2024-01-14' },
  ];

  const systemStats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Pending Applications', value: '23', icon: FileText, color: 'from-yellow-500 to-yellow-600', change: '+5%' },
    { label: 'Active Doctors', value: '156', icon: Users, color: 'from-green-500 to-green-600', change: '+8%' },
    { label: 'Monthly Consultations', value: '1,240', icon: TrendingUp, color: 'from-purple-500 to-purple-600', change: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.admin.title}
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              {t.admin.subtitle}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'login' && (
              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t.admin.login.title}</CardTitle>
                    <CardDescription>{t.admin.login.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div>
                        <Label htmlFor="email">{t.admin.login.email}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={loginData.email}
                          onChange={handleInputChange}
                          placeholder={t.admin.login.emailPlaceholder}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">{t.admin.login.password}</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={loginData.password}
                          onChange={handleInputChange}
                          placeholder={t.admin.login.passwordPlaceholder}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                        {loading ? t.admin.login.submitting : t.admin.login.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Navigation Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-1 flex space-x-1">
                  {['overview', 'analytics', 'users', 'applications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      {t.admin.dashboard[tab]}
                    </button>
                  ))}
                </div>

                {/* System Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t.admin.dashboard.overview}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {systemStats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                                <p className="text-green-600 text-xs font-medium">{stat.change}</p>
                              </div>
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Analytics Charts */}
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t.admin.dashboard.analytics.title}
                  </h3>
                  
                  {/* Daily User Registration Chart */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>{t.admin.dashboard.analytics.usersChart}</CardTitle>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        {t.admin.dashboard.analytics.exportCSV}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <Line data={lineChartData} options={chartOptions} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Appointments by Specialty */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.admin.dashboard.analytics.appointmentsChart}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <Bar data={barChartData} options={chartOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Disease Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.admin.dashboard.analytics.diseasesChart}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <Pie data={pieChartData} options={chartOptions} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* User Management Table */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <CardTitle>{t.admin.dashboard.userManagement}</CardTitle>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Phone</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b">
                              <td className="py-3 px-4 font-medium">{user.name}</td>
                              <td className="py-3 px-4">{user.type}</td>
                              <td className="py-3 px-4">{user.phone}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.status === 'approved' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : user.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">{user.date}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  {user.status === 'pending' && (
                                    <>
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                      </Button>
                                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                        <XCircle className="w-4 h-4 mr-1" /> Reject
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Management */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.admin.dashboard.applications}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Documents</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((app) => (
                            <tr key={app.id} className="border-b">
                              <td className="py-3 px-4 font-medium">{app.name}</td>
                              <td className="py-3 px-4">{app.type}</td>
                              <td className="py-3 px-4">{app.documents}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  app.status === 'review' 
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                    : app.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">{app.date}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                    Review
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer t={t} />
      <ChatWidget />
    </div>
  );
};

export default Admin;
