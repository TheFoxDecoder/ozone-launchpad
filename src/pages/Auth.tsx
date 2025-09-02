import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '@/components/AnimatedLogo';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(signInData.email, signInData.password);
      
      if (error) {
        toast({
          title: 'Sign In Failed',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'Successfully signed in to LEAP.'
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: 'Passwords Don\'t Match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive'
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(
        signUpData.email,
        signUpData.password,
        signUpData.firstName,
        signUpData.lastName
      );
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Account Already Exists',
            description: 'An account with this email already exists. Please sign in instead.',
            variant: 'destructive'
          });
          setActiveTab('signin');
        } else {
          toast({
            title: 'Sign Up Failed',
            description: error.message,
            variant: 'destructive'
          });
        }
      } else {
        toast({
          title: 'Account Created!',
          description: 'Please check your email to confirm your account.',
        });
        setActiveTab('signin');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan via-mystical to-brand-purple animate-matrix-rain"></div>
      </div>
      
      <div className="absolute top-16 left-8 w-80 h-80 bg-gradient-to-r from-mystical/15 to-brand-purple/8 rounded-full blur-3xl animate-quantum-float"></div>
      <div className="absolute bottom-16 right-8 w-96 h-96 bg-gradient-to-r from-brand-cyan/12 to-mystical/10 rounded-full blur-3xl animate-quantum-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-slide-in-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-mystical to-brand-purple blur-xl opacity-20 animate-neural-pulse"></div>
            <AnimatedLogo />
          </div>
        </div>

        <Card className="card-glass-neural border-0 shadow-2xl animate-slide-in-up animate-delay-200">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Badge className="glass-mystical text-mystical border-mystical/30 px-4 py-2 animate-neural-pulse" variant="secondary">
                <Sparkles className="w-4 h-4 mr-2 animate-ai-thinking" />
                Access LEAP Platform
              </Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold gradient-neural text-neural-glow">
              Welcome to the Future
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Join the AI revolution with Ozone technology
            </p>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 glass-apple mb-6">
                <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 glass-apple border-mystical/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 glass-apple border-mystical/20"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full glass-apple hover-neural group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/30 to-mystical/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </span>
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname" className="text-sm font-medium">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-firstname"
                          placeholder="John"
                          value={signUpData.firstName}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="pl-10 glass-apple border-mystical/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname" className="text-sm font-medium">Last Name</Label>
                      <Input
                        id="signup-lastname"
                        placeholder="Doe"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="glass-apple border-mystical/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 glass-apple border-mystical/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 glass-apple border-mystical/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 glass-apple border-mystical/20"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full glass-apple hover-neural group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-mystical/30 to-brand-purple/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </span>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>Secure authentication powered by Supabase</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground animate-slide-in-up animate-delay-300">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;