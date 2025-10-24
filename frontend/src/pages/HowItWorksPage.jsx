import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  BarChart3, 
  Star, 
  UserCheck,
  Shield,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Users,
  MessageCircle,
  Target
} from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      step: 1,
      title: "Search & Browse",
      description: "Enter your location and property type to find verified agents in your area. Browse detailed profiles with performance metrics and client reviews.",
      icon: Search,
      color: "bg-blue-50 text-blue-600",
      features: ["Location-based search", "Property type filtering", "Advanced search options"]
    },
    {
      step: 2,
      title: "Compare Agents",
      description: "Compare up to 3 agents side-by-side using verified performance data including sales volume, average days on market, and price accuracy.",
      icon: BarChart3,
      color: "bg-emerald-50 text-emerald-600",
      features: ["Performance metrics", "Side-by-side comparison", "Verified sales data"]
    },
    {
      step: 3,
      title: "Read Reviews",
      description: "Read authentic reviews from real clients who have worked with these agents. Get insights into their communication style and expertise.",
      icon: Star,
      color: "bg-blue-50 text-blue-800",
      features: ["Verified client reviews", "Rating system", "Detailed feedback"]
    },
    {
      step: 4,
      title: "Make Contact",
      description: "Connect with your chosen agent directly through our platform. Schedule consultations and start your property journey with confidence.",
      icon: UserCheck,
      color: "bg-purple-50 text-purple-600",
      features: ["Direct contact", "Consultation booking", "Secure messaging"]
    }
  ];

  const features = [
    {
      title: "Verified Performance Data",
      description: "All agent statistics are verified through official sources and updated regularly to ensure accuracy.",
      icon: Shield,
      stats: "99.5% accuracy rate"
    },
    {
      title: "Comprehensive Reviews",
      description: "Read detailed reviews from real clients covering all aspects of the agent's service and expertise.",
      icon: MessageCircle,
      stats: "50,000+ verified reviews"
    },
    {
      title: "Smart Matching",
      description: "Our algorithm matches you with agents based on your specific property type, budget, and requirements.",
      icon: Target,
      stats: "85% match success rate"
    },
    {
      title: "Market Insights",
      description: "Get access to local market data and trends to make informed decisions about your property.",
      icon: TrendingUp,
      stats: "150+ cities covered"
    }
  ];

  const testimonials = [
    {
      quote: "AgentRate helped me find the perfect agent for my first home purchase. The comparison tool was incredibly useful!",
      author: "Sarah M.",
      role: "First-time Home Buyer",
      location: "Sydney, NSW"
    },
    {
      quote: "The verified reviews gave me confidence in my choice. My agent exceeded all expectations in selling our property.",
      author: "Michael K.",
      role: "Property Seller",
      location: "Melbourne, VIC"
    },
    {
      quote: "As an investor, having access to real performance data was crucial. Found an agent who understood my needs perfectly.",
      author: "Lisa T.",
      role: "Property Investor",
      location: "Brisbane, QLD"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How AgentRate
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Works For You
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how our platform makes finding the perfect real estate agent simple, 
            transparent, and based on verified performance data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agents">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 hover:text-white text-white px-8">
                Start Searching
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/compare">
              <Button size="lg" variant="outline" className="px-8">
                Compare Agents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Finding the right real estate agent has never been easier. Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0" />
                  )}
                  
                  <Card className="relative z-10 h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-6">
                        <div className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-xl mb-4`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-emerald-600 text-white">
                          {step.step}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                      
                      <ul className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgentRate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides the most comprehensive and transparent way to find and evaluate real estate agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-emerald-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">{feature.description}</p>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                          {feature.stats}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who found their perfect agent through AgentRate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Agent?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Start your search today and connect with top-performing real estate agents in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agents">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 px-8">
                <Search className="h-5 w-5 mr-2" />
                Find Agents Now
              </Button>
            </Link>
            <Link to="/submit-review">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8">
                <Star className="h-5 w-5 mr-2" />
                Write a Review
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;