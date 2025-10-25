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
  Users,
  Home,
  Shield,
  MessageSquare,
  CheckCircle,
  TrendingDown,
  Percent,
  Calendar,
  Building2
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
    if (selectedAgents.length < 4) {
      setSelectedAgents([...selectedAgents, agent]);
      setShowAddAgent(false);
      setSearchTerm('');
    }
  };

  const removeAgent = (agentId) => {
    setSelectedAgents(selectedAgents.filter(agent => agent.id !== agentId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compare Buyer Agents
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Compare up to 4 buyer agents side by side to find the perfect match for your property purchase
          </p>
        </div>

        {/* Add Agent Section - Only show when no agents selected or at top of page */}
        {selectedAgents.length < 4 && selectedAgents.length === 0 && (
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              {!showAddAgent ? (
                <div className="text-center">
                  <Button 
                    onClick={() => setShowAddAgent(true)} 
                    className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Agent to Compare
                  </Button>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    You can compare up to 4 agents ({selectedAgents.length}/4 selected)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Agents</h3>
                    <Button variant="ghost" onClick={() => setShowAddAgent(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black z-10" />
                    <Input
                      placeholder="Search by name, location, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      list="compare-agents"
                      className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/20 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                    />
                    <datalist id="compare-agents">
                      <option value="Sydney agents" />
                      <option value="Melbourne agents" />
                      <option value="Top rated" />
                    </datalist>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {availableAgents.map((agent) => (
                      <div key={agent.id} className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-black cursor-pointer transition-colors" onClick={() => addAgent(agent)}>
                        <div className="flex items-center space-x-3">
                          <img src={agent.photo} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{agent.company}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-gray-700 fill-current" />
                              <span className="text-sm ml-1 text-gray-900 dark:text-white">{agent.rating}</span>
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

        {/* Comparison Blocks */}
        {selectedAgents.length > 0 && (
          <div className="space-y-6">
            {/* Enhanced Sticky Agent Header - Two Rows */}
            <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-md pb-3 pt-3">
              {/* Row 1: Title + Add Button */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6 text-black" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Comparing Agents ({selectedAgents.length}/4)
                  </h2>
                </div>
                {selectedAgents.length < 4 && (
                  <Button 
                    onClick={() => setShowAddAgent(true)} 
                    className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Agent
                  </Button>
                )}
              </div>

              {/* Row 2: Agent Cards - Aligned with comparison columns */}
              <div className={`grid gap-4 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                {selectedAgents.map((agent) => (
                  <div key={agent.id} className="bg-gray-50 dark:bg-gray-700 border-2 border-primary dark:border-black rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-black flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{agent.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{agent.company}</p>
                          <p className="text-xs text-black dark:text-black flex items-center mt-0.5">
                            <MapPin className="h-3 w-3 mr-1" />
                            {agent.location}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeAgent(agent.id)}
                        className="ml-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors flex-shrink-0"
                        title="Remove agent"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Agent Modal - Centered Overlay */}
            {showAddAgent && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-50"
                  onClick={() => setShowAddAgent(false)}
                ></div>
                
                {/* Modal */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-2xl">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-gray-900 dark:text-white">
                          <Search className="h-5 w-5 mr-2 text-black" />
                          Add Agent to Compare
                        </CardTitle>
                        <Button variant="ghost" onClick={() => setShowAddAgent(false)} size="sm">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Select an agent to add to your comparison ({selectedAgents.length}/4 selected)
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
                      <div className="space-y-4">
                        {/* Search Input */}
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black z-10" />
                          <Input
                            placeholder="Search by name, location, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="pl-12 h-14 text-base border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/20 rounded-2xl dark:bg-gray-700 dark:text-white font-medium transition-all"
                          />
                        </div>

                        {/* Agent List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {availableAgents.length > 0 ? (
                            availableAgents.map((agent) => (
                              <div 
                                key={agent.id} 
                                className="border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-4 hover:border-primary dark:hover:border-black hover:shadow-md cursor-pointer transition-all" 
                                onClick={() => addAgent(agent)}
                              >
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={agent.photo} 
                                    alt={agent.name} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-black" 
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">{agent.name}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm truncate">{agent.company}</p>
                                    <div className="flex items-center mt-1">
                                      <Star className="h-4 w-4 text-gray-700 fill-current" />
                                      <span className="text-sm ml-1 text-gray-900 dark:text-white font-semibold">{agent.rating}</span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({agent.reviewCount})</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-full text-center py-8">
                              <p className="text-gray-500 dark:text-gray-400">No agents found matching "{searchTerm}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* 1. Overview Block */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Users className="h-5 w-5 mr-2 text-black" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {selectedAgents.map((agent) => (
                    <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="text-center mb-4">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-gray-300 dark:border-gray-300 shadow-lg mb-3"
                        />
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{agent.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{agent.company}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center justify-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {agent.location}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Coverage Areas</h4>
                          <div className="flex flex-wrap gap-1">
                            {agent.coverageAreas && agent.coverageAreas.map((area, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-gray-50 dark:bg-gray-100 text-black dark:text-gray-700 border border-gray-300 dark:border-gray-300">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Services</h4>
                          <div className="flex flex-wrap gap-1">
                            {agent.services && agent.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Fee Model</h4>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">{agent.feeModel}</p>
                        </div>
                      </div>

                      <Link to={`/agent/${agent.id}`} className="mt-4 block">
                        <Button size="sm" variant="outline" className="w-full border-black text-black hover:bg-primary hover:text-white">
                          View Full Profile
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 2. Performance Block */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <TrendingUp className="h-5 w-5 mr-2 text-black" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Median Days to Secure */}
                  <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 text-black mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Median Days to Secure</span>
                    </div>
                    <div className={`grid gap-3 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {selectedAgents.map((agent) => (
                        <div key={agent.id} className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-2xl font-bold text-black">{agent.medianDaysToSecure}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">days</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Deals Count */}
                  <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-4 w-4 text-black mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Verified Deals</span>
                    </div>
                    <div className={`grid gap-3 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {selectedAgents.map((agent) => (
                        <div key={agent.id} className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-2xl font-bold text-black">{agent.verifiedDealsCount}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">deals</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Avg Discount % */}
                  <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center mb-3">
                      <TrendingDown className="h-4 w-4 text-black mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Avg Discount Secured</span>
                    </div>
                    <div className={`grid gap-3 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {selectedAgents.map((agent) => (
                        <div key={agent.id} className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-2xl font-bold text-success">{agent.avgDiscountPercent}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">below asking</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Auction Ratio */}
                  <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center mb-3">
                      <Target className="h-4 w-4 text-black mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Auction Success Ratio</span>
                    </div>
                    <div className={`grid gap-3 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {selectedAgents.map((agent) => (
                        <div key={agent.id} className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-2xl font-bold text-black">{agent.auctionSuccessRatio}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">success rate</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Off-Market Ratio */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Percent className="h-4 w-4 text-black mr-2" />
                      <span className="font-medium text-gray-900 dark:text-white">Off-Market Deal Ratio</span>
                    </div>
                    <div className={`grid gap-3 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {selectedAgents.map((agent) => (
                        <div key={agent.id} className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-2xl font-bold text-black">{agent.offMarketRatio}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">off-market</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Deal Mix Block */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <BarChart3 className="h-5 w-5 mr-2 text-black" />
                  Deal Mix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {selectedAgents.map((agent) => (
                    <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">{agent.name}</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Property Types</h5>
                          <div className="space-y-2">
                            {agent.propertyTypesMix && Object.entries(agent.propertyTypesMix).map(([type, percentage]) => (
                              <div key={type}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-700 dark:text-gray-300">{type}</span>
                                  <span className="font-semibold text-black">{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-success h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Price Band Distribution</h5>
                          <div className="space-y-2">
                            {agent.priceBandDistribution && Object.entries(agent.priceBandDistribution).map(([band, percentage]) => (
                              <div key={band}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-700 dark:text-gray-300">{band}</span>
                                  <span className="font-semibold text-black">{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div className="bg-success h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 4. Customer Voice Block */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <MessageSquare className="h-5 w-5 mr-2 text-black" />
                  Customer Voice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {selectedAgents.map((agent) => (
                    <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-6 w-6 text-gray-700 fill-current" />
                          <span className="text-3xl font-bold text-gray-900 dark:text-white ml-2">{agent.rating}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{agent.reviewCount} reviews</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 text-center">Top Tags</h5>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {agent.topTags && agent.topTags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-success/10 dark:bg-success/20 text-success dark:text-success border border-success/30 dark:border-success">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Compliance & Credibility Block */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Shield className="h-5 w-5 mr-2 text-black" />
                  Compliance & Credibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {selectedAgents.map((agent) => (
                    <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3">
                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Licence Number</h5>
                        <p className="text-sm text-gray-900 dark:text-white font-mono">{agent.licenceNumber || 'Not provided'}</p>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Industry Memberships</h5>
                        <div className="flex flex-wrap gap-1">
                          {agent.industryMemberships && agent.industryMemberships.map((membership, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-300 dark:border-gray-300 text-black dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                              {membership}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Professional Indemnity Insurance</h5>
                        <div className="flex items-center">
                          {agent.professionalIndemnity ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm text-success dark:text-success font-medium">Insured</span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-red-500 mr-2" />
                              <span className="text-sm text-red-600 dark:text-red-400 font-medium">Not Insured</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 6. Recent Deals Block */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Home className="h-5 w-5 mr-2 text-black" />
                  Recent Deals (Top 3)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${selectedAgents.length === 1 ? 'grid-cols-1' : selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' : selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {selectedAgents.map((agent) => (
                    <div key={agent.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{agent.name}</h4>
                      <div className="space-y-3">
                        {agent.recentSales && agent.recentSales.slice(0, 3).map((sale, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:border-gray-300 dark:hover:border-black border-2 border-transparent transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <Building2 className="h-4 w-4 text-black mt-1 flex-shrink-0" />
                              <span className="text-lg font-bold text-black ml-2">{sale.price}</span>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-white font-medium mb-2">{sale.address}</p>
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(sale.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {sale.daysOnMarket} days
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link to={`/agent/${agent.id}`} className="mt-3 block">
                        <Button size="sm" variant="ghost" className="w-full text-black hover:bg-primary hover:text-white">
                          View All Deals →
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {selectedAgents.length === 0 && (
          <Card className="text-center py-16 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent>
              <BarChart3 className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Start Comparing Buyer Agents</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Add buyer agents to compare their performance metrics, services, and track records side by side.
              </p>
              <Button 
                onClick={() => setShowAddAgent(true)} 
                className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white"
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
