import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Phone, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';

const Register = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: t.common.passwordMismatch,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Please check your email for verification.",
      });
      
      // Redirect logic would go here
      console.log('Registration successful:', formData);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.auth.register.title}
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              {t.auth.register.subtitle}
            </p>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <CardTitle className="text-2xl">{t.brand.name}</CardTitle>
                <CardDescription>{t.auth.register.subtitle}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label>{t.auth.register.userType}</Label>
                    <Select onValueChange={(value) => setFormData({...formData, userType: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="migrant">{t.auth.register.userTypes.migrant}</SelectItem>
                        <SelectItem value="doctor">{t.auth.register.userTypes.doctor}</SelectItem>
                        <SelectItem value="admin">{t.auth.register.userTypes.admin}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">{t.auth.register.name}</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.auth.register.namePlaceholder}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">{t.auth.register.email}</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.auth.register.emailPlaceholder}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">{t.auth.register.phone}</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t.auth.register.phonePlaceholder}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">{t.auth.register.password}</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={t.auth.register.passwordPlaceholder}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">{t.auth.register.confirmPassword}</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder={t.auth.register.confirmPasswordPlaceholder}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked})}
                      className="mt-1"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-5">
                      {t.auth.register.terms}
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    disabled={loading}
                  >
                    {loading ? t.auth.register.submitting : t.auth.register.submit}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.auth.register.hasAccount}{' '}
                    <Link
                      to="/login"
                      className="text-green-600 hover:text-green-500 dark:text-green-400 font-medium"
                    >
                      {t.auth.register.signIn}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer t={t} />
    </div>
  );
};

export default Register;