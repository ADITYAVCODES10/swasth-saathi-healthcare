import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const ServiceCard = ({ icon: Icon, title, description, link, buttonText, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {description}
        </CardDescription>
        <Link to={link}>
          <Button 
            className={`bg-gradient-to-r ${colorClasses[color]} text-white hover:shadow-lg group/btn`}
            size="sm"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;