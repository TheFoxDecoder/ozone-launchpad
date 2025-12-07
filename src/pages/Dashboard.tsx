import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Settings, 
  Key, 
  Activity, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff,
  Trash2,
  Crown,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sb } from '@/integrations/supabase/unsafeClient';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import type { ApiKey } from '@/types/supabase';

const Dashboard = () => {
  const { user, profile, userRole, signOut, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [newApiKeyName, setNewApiKeyName] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Fetch user's API keys
  const { data: apiKeys, isLoading: keysLoading } = useQuery<ApiKey[]>({
    queryKey: ['api-keys', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await sb
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []) as ApiKey[];
    },
    enabled: !!user
  });

  // Fetch user's access requests
  const { data: accessRequests } = useQuery({
    queryKey: ['access-requests', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data, error } = await sb
        .from('access_requests')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.email
  });

  // Generate API key mutation
  const generateApiKeyMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!user) throw new Error('Not authenticated');
      
      // Generate a random API key
      const keyPrefix = 'leap_';
      const keyBody = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      const fullKey = keyPrefix + keyBody;
      
      // Hash the key for storage (in a real app, use a proper hashing library)
      const keyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fullKey));
      const hashArray = Array.from(new Uint8Array(keyHash));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      const { data, error } = await sb
        .from('api_keys')
        .insert({
          user_id: user.id,
          name,
          key_hash: hashHex,
          key_prefix: keyPrefix,
          permissions: { read: true, write: false }
        })
        .select()
        .single();
      
      if (error) throw error;
      return { ...(data as ApiKey), full_key: fullKey };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      setShowApiKey(data.full_key);
      setNewApiKeyName('');
      toast({
        title: 'API Key Generated',
        description: 'Your new API key has been created. Make sure to copy it now!'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to generate API key. Please try again.',
        variant: 'destructive'
      });
    }
  });

  // Delete API key mutation
  const deleteApiKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const { error } = await sb
        .from('api_keys')
        .update({ is_active: false })
        .eq('id', keyId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      toast({
        title: 'API Key Deleted',
        description: 'The API key has been deactivated.'
      });
    }
  });

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'API key copied to clipboard.'
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-neural text-neural-glow">
                Welcome back, {profile?.first_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your LEAP account and access to Ozone technology
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {userRole && (
                <Badge className={`glass-mystical ${
                  userRole === 'admin' ? 'text-yellow-400 border-yellow-400/30' : 
                  userRole === 'editor' ? 'text-blue-400 border-blue-400/30' : 
                  userRole === 'researcher' ? 'text-purple-400 border-purple-400/30' :
                  'text-mystical border-mystical/30'
                }`} variant="secondary">
                  {userRole === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-glass-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-cyan to-mystical flex items-center justify-center">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-neural">
                    {apiKeys?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">API Keys</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-glass-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mystical to-brand-purple flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-mystical">
                    {accessRequests?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glass-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-neural">
                    0
                  </div>
                  <div className="text-sm text-muted-foreground">API Calls</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glass-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-neural">
                    Active
                  </div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="glass-apple">
            <TabsTrigger value="api-keys" className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <div className="space-y-6">
              <Card className="card-glass-neural">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>API Keys</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage your API keys for accessing LEAP services
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        if (newApiKeyName.trim()) {
                          generateApiKeyMutation.mutate(newApiKeyName.trim());
                        } else {
                          toast({
                            title: 'Name Required',
                            description: 'Please enter a name for your API key.',
                            variant: 'destructive'
                          });
                        }
                      }}
                      disabled={generateApiKeyMutation.isPending}
                      className="glass-apple hover-neural"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="key-name">Key Name</Label>
                      <Input
                        id="key-name"
                        placeholder="e.g., Production API Key"
                        value={newApiKeyName}
                        onChange={(e) => setNewApiKeyName(e.target.value)}
                        className="glass-apple border-mystical/20"
                      />
                    </div>
                  </div>

                  {showApiKey && (
                    <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-400 mb-2">
                              New API Key Generated
                            </p>
                            <div className="flex items-center space-x-2">
                              <code className="bg-black/20 px-3 py-1 rounded text-sm font-mono">
                                {showApiKey}
                              </code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(showApiKey)}
                                className="glass-apple"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowApiKey(null)}
                          >
                            <EyeOff className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ⚠️ Make sure to copy your API key now. You won't be able to see it again!
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    {keysLoading ? (
                      <div className="text-center py-8 text-muted-foreground">
                        Loading API keys...
                      </div>
                    ) : apiKeys?.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No API keys yet. Generate your first key to get started.
                      </div>
                    ) : (
                      apiKeys?.map((key) => (
                        <Card key={key.id} className="glass-apple">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <h4 className="font-medium">{key.name}</h4>
                                  <Badge variant="secondary" className="glass text-xs">
                                    {key.permissions?.read && key.permissions?.write ? 'Read/Write' : 'Read Only'}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                  <span>Created {new Date(key.created_at).toLocaleDateString()}</span>
                                  <span>•</span>
                                  <span>Used {key.usage_count || 0} times</span>
                                  {key.last_used_at && (
                                    <>
                                      <span>•</span>
                                      <span>Last used {new Date(key.last_used_at).toLocaleDateString()}</span>
                                    </>
                                  )}
                                </div>
                                <code className="text-xs font-mono text-muted-foreground">
                                  {key.key_prefix}••••••••••••••••
                                </code>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteApiKeyMutation.mutate(key.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="card-glass-neural">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your personal information and preferences
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      value={profile?.first_name || ''}
                      className="glass-apple border-mystical/20"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={profile?.last_name || ''}
                      className="glass-apple border-mystical/20"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={user.email || ''}
                    disabled
                    className="glass-apple border-mystical/20 opacity-60"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>
                <Button className="glass-apple hover-neural">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="card-glass-neural">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your recent interactions with the LEAP platform
                </p>
              </CardHeader>
              <CardContent>
                {accessRequests?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent activity
                  </div>
                ) : (
                  <div className="space-y-3">
                    {accessRequests?.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 glass-apple rounded-lg">
                        <div>
                          <p className="font-medium">Contact Request</p>
                          <p className="text-sm text-muted-foreground">
                            {request.request_type} - {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={`glass ${
                          request.status === 'approved' ? 'text-green-400 border-green-400/30' :
                          request.status === 'rejected' ? 'text-red-400 border-red-400/30' :
                          'text-yellow-400 border-yellow-400/30'
                        }`} variant="secondary">
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="card-glass-neural">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your account preferences and security
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 glass-apple rounded-lg">
                  <div>
                    <h4 className="font-medium">Sign Out</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign out of your LEAP account
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleSignOut} className="glass-apple">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;