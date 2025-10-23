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
  const [emailList, setEmailList] = useState(['']);
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

  const stats = [
    {
      title: 'Total Staff',
      value: (organization?.staff?.length || 0) + 1, // +1 for admin
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Invites',
      value: organization?.pendingInvites?.length || 0,
      icon: Mail,
      color: 'text-amber-600'
    },
    {
      title: 'Active Listings',
      value: 12, // Mock data
      icon: BarChart3,
      color: 'text-emerald-600'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      icon: Star,
      color: 'text-purple-600'
    }
  ];

  const handleEmailChange = (index, value) => {
    const newEmails = [...emailList];
    newEmails[index] = value;
    setEmailList(newEmails);
  };

  const addEmailField = () => {
    setEmailList([...emailList, '']);
  };

  const removeEmailField = (index) => {
    if (emailList.length > 1) {
      setEmailList(emailList.filter((_, i) => i !== index));
    }
  };

  const handleInviteStaff = async () => {
    const validEmails = emailList.filter(email => 
      email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
    
    if (validEmails.length === 0) {
      alert('Please enter valid email addresses');
      return;
    }
    
    setIsInviting(true);
    
    try {
      const result = await inviteStaff(validEmails);
      if (result.success) {
        setInviteSuccess(`Successfully sent ${validEmails.length} invitation(s)!`);
        setEmailList(['']); // Reset form
        setTimeout(() => setInviteSuccess(''), 3000);
      }
    } catch (error) {
      alert('Failed to send invitations. Please try again.');
    } finally {
      setIsInviting(false);
    }
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="invites">Pending Invites</TabsTrigger>
            <TabsTrigger value="settings">Organization Settings</TabsTrigger>
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
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{user?.email}</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-600 text-white">Admin</Badge>
                  </div>
                  
                  {/* Staff Members */}
                  {organization?.staff?.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 dark:bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {staff.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{staff.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{staff.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={staff.status === 'active' ? 'default' : 'secondary'}
                          className={staff.status === 'active' ? 'bg-green-600 text-white' : ''}
                        >
                          {staff.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No staff members yet. Send some invitations to get started!
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
                    {emailList.map((email, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmailChange(index, e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1"
                        />
                        {emailList.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEmailField(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addEmailField}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Email
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
                      <p className="text-green-600 font-medium">{inviteSuccess}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Invites List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-amber-600" />
                    Pending Invitations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {organization?.pendingInvites?.length > 0 ? (
                    <div className="space-y-3">
                      {organization.pendingInvites.map((invite) => (
                        <div key={invite.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{invite.email}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Invited by {invite.invitedBy} • {new Date(invite.sentAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">Pending</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePendingInvite(invite.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No pending invitations
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