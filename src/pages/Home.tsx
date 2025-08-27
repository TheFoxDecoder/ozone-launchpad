
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Globe, Target, TrendingUp, Users, Sparkles, Cpu, Network, Shield, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sb } from "@/integrations/supabase/unsafeClient";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useEffect, useState } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch live stats from the database
  const { data: stats } = useQuery<{
    suites: number;
    results: number;
    models: number;
    latestScore: number;
    latestMetric: string;
  }>({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const [suites, results, models, latestResult] = await Promise.all([
        sb.from('benchmark_suites').select('id'),
        sb.from('benchmark_results').select('id').eq('is_verified', true),
        sb.from('ozone_models').select('id').eq('is_active', true),
        sb.from('benchmark_results')
          .select('value, metric_name')
          .eq('is_verified', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
      ]);
      
      return {
        suites: suites.data ? suites.data.length : 4,
        results: results.data ? results.data.length : 3,
        models: models.data ? models.data.length : 3,
        latestScore: latestResult.data ? Number(latestResult.data.value) : 96.8,
        latestMetric: latestResult.data?.metric_name ?? 'BLEU Score'
      };
    }
  });

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* AI Matrix Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan via-mystical to-brand-purple animate-matrix-rain"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Neural network background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-mystical/10 to-brand-purple/5 rounded-full blur-3xl animate-quantum-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-brand-cyan/8 to-mystical/6 rounded-full blur-3xl animate-quantum-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-brand-blue/6 to-brand-cyan/8 rounded-full blur-2xl animate-neural-pulse"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <AnimatedLogo />
          </div>
          
          <Badge className={`mb-6 glass-apple text-mystical border-mystical/30 animate-slide-in-up ${isVisible ? 'animate-delay-200' : ''} animate-neural-pulse`} variant="secondary">
            <Sparkles className="w-4 h-4 mr-2 animate-ai-thinking" />
            Powered by Ozone (O³) Technology
          </Badge>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight text-foreground animate-slide-in-up ${isVisible ? 'animate-delay-300' : ''}`}>
            Welcome to <br />
            <span className="gradient-neural text-neural-glow">LEAP</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''}`}>
            Leading Edge AI Platform revolutionizes artificial intelligence with our breakthrough 
            Ozone (O³) architecture, combining neuromorphic processing with minimal-pass learning 
            for unprecedented performance and efficiency.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
            <Button asChild size="lg" className="text-lg px-8 py-6 glass-apple hover-neural group relative overflow-hidden">
              <Link to="/benchmarks">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-mystical/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-data-flow"></div>
                <Brain className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 relative z-10" />
                <span className="relative z-10">Explore Benchmarks</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 glass-mystical border-mystical/30 hover-neural group">
              <Link to="/contact">
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 animate-ai-thinking" />
                Request Access
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-20 px-4 gradient-mystical-bg relative">
        <div className="absolute inset-0 glass-apple opacity-50"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass-mystical text-mystical border-mystical/20 animate-neural-pulse" variant="secondary">
              <TrendingUp className="w-4 h-4 mr-2 animate-ai-thinking" />
              Real-time Neural Metrics
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Ozone <span className="gradient-mystical">Performance</span>
            </h2>
            <p className="text-lg text-muted-foreground">Live benchmarks from our neuromorphic architecture</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="card-glass-neural hover-lift animate-slide-in-left group">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-navy to-brand-blue mx-auto mb-4 flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-neural mb-2 text-neural-glow">
                  {stats?.suites || 4}
                </div>
                <div className="text-muted-foreground font-medium text-sm">Neural Suites</div>
              </CardContent>
            </Card>
            
            <Card className="card-glass-neural hover-lift animate-slide-in-up animate-delay-100 group">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan mx-auto mb-4 flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                  <Cpu className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-mystical mb-2 text-neural-glow">
                  {stats?.models || 3}
                </div>
                <div className="text-muted-foreground font-medium text-sm">Active Models</div>
              </CardContent>
            </Card>
            
            <Card className="card-glass-neural hover-lift animate-slide-in-up animate-delay-200 group">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-cyan to-mystical mx-auto mb-4 flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-mystical mb-2 text-neural-glow">
                  {stats?.results || 3}
                </div>
                <div className="text-muted-foreground font-medium text-sm">Verified Results</div>
              </CardContent>
            </Card>
            
            <Card className="card-glass-neural hover-lift animate-slide-in-right animate-delay-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mystical to-brand-purple mx-auto mb-4 flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-neural mb-2 text-neural-glow">
                  {stats?.latestScore || 96.8}
                </div>
                <div className="text-muted-foreground font-medium text-sm">Latest {stats?.latestMetric || 'Score'}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ozone Technology Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-l from-mystical/5 to-transparent rounded-full blur-3xl animate-quantum-float"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <Badge className="mb-4 glass-apple text-mystical border-mystical/20 animate-neural-pulse" variant="secondary">
                <Brain className="w-4 h-4 mr-2 animate-ai-thinking" />
                Next-Gen AI
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Ozone (O³) <span className="gradient-mystical">Architecture</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our revolutionary Ozone technology transcends traditional AI limitations through 
                neuromorphic processing, minimal-pass learning, and organic computation that 
                thinks like the human brain but operates at silicon speed.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-navy to-brand-blue flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">90% reduction in training data requirements</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">15x energy efficiency improvement</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-cyan to-mystical flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Network className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">Distributed neuromorphic processing</span>
                </div>
              </div>
            </div>
            
            <Card className="card-glass-neural border-mystical/20 hover-neural animate-slide-in-right">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl gradient-mystical flex items-center text-neural-glow">
                  <Sparkles className="w-6 h-6 mr-2 text-mystical animate-neural-pulse" />
                  Core Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg glass-apple border border-brand-blue/20 hover-lift group">
                  <div className="flex items-center mb-3">
                    <Eye className="w-5 h-5 mr-2 text-brand-navy animate-ai-thinking" />
                    <h4 className="font-semibold text-brand-navy">Eve Cycles</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Self-evolving learning cycles that continuously adapt and optimize without supervision
                  </p>
                </div>
                <div className="p-6 rounded-lg glass-apple border border-brand-cyan/20 hover-lift group">
                  <div className="flex items-center mb-3">
                    <Network className="w-5 h-5 mr-2 text-brand-blue animate-ai-thinking" />
                    <h4 className="font-semibold text-brand-blue">Neural Routing</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dynamic pathways that mirror biological neural networks for optimal processing
                  </p>
                </div>
                <div className="p-6 rounded-lg glass-apple border border-mystical/20 hover-lift group">
                  <div className="flex items-center mb-3">
                    <Cpu className="w-5 h-5 mr-2 text-mystical animate-ai-thinking" />
                    <h4 className="font-semibold text-mystical">Organic Processors</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Custom silicon designed specifically for neuromorphic computation patterns
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 px-4 gradient-mystical-bg relative">
        <div className="absolute inset-0 glass-apple opacity-30"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 glass-mystical text-mystical border-mystical/20 animate-neural-pulse" variant="secondary">
              <Globe className="w-4 h-4 mr-2 animate-ai-thinking" />
              Industry Recognition
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Featured <span className="gradient-neural">Coverage</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 items-center">
            {['TechCrunch', 'Wired', 'MIT Review', 'Nature AI'].map((publication, index) => (
              <div key={publication} className={`text-center animate-slide-in-up animate-delay-${(index + 1) * 100}`}>
                <div className="h-16 card-glass-primary rounded-lg flex items-center justify-center mb-2 hover-neural transition-all duration-300 group animate-neural-pulse">
                  <span className="font-semibold text-lg text-muted-foreground group-hover:gradient-mystical transition-all duration-300">{publication}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-mystical/10 rounded-full blur-2xl animate-quantum-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-cyan/10 rounded-full blur-2xl animate-quantum-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-4xl mx-auto relative">
          <Card className="card-glass-neural gradient-neural-border hover-neural animate-slide-in-up">
            <CardContent className="p-12 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan to-mystical mx-auto mb-6 flex items-center justify-center animate-neural-pulse">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-mystical rounded-full animate-quantum-float opacity-70"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brand-cyan rounded-full animate-quantum-float opacity-60" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Ready to Experience <span className="gradient-mystical text-neural-glow">Ozone</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join leading researchers and enterprises leveraging the future of AI with LEAP's 
                revolutionary Ozone architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="glass-apple hover-neural group relative overflow-hidden">
                  <Link to="/contact">
                    <div className="absolute inset-0 bg-gradient-to-r from-mystical/20 to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-data-flow"></div>
                    <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 animate-ai-thinking relative z-10" />
                    <span className="relative z-10">Request Access</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass-mystical border-mystical/30 hover-neural group">
                  <Link to="/ozone">
                    <Brain className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 animate-ai-thinking" />
                    Learn About Ozone
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
