import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Building2, 
  Users, 
  Mail, 
  Plus, 
  Trash2, 
  Send,
  Settings,
  BarChart3,
  Star,
  CheckCircle,
  Clock,
  X,
  Edit,
  Eye,
  TrendingUp,
  Calendar,
  AlertCircle,
  UserCheck,
  ShieldCheck,
  Target,
  RefreshCw,
  UserX,
  UserPlus,
  LightbulbIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Select = ({ value, onChange, children, className = '' }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
  >
    {children}
  </select>
);

const AdminDashboard = () => {
  const { user, organization, updateOrganization, inviteStaff } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [inviteList, setInviteList] = useState([{ email: '', role: 'agent' }]);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [editingOrg, setEditingOrg] = useState(false);
  const [orgData, setOrgData] = useState({
    name: organization?.name || '',
    email: organization?.email || '',
    phone: organization?.phone || '',
    address: organization?.address || '',
    website: organization?.website || '',
    description: organization?.description || ''
  });

  // Enhanced stats with new metrics
  const stats = [
    {
      title: 'Published Deals',
      value: 12,
      icon: BarChart3,
      color: 'text-blue-600',
      change: '+3 this month'
    },
    {
      title: 'Verified Deals',
      value: 8,
      icon: ShieldCheck,
      color: 'text-green-600',
      change: '67% verified'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      icon: Star,
      color: 'text-amber-600',
      change: 'Last 12 months'
    },
    {
      title: 'Median Days-to-Secure',
      value: '42',
      icon: Calendar,
      color: 'text-purple-600',
      change: '6 days faster'
    },
    {
      title: 'Profile Views',
      value: '1,247',
      icon: Eye,
      color: 'text-indigo-600',
      change: 'Last 30 days'
    },
    {
      title: 'New Leads',
      value: 18,
      icon: TrendingUp,
      color: 'text-emerald-600',
      change: '+5 this week'
    }
  ];

  // Nudges based on current state
  const nudges = [];
  if ((organization?.stats?.publishedDeals || 12) < 3) {
    nudges.push({
      type: 'action',
      title: 'Add your first 3 deals',
      description: 'Get started by adding successful deals to showcase your track record.',
      action: 'Add Deal',
      link: '/staff/deals/add',
      icon: BarChart3
    });
  }
  if ((organization?.stats?.verifiedDeals || 8) < 5) {
    nudges.push({
      type: 'tip',
      title: 'Verify a deal to boost trust',
      description: 'Verified deals increase buyer confidence by 73%.',
      action: 'Learn More',
      link: '/help/verification',
      icon: ShieldCheck
    });
  }
  if (organization?.staff?.length < 2) {
    nudges.push({
      type: 'action',
      title: 'Complete agent profiles',
      description: 'Profiles with photos and bios get 3x more engagement.',
      action: 'View Profiles',
      link: '/admin/dashboard',
      icon: Users
    });
  }

  const handleInviteChange = (index, field, value) => {
    const newInvites = [...inviteList];
    newInvites[index][field] = value;
    setInviteList(newInvites);
  };

  const addInviteField = () => {
    setInviteList([...inviteList, { email: '', role: 'agent' }]);
  };

  const removeInviteField = (index) => {
    if (inviteList.length > 1) {
      setInviteList(inviteList.filter((_, i) => i !== index));
    }
  };

  const handleInviteStaff = async () => {
    const validInvites = inviteList.filter(invite => 
      invite.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email)
    );
    
    if (validInvites.length === 0) {
      alert('Please enter valid email addresses');
      return;
    }
    
    setIsInviting(true);
    
    try {
      const result = await inviteStaff(validInvites.map(i => i.email));
      if (result.success) {
        setInviteSuccess(`Successfully sent ${validInvites.length} invitation(s)!`);
        setInviteList([{ email: '', role: 'agent' }]); // Reset form
        setTimeout(() => setInviteSuccess(''), 3000);
      }
    } catch (error) {
      alert('Failed to send invitations. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  const resendInvite = (inviteId) => {
    // Mock resend functionality
    setInviteSuccess('Invitation resent successfully!');
    setTimeout(() => setInviteSuccess(''), 3000);
  };

  const toggleStaffStatus = (staffId, currentStatus) => {
    // Mock toggle functionality
    const updatedStaff = organization?.staff?.map(s => 
      s.id === staffId ? { ...s, status: currentStatus === 'active' ? 'inactive' : 'active' } : s
    ) || [];
    updateOrganization({ staff: updatedStaff });
  };

  const handleOrgUpdate = () => {
    updateOrganization(orgData);
    setEditingOrg(false);
  };

  const removePendingInvite = (inviteId) => {
    const updatedInvites = organization?.pendingInvites?.filter(invite => invite.id !== inviteId) || [];
    updateOrganization({ pendingInvites: updatedInvites });
  };

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Organization Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please complete your organization setup first.
            </p>
            <Link to="/organization-setup">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Setup Organization
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {organization.name} - Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Manage your organization, staff, and settings
            </p>
          </div>
          <Link to="/admin/settings">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <Settings className="h-4 w-4 mr-2" />
              Org Settings
            </Button>
          </Link>
        </div>

        {/* Nudges Section */}
        {nudges.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nudges.map((nudge, index) => {
                const Icon = nudge.icon;
                return (
                  <Card key={index} className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                            {nudge.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {nudge.description}
                          </p>
                          <Link to={nudge.link}>
                            <Button size="sm" variant="ghost" className="text-amber-600 hover:text-amber-700 p-0 h-auto">
                              {nudge.action} →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{stat.change}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="invites">Invite & Manage</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Organization Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-amber-600" />
                    Organization Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{organization.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{organization.email || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{organization.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                    <p className="text-gray-900 dark:text-white">{organization.address || 'Not set'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-amber-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Organization setup completed</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Today</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Admin account activated</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Today</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Staff Management Tab */}
          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-amber-600" />
                    Staff Members
                  </div>
                  <Badge variant="secondary">
                    {(organization?.staff?.length || 0) + 1} Total
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Admin (Current User) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                          <Badge className="bg-amber-600 text-white">Admin</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{user?.email}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Last active: Today
                          </span>
                          <span>•</span>
                          <span>Account created: Jan 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Staff Members */}
                  {organization?.staff?.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gray-600 dark:bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {staff.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{staff.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {staff.role || 'Agent'}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{staff.email}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last active: {staff.lastActive || '2 days ago'}
                            </span>
                            <span>•</span>
                            <span>Invited: {staff.invitedDate || 'Mar 2024'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={staff.status === 'active' ? 'default' : 'secondary'}
                          className={staff.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}
                        >
                          {staff.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleStaffStatus(staff.id, staff.status)}
                          title={staff.status === 'active' ? 'Deactivate' : 'Reactivate'}
                        >
                          {staff.status === 'active' ? (
                            <UserX className="h-4 w-4 text-red-600" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-green-600" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" title="View Profile">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-12">
                      <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No staff members yet</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Send invitations to add agents to your team</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Invites Tab */}
          <TabsContent value="invites">
            <div className="space-y-6">
              {/* Send New Invites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="h-5 w-5 mr-2 text-amber-600" />
                    Invite Staff Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inviteList.map((invite, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3">
                        <div className="col-span-7">
                          <Input
                            type="email"
                            value={invite.email}
                            onChange={(e) => handleInviteChange(index, 'email', e.target.value)}
                            placeholder="colleague@example.com"
                            className="w-full"
                          />
                        </div>
                        <div className="col-span-4">
                          <Select
                            value={invite.role}
                            onChange={(e) => handleInviteChange(index, 'role', e.target.value)}
                            className="w-full"
                          >
                            <option value="agent">Agent</option>
                            <option value="admin">Admin</option>
                          </Select>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          {inviteList.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInviteField(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addInviteField}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another
                      </Button>
                      
                      <Button
                        onClick={handleInviteStaff}
                        disabled={isInviting}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        {isInviting ? 'Sending...' : 'Send Invitations'}
                      </Button>
                    </div>
                    
                    {inviteSuccess && (
                      <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-green-800 dark:text-green-200 font-medium">{inviteSuccess}</p>
                      </div>
                    )}
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Role Permissions:</strong>
                          <ul className="mt-1 space-y-1">
                            <li>• <strong>Admin:</strong> Full access to dashboard, settings, and staff management</li>
                            <li>• <strong>Agent:</strong> Can manage own profile and deals only</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Invites List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-amber-600" />
                      Pending Invitations
                    </div>
                    {organization?.pendingInvites?.length > 0 && (
                      <Badge variant="secondary">
                        {organization.pendingInvites.length} Pending
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {organization?.pendingInvites?.length > 0 ? (
                    <div className="space-y-3">
                      {organization.pendingInvites.map((invite) => (
                        <div key={invite.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-semibold text-gray-900 dark:text-white">{invite.email}</p>
                              <Badge variant="outline" className="text-xs">
                                {invite.role || 'Agent'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                              <span>Invited by {invite.invitedBy}</span>
                              <span>•</span>
                              <span>{new Date(invite.sentAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {Math.floor((Date.now() - new Date(invite.sentAt)) / (1000 * 60 * 60 * 24))} days ago
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              Pending
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resendInvite(invite.id)}
                              title="Resend invitation"
                            >
                              <RefreshCw className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePendingInvite(invite.id)}
                              title="Cancel invitation"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No pending invitations</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">All sent invitations have been accepted or expired</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-amber-600" />
                    Organization Settings
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setEditingOrg(!editingOrg)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingOrg ? 'Cancel' : 'Edit'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={orgData.name}
                      onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!editingOrg}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="orgEmail">Email</Label>
                    <Input
                      id="orgEmail"
                      value={orgData.email}
                      onChange={(e) => setOrgData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!editingOrg}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgPhone">Phone</Label>
                    <Input
                      id="orgPhone"
                      value={orgData.phone}
                      onChange={(e) => setOrgData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!editingOrg}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="orgWebsite">Website</Label>
                    <Input
                      id="orgWebsite"
                      value={orgData.website}
                      onChange={(e) => setOrgData(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!editingOrg}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="orgAddress">Address</Label>
                  <Textarea
                    id="orgAddress"
                    value={orgData.address}
                    onChange={(e) => setOrgData(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!editingOrg}
                    className="mt-1 h-20"
                  />
                </div>
                
                <div>
                  <Label htmlFor="orgDescription">Description</Label>
                  <Textarea
                    id="orgDescription"
                    value={orgData.description}
                    onChange={(e) => setOrgData(prev => ({ ...prev, description: e.target.value }))}
                    disabled={!editingOrg}
                    className="mt-1 h-24"
                  />
                </div>
                
                {editingOrg && (
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={handleOrgUpdate}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingOrg(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;