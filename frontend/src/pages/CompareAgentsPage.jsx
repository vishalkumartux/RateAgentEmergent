import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Search, 
  Star, 
  MapPin, 
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Target,
  Plus,
  X,
  BarChart3,
  Users
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';

const CompareAgentsPage = () => {
  const [selectedAgents, setSelectedAgents] = useState([mockAgents[0], mockAgents[2]]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddAgent, setShowAddAgent] = useState(false);

  const availableAgents = mockAgents.filter(
    agent => !selectedAgents.find(selected => selected.id === agent.id) &&
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addAgent = (agent) => {
    if (selectedAgents.length < 3) {
      setSelectedAgents([...selectedAgents, agent]);
      setShowAddAgent(false);
      setSearchTerm('');
    }
  };

  const removeAgent = (agentId) => {
    setSelectedAgents(selectedAgents.filter(agent => agent.id !== agentId));
  };

  const comparisonMetrics = [
    { key: 'rating', label: 'Rating', format: (value) => `${value}/5`, icon: Star },
    { key: 'salesVolume', label: 'Sales Volume', format: (value) => value, icon: DollarSign },
    { key: 'avgDaysOnMarket', label: 'Avg Days on Market', format: (value) => `${value} days`, icon: Clock },
    { key: 'priceAccuracy', label: 'Price Accuracy', format: (value) => value, icon: Target },
    { key: 'yearsExperience', label: 'Years Experience', format: (value) => `${value} years`, icon: Award },
    { key: 'reviewCount', label: 'Total Reviews', format: (value) => value, icon: Users }
  ];

  const getBestPerformer = (metric) => {
    if (selectedAgents.length === 0) return null;
    
    let best = selectedAgents[0];
    selectedAgents.forEach(agent => {
      switch (metric) {
        case 'rating':
        case 'yearsExperience':
        case 'reviewCount':
          if (agent[metric] > best[metric]) best = agent;
          break;
        case 'avgDaysOnMarket':
          if (agent[metric] < best[metric]) best = agent;
          break;
        case 'salesVolume':
          const agentVolume = parseFloat(agent[metric].replace(/[$M,]/g, ''));
          const bestVolume = parseFloat(best[metric].replace(/[$M,]/g, ''));
          if (agentVolume > bestVolume) best = agent;
          break;
        case 'priceAccuracy':
          const agentAccuracy = parseFloat(agent[metric].replace(/%/g, ''));
          const bestAccuracy = parseFloat(best[metric].replace(/%/g, ''));
          if (agentAccuracy > bestAccuracy) best = agent;
          break;
      }
    });
    return best;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compare Real Estate Agents
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Compare up to 3 agents side by side to make the best choice for your property needs
          </p>
        </div>

        {/* Add Agent Section */}
        {selectedAgents.length < 3 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              {!showAddAgent ? (
                <div className="text-center">
                  <Button 
                    onClick={() => setShowAddAgent(true)} 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Agent to Compare
                  </Button>
                  <p className="text-gray-600 mt-2">
                    You can compare up to 3 agents ({selectedAgents.length}/3 selected)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Search Agents</h3>
                    <Button variant="ghost" onClick={() => setShowAddAgent(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search by name, location, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {availableAgents.map((agent) => (
                      <div key={agent.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 cursor-pointer transition-colors" onClick={() => addAgent(agent)}>
                        <div className="flex items-center space-x-3">
                          <img src={agent.photo} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                            <p className="text-gray-600 text-sm">{agent.company}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-amber-400 fill-current" />
                              <span className="text-sm ml-1">{agent.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {selectedAgents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
                Agent Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-2 font-medium text-gray-700">Agent</th>
                      {selectedAgents.map((agent) => (
                        <th key={agent.id} className="text-center py-4 px-4 min-w-[250px]">
                          <div className="space-y-3">
                            <div className="relative">
                              <img
                                src={agent.photo}
                                alt={agent.name}
                                className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                              />
                              <button
                                onClick={() => removeAgent(agent.id)}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                              <p className="text-gray-600 text-sm">{agent.company}</p>
                              <p className="text-gray-500 text-xs flex items-center justify-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {agent.location}
                              </p>
                            </div>
                            <Link to={`/agent/${agent.id}`}>
                              <Button size="sm" variant="outline" className="w-full">
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((metric) => {
                      const Icon = metric.icon;
                      const bestAgent = getBestPerformer(metric.key);
                      
                      return (
                        <tr key={metric.key} className="border-b border-gray-100">
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              <Icon className="h-5 w-5 text-emerald-600" />
                              <span className="font-medium text-gray-900">{metric.label}</span>
                            </div>
                          </td>
                          {selectedAgents.map((agent) => {
                            const isBest = bestAgent && bestAgent.id === agent.id;
                            return (
                              <td key={agent.id} className="py-4 px-4 text-center">
                                <div className={`font-semibold ${isBest ? 'text-emerald-600' : 'text-gray-900'}`}>
                                  {metric.format(agent[metric.key])}
                                  {isBest && <Award className="h-4 w-4 inline ml-1 text-emerald-500" />}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    
                    {/* Specialties Row */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                          <span className="font-medium text-gray-900">Specialties</span>
                        </div>
                      </td>
                      {selectedAgents.map((agent) => (
                        <td key={agent.id} className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {agent.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {selectedAgents.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Comparing Agents</h3>
              <p className="text-gray-600 mb-6">
                Add agents to compare their performance metrics, specialties, and track records side by side.
              </p>
              <Button 
                onClick={() => setShowAddAgent(true)} 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Agent
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompareAgentsPage;