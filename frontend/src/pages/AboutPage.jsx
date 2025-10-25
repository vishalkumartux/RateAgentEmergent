import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import SEO from '../components/SEO';
import { 
  Award, 
  Users, 
  Target, 
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Transparency',
      description: 'We believe in complete transparency with verified data and authentic reviews from real clients.'
    },
    {
      icon: Users,
      title: 'Empowerment',
      description: 'Empowering buyers with the information they need to make confident property decisions.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We only feature agents who demonstrate consistent excellence in their performance.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Leveraging technology to revolutionize how people find and connect with real estate agents.'
    }
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      bio: '15 years in real estate technology'
    },
    {
      name: 'James Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      bio: 'Former lead engineer at major proptech company'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Agent Relations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      bio: '20 years as a top-performing real estate agent'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Verified Agents' },
    { value: '$2.5B+', label: 'Property Value Transacted' },
    { value: '50,000+', label: 'Happy Clients' },
    { value: '150+', label: 'Cities Covered' }
  ];

  return (
    <>
      <SEO 
        title="About AgentRate - Revolutionizing Real Estate Agent Discovery"
        description="Learn about AgentRate's mission to help property buyers find the perfect real estate agent through verified data, authentic reviews, and transparent performance metrics."
        keywords="about agentrate, real estate platform, agent discovery, property technology, proptech"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Transforming How People <span className="text-black">Find Agents</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                AgentRate was founded on a simple belief: finding the right real estate agent shouldn't be a gamble. 
                It should be informed, transparent, and empowering.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We're on a mission to revolutionize the real estate industry by providing complete transparency 
                into agent performance, authentic client feedback, and data-driven insights. Every property buyer 
                deserves to work with an agent who truly matches their needs and has a proven track record of success.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-black mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-black" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Experienced professionals passionate about real estate and technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300 dark:border-gray-300"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                    <p className="text-black font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-gray-900 dark:to-yellow-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Agent?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of satisfied property buyers who found their ideal agent through AgentRate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agents">
                <Button size="lg" className="bg-white text-black hover:bg-gray-50 px-8">
                  Browse Agents
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/deals">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
