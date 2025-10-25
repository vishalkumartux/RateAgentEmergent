import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import SEO from '../components/SEO';
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
  Share2,
  Edit,
  Play,
  CheckCircle,
  AlertCircle,
  Flag,
  Home,
  Users,
  Briefcase,
  Mail,
  ChevronRight,
  X,
  Plus,
  Bed,
  Bath,
  Car,
  DollarSign,
  FileText,
  BarChart3
} from 'lucide-react';
import { mockAgents } from '../mock/agentData';
import { mockDeals, formatDealPrice } from '../mock/dealData';
import { mockReviews } from '../mock/reviewData';

const UserDashboardComplete = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // LocalStorage keys
  const STORAGE_KEYS = {
    SAVED_SEARCHES: 'agentrate_saved_searches',
    SHORTLISTED_AGENTS: 'agentrate_shortlisted_agents',
    SHORTLISTED_DEALS: 'agentrate_shortlisted_deals',
    AGENT_NOTES: 'agentrate_agent_notes',
    DEAL_CONTACTED: 'agentrate_deal_contacted',
    RECENT_ACTIVITY: 'agentrate_recent_activity',
    ALERT_SETTINGS: 'agentrate_alert_settings'
  };

  // Initialize state from localStorage
  const [savedSearches, setSavedSearches] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_SEARCHES);
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Sydney Houses <$1M', filters: { location: 'Sydney', propertyType: 'House', maxPrice: 1000000 }, lastRun: '2024-08-05', resultCount: 42, previousCount: 38, alertEnabled: true },
      { id: 2, name: 'Melbourne Investment Units', filters: { location: 'Melbourne', propertyType: 'Unit', strategies: ['Investment'] }, lastRun: '2024-08-03', resultCount: 28, previousCount: 28, alertEnabled: true },
      { id: 3, name: 'Brisbane First Home', filters: { location: 'Brisbane', maxPrice: 800000, strategies: ['PPOR'] }, lastRun: '2024-08-01', resultCount: 15, previousCount: 12, alertEnabled: false }
    ];
  });

  const [shortlistedAgents, setShortlistedAgents] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SHORTLISTED_AGENTS);
    return stored ? JSON.parse(stored) : [1, 2, 3].map(id => mockAgents.find(a => a.id === id));
  });

  const [shortlistedDeals, setShortlistedDeals] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SHORTLISTED_DEALS);
    return stored ? JSON.parse(stored) : [1, 2, 3].map(id => mockDeals.find(d => d.id === id));
  });

  const [agentNotes, setAgentNotes] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.AGENT_NOTES);
    return stored ? JSON.parse(stored) : {};
  });

  const [dealContacted, setDealContacted] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.DEAL_CONTACTED);
    return stored ? JSON.parse(stored) : {};
  });

  const [recentActivity, setRecentActivity] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITY);
    return stored ? JSON.parse(stored) : [
      { id: 1, type: 'search', description: 'Ran search "Sydney Houses <$1M"', timestamp: '2024-08-05T10:30:00' },
      { id: 2, type: 'shortlist', description: 'Shortlisted deal in Bondi', timestamp: '2024-08-05T09:15:00' },
      { id: 3, type: 'compare', description: 'Compared 3 buyer agents', timestamp: '2024-08-04T16:45:00' },
      { id: 4, type: 'review', description: 'Posted review for Sarah Johnson', timestamp: '2024-08-03T14:20:00' }
    ];
  });

  const [alertSettings, setAlertSettings] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ALERT_SETTINGS);
    return stored ? JSON.parse(stored) : { globalCadence: 'daily' };
  });

  const [selectedAgentsForCompare, setSelectedAgentsForCompare] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Mock user reviews
  const myReviews = mockReviews.filter(r => r.reviewerInitials === 'M.C.').map(r => ({
    ...r,
    status: 'published',
    canEdit: true,
    daysOld: Math.floor((new Date() - new Date(r.date)) / (1000 * 60 * 60 * 24))
  }));

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_SEARCHES, JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHORTLISTED_AGENTS, JSON.stringify(shortlistedAgents));
  }, [shortlistedAgents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHORTLISTED_DEALS, JSON.stringify(shortlistedDeals));
  }, [shortlistedDeals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AGENT_NOTES, JSON.stringify(agentNotes));
  }, [agentNotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEAL_CONTACTED, JSON.stringify(dealContacted));
  }, [dealContacted]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALERT_SETTINGS, JSON.stringify(alertSettings));
  }, [alertSettings]);

  // Handlers
  const handleRunSearch = (search) => {
    const params = new URLSearchParams(search.filters);
    navigate(`/deals?${params.toString()}`);
  };

  const handleToggleAlert = (searchId) => {
    setSavedSearches(prev => prev.map(s => 
      s.id === searchId ? { ...s, alertEnabled: !s.alertEnabled } : s
    ));
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  const handleRemoveAgent = (agentId) => {
    setShortlistedAgents(prev => prev.filter(a => a.id !== agentId));
  };

  const handleRemoveDeal = (dealId) => {
    setShortlistedDeals(prev => prev.filter(d => d.id !== dealId));
  };

  const handleToggleDealContacted = (dealId) => {
    setDealContacted(prev => ({ ...prev, [dealId]: !prev[dealId] }));
  };

  const handleSaveNote = (agentId) => {
    setAgentNotes(prev => ({ ...prev, [agentId]: noteText }));
    setEditingNote(null);
    setNoteText('');
  };

  const handleToggleAgentCompare = (agentId) => {
    setSelectedAgentsForCompare(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : prev.length < 4 ? [...prev, agentId] : prev
    );
  };

  const handleCompareAgents = () => {
    if (selectedAgentsForCompare.length >= 2) {
      navigate(`/compare?agents=${selectedAgentsForCompare.join(',')}`);
    }
  };

  const handleExportAgents = () => {
    const csv = shortlistedAgents.map(a => 
      `${a.name},${a.company},${a.rating},${a.reviewCount},${a.verifiedDealsCount}`
    ).join('\n');
    const blob = new Blob([`Name,Company,Rating,Reviews,Deals\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shortlisted-agents.csv';
    link.click();
  };

  const handleExportDeals = () => {
    const csv = shortlistedDeals.map(d => 
      `${d.suburb},${d.propertyType},${d.bedrooms},${d.bathrooms},${d.purchasePrice}`
    ).join('\n');
    const blob = new Blob([`Location,Type,Beds,Baths,Price\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shortlisted-deals.csv';
    link.click();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'search': return Search;
      case 'shortlist': return Heart;
      case 'compare': return BarChart3;
      case 'review': return Star;
      default: return Eye;
    }
  };

  const stats = [
    { label: 'Saved Searches', value: savedSearches.length, icon: Search, color: 'text-black', bgColor: 'bg-gray-100 dark:bg-gray-900' },
    { label: 'Shortlisted Agents', value: shortlistedAgents.length, icon: Users, color: 'text-black', bgColor: 'bg-gray-100 dark:bg-gray-900' },
    { label: 'Shortlisted Deals', value: shortlistedDeals.length, icon: Home, color: 'text-success', bgColor: 'bg-green-100 dark:bg-success/20' },
    { label: 'Reviews Posted', value: myReviews.length, icon: Star, color: 'text-gray-700', bgColor: 'bg-gray-100 dark:bg-gray-100' }
  ];

  return (
    <>
      <SEO 
        title="My Dashboard | AgentRate"
        description="Manage your saved searches, shortlisted agents, property deals, and reviews."
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your property search control center
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/profile">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="bg-card border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700">
              <TabsList className="w-full bg-transparent grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-0">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-success data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:bg-primary/10 transition-all rounded-lg py-3 px-4"
                >
                  <BarChart3 className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="searches" 
                  className="data-[state=active]:bg-success data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:bg-primary/10 transition-all rounded-lg py-3 px-4"
                >
                  <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Searches</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="agents" 
                  className="data-[state=active]:bg-success data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:bg-primary/10 transition-all rounded-lg py-3 px-4"
                >
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Agents</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="deals" 
                  className="data-[state=active]:bg-success data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:bg-primary/10 transition-all rounded-lg py-3 px-4"
                >
                  <Home className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Deals</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="data-[state=active]:bg-success data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:bg-primary/10 transition-all rounded-lg py-3 px-4"
                >
                  <Star className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Reviews</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="data-[state=active]:bg-success data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-300 hover:bg-primary/10 transition-all rounded-lg py-3 px-4"
                >
                  <Bell className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Quick Actions */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-gradient-to-br from-gray-900 to-yellow-50 dark:from-gray-900 dark:to-yellow-950 border-2 border-gray-300 dark:border-gray-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Link to="/">
                          <Button className="w-full bg-success hover:bg-success/90 text-white shadow-sm h-12">
                            <Search className="h-4 w-4 mr-2" />
                            New Search
                          </Button>
                        </Link>
                        <Link to="/agents">
                          <Button className="w-full bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white h-12">
                            <Users className="h-4 w-4 mr-2" />
                            Browse Agents
                          </Button>
                        </Link>
                        <Link to="/deals">
                          <Button className="w-full bg-success hover:bg-success/90 text-white shadow-sm h-12">
                            <Home className="h-4 w-4 mr-2" />
                            Browse Deals
                          </Button>
                        </Link>
                        <Link to="/submit-review">
                          <Button className="w-full bg-gray-700 hover:bg-primary/10 text-white h-12">
                            <Star className="h-4 w-4 mr-2" />
                            Write Review
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="bg-card border-gray-200 dark:border-gray-700">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="flex items-center text-gray-900 dark:text-white">
                        <Clock className="h-5 w-5 mr-2 text-gray-700" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {recentActivity.map(activity => {
                          const Icon = getActivityIcon(activity.type);
                          return (
                            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Icon className="h-4 w-4 text-gray-700" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {new Date(activity.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Summary Cards */}
                <div className="space-y-6">
                  <Card className="bg-card border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">At a Glance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Search className="h-5 w-5 text-black" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Saved Searches</span>
                        </div>
                        <Badge className="bg-success text-white">{savedSearches.length}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-black" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Shortlisted Agents</span>
                        </div>
                        <Badge className="bg-success text-white">{shortlistedAgents.length}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-success/10 dark:bg-success/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Home className="h-5 w-5 text-success" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Shortlisted Deals</span>
                        </div>
                        <Badge className="bg-success text-white">{shortlistedDeals.length}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-gray-700" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Reviews Posted</span>
                        </div>
                        <Badge className="bg-gray-700 text-white">{myReviews.length}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-gray-200 dark:border-black">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-10 w-10 text-black mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pro Tip</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Set up alerts on your saved searches to get notified when new matching deals are added!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Searches Tab */}
            <TabsContent value="searches">
              {/* Saved Searches Widget */}
              <Card className="bg-card border-gray-200 dark:border-gray-700">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Search className="h-5 w-5 mr-2 text-black" />
                      Saved Searches
                    </CardTitle>
                    <Link to="/">
                      <Button size="sm" variant="outline" className="border-gray-300 text-black hover:bg-primary hover:text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        New Search
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {savedSearches.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No saved searches yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Create a search on the homepage to get started</p>
                      <Link to="/">
                        <Button className="bg-success hover:bg-success/90 text-white shadow-sm">
                          Create Search
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedSearches.map(search => {
                        const delta = search.resultCount - search.previousCount;
                        return (
                          <div key={search.id} className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-primary transition-all">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{search.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Last run: {new Date(search.lastRun).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`${delta > 0 ? 'bg-green-100 dark:bg-success/20 text-success dark:text-success' : delta < 0 ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'}`}>
                                  {search.resultCount} results
                                  {delta !== 0 && (
                                    <span className="ml-1">
                                      {delta > 0 ? `+${delta}` : delta}
                                    </span>
                                  )}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              <Button
                                size="sm"
                                onClick={() => handleRunSearch(search)}
                                className="bg-success hover:bg-success/90 text-white shadow-sm"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Run
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate('/')}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant={search.alertEnabled ? "default" : "outline"}
                                onClick={() => handleToggleAlert(search.id)}
                                className={search.alertEnabled ? "bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white" : ""}
                              >
                                <Bell className="h-3 w-3 mr-1" />
                                {search.alertEnabled ? 'Alert On' : 'Alert Off'}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteSearch(search.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agents Tab */}
            <TabsContent value="agents">
              {/* Shortlisted Agents Widget */}
              <Card className="bg-card border-gray-200 dark:border-gray-700">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Users className="h-5 w-5 mr-2 text-black" />
                      Shortlisted Agents ({shortlistedAgents.length})
                    </CardTitle>
                    <div className="flex gap-2">
                      {selectedAgentsForCompare.length >= 2 && (
                        <Button 
                          size="sm"
                          onClick={handleCompareAgents}
                          className="bg-gray-700 hover:bg-primary/10 text-white"
                        >
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Compare ({selectedAgentsForCompare.length})
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleExportAgents}
                        disabled={shortlistedAgents.length === 0}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {shortlistedAgents.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No agents shortlisted</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Browse agents and save your favorites</p>
                      <Link to="/agents">
                        <Button className="bg-success hover:bg-success/90 text-white hover:text-white shadow-sm text-white">
                          Browse Agents
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {shortlistedAgents.map(agent => (
                        <div key={agent.id} className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={selectedAgentsForCompare.includes(agent.id)}
                              onCheckedChange={() => handleToggleAgentCompare(agent.id)}
                              disabled={!selectedAgentsForCompare.includes(agent.id) && selectedAgentsForCompare.length >= 4}
                            />
                            <Link to={`/agent/${agent.id}`} className="flex-shrink-0">
                              <img 
                                src={agent.photo} 
                                alt={agent.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            </Link>
                            <div className="flex-1">
                              <Link to={`/agent/${agent.id}`}>
                                <h4 className="font-semibold text-gray-900 dark:text-white hover:text-black transition-colors">
                                  {agent.name}
                                </h4>
                              </Link>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{agent.company}</p>
                              <div className="flex items-center gap-3 mt-2 text-sm">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-gray-700 fill-current mr-1" />
                                  {agent.rating}
                                </div>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-600 dark:text-gray-400">{agent.verifiedDealsCount} deals</span>
                              </div>
                              
                              {/* Notes */}
                              {editingNote === agent.id ? (
                                <div className="mt-3">
                                  <Textarea
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Add your notes..."
                                    className="mb-2 bg-background text-foreground"
                                    rows={2}
                                  />
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => handleSaveNote(agent.id)} className="bg-success hover:bg-success/90 text-white shadow-sm">
                                      Save
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => { setEditingNote(null); setNoteText(''); }}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : agentNotes[agent.id] ? (
                                <div className="mt-3 p-2 bg-gray-200 dark:bg-gray-200 rounded text-sm">
                                  <div className="flex items-start justify-between">
                                    <p className="text-gray-700 dark:text-gray-300">{agentNotes[agent.id]}</p>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => { setEditingNote(agent.id); setNoteText(agentNotes[agent.id]); }}
                                      className="h-6 px-2"
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => { setEditingNote(agent.id); setNoteText(''); }}
                                  className="mt-2 text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add note
                                </Button>
                              )}
                            </div>
                            
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveAgent(agent.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deals Tab */}
            <TabsContent value="deals">
              {/* Shortlisted Deals Widget */}
              <Card className="bg-card border-gray-200 dark:border-gray-700">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Home className="h-5 w-5 mr-2 text-success" />
                      Shortlisted Deals ({shortlistedDeals.length})
                    </CardTitle>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleExportDeals}
                      disabled={shortlistedDeals.length === 0}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {shortlistedDeals.length === 0 ? (
                    <div className="text-center py-12">
                      <Home className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No deals shortlisted</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Browse property deals and save interesting ones</p>
                      <Link to="/deals">
                        <Button className="bg-success hover:bg-success/90 text-white shadow-sm">
                          Browse Deals
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {shortlistedDeals.map(deal => (
                        <div key={deal.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <Link to={`/deal/${deal.id}`}>
                            <img 
                              src={deal.photos[0]} 
                              alt={deal.address}
                              className="w-full h-32 object-cover hover:opacity-90 transition-opacity"
                            />
                          </Link>
                          <div className="p-4">
                            <Link to={`/deal/${deal.id}`}>
                              <h4 className="font-semibold text-gray-900 dark:text-white hover:text-success transition-colors mb-1">
                                {deal.suburb}, {deal.state}
                              </h4>
                            </Link>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <span className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                {deal.bedrooms}
                              </span>
                              <span className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                {deal.bathrooms}
                              </span>
                              <span className="flex items-center">
                                <Car className="h-4 w-4 mr-1" />
                                {deal.carSpaces}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-success mb-3">
                              {formatDealPrice(deal)}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={dealContacted[deal.id] ? "default" : "outline"}
                                onClick={() => handleToggleDealContacted(deal.id)}
                                className={dealContacted[deal.id] ? "bg-success hover:bg-success/90 text-white shadow-sm" : ""}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {dealContacted[deal.id] ? 'Contacted' : 'Mark Contacted'}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveDeal(deal.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              {/* My Reviews Widget */}
              <Card className="bg-card border-gray-200 dark:border-gray-700">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Star className="h-5 w-5 mr-2 text-yellow-600" />
                      My Reviews
                    </CardTitle>
                    <Link to="/submit-review">
                      <Button size="sm" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Write Review
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {myReviews.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">No reviews yet</p>
                      <Link to="/submit-review">
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
                          Write Your First Review
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myReviews.map(review => (
                        <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <Link to={`/agent/${review.agentId}`} className="font-semibold text-gray-900 dark:text-white hover:text-black">
                              {review.agentName}
                            </Link>
                            <Badge className={
                              review.status === 'published' ? 'bg-green-100 dark:bg-success/20 text-success dark:text-success' :
                              review.status === 'pending' ? 'bg-gray-200 dark:bg-gray-200 text-yellow-700 dark:text-yellow-400' :
                              'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                            }>
                              {review.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-gray-700 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{review.comment}</p>
                          <div className="flex gap-2">
                            {review.canEdit && review.daysOld <= 7 && (
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit ({7 - review.daysOld}d left)
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              {/* Alerts Settings Widget */}
              <Card className="bg-card border-gray-200 dark:border-gray-700">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <Bell className="h-5 w-5 mr-2 text-red-600" />
                    Alert Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email Cadence
                      </label>
                      <Select 
                        value={alertSettings.globalCadence}
                        onValueChange={(value) => setAlertSettings({ ...alertSettings, globalCadence: value })}
                      >
                        <SelectTrigger className="bg-background text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Active Alerts</p>
                      <div className="space-y-2">
                        {savedSearches.filter(s => s.alertEnabled).map(search => (
                          <div key={search.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                            <span className="text-sm text-gray-900 dark:text-white">{search.name}</span>
                            <Badge className="bg-green-100 dark:bg-success/20 text-success dark:text-success">
                              <Bell className="h-3 w-3 mr-1" />
                              On
                            </Badge>
                          </div>
                        ))}
                        {savedSearches.filter(s => s.alertEnabled).length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            No active alerts
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default UserDashboardComplete;
