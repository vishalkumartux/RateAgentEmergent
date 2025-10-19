import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Heart, 
  Clock, 
  Star, 
  Search, 
  MapPin, 
  Trash2,
  Eye,
  MessageCircle,
  TrendingUp,
  User,
  Settings,
  Bell,
  Download,
  Share2
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('saved');
  
  // Mock user data
  const userData = {
    name: "John Anderson",
    email: "john.anderson@email.com",
    location: "Sydney, NSW",
    memberSince: "March 2024"
  };

  // Mock saved agents (subset of mockAgents)
  const [savedAgents, setSavedAgents] = useState([
    mockAgents[0], // Sarah Johnson
    mockAgents[2], // Maria Rodriguez  
    mockAgents[4]  // Rachel Green
  ]);

  // Mock search history
  const searchHistory = [
    { id: 1, query: "luxury homes Sydney", date: "2024-08-03", results: 12 },
    { id: 2, query: "first home buyer Melbourne", date: "2024-08-01", results: 8 },
    { id: 3, query: "investment properties Brisbane", date: "2024-07-28", results: 15 },
    { id: 4, query: "waterfront Gold Coast", date: "2024-07-25", results: 6 }
  ];

  // Mock recent activity
  const recentActivity = [
    { id: 1, type: "saved", agent: "Sarah Johnson", date: "2024-08-03", action: "Saved agent profile" },
    { id: 2, type: "review", agent: "David Mitchell", date: "2024-08-02", action: "Left a 5-star review" },
    { id: 3, type: "contact", agent: "Maria Rodriguez", date: "2024-08-01", action: "Contacted agent" },
    { id: 4, type: "compare", agent: "Multiple agents", date: "2024-07-30", action: "Compared 3 agents" }
  ];

  const removeSavedAgent = (agentId) => {
    setSavedAgents(savedAgents.filter(agent => agent.id !== agentId));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'saved': return Heart;
      case 'review': return Star;
      case 'contact': return MessageCircle;
      case 'compare': return TrendingUp;
      default: return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {userData.name}!
              </h1>
              <p className="text-gray-600">
                Manage your saved agents, reviews, and search preferences
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{savedAgents.length}</div>
              <div className="text-gray-600 text-sm">Saved Agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{searchHistory.length}</div>
              <div className="text-gray-600 text-sm">Recent Searches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-gray-600 text-sm">Reviews Written</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-gray-600 text-sm">Days Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="saved">Saved Agents</TabsTrigger>
            <TabsTrigger value="history">Search History</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Saved Agents Tab */}
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-emerald-600" />
                    Saved Agents ({savedAgents.length})
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedAgents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedAgents.map((agent) => (
                      <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={agent.photo}
                                alt={agent.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                                <p className="text-gray-600 text-sm">{agent.company}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSavedAgent(agent.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-3">
                            <Star className="h-4 w-4 text-amber-400 fill-current" />
                            <span className="font-semibold">{agent.rating}</span>
                            <span className="text-gray-500 text-sm">({agent.reviewCount})</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            {agent.location}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Link to={`/agent/${agent.id}`} className="flex-1">
                              <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved agents yet</h3>
                    <p className="text-gray-600 mb-6">Start browsing agents and save your favorites for easy access.</p>
                    <Link to="/agents">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        Browse Agents
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-emerald-600" />
                  Search History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchHistory.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900">{search.query}</h4>
                        <p className="text-gray-600 text-sm">
                          {search.results} agents found • {search.date}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Search Again
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-gray-600 text-sm">
                            {activity.agent} • {activity.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-emerald-600" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900">{userData.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">{userData.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <p className="text-gray-900">{userData.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                        <p className="text-gray-900">{userData.memberSince}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Preferences</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Interests</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Luxury Homes</Badge>
                          <Badge variant="secondary">Investment Properties</Badge>
                          <Badge variant="secondary">Waterfront</Badge>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Sydney, NSW</Badge>
                          <Badge variant="secondary">Gold Coast, QLD</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;