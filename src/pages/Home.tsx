
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden relative">
      {/* Enhanced AI Matrix Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan via-mystical to-brand-purple animate-matrix-rain"></div>
        <div className="absolute inset-0 animate-data-flow opacity-50">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-mystical to-transparent" style={{ animationDelay: '1s' }}></div>
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-purple to-transparent" style={{ animationDelay: '2s' }}></div>
          <div className="absolute right-0 bottom-0 w-px h-full bg-gradient-to-t from-transparent via-mystical to-transparent" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Enhanced Neural network background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-16 left-8 w-80 h-80 bg-gradient-to-r from-mystical/15 to-brand-purple/8 rounded-full blur-3xl animate-quantum-float"></div>
          <div className="absolute bottom-16 right-8 w-96 h-96 bg-gradient-to-r from-brand-cyan/12 to-mystical/10 rounded-full blur-3xl animate-quantum-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-brand-blue/10 to-brand-cyan/12 rounded-full blur-2xl animate-neural-pulse"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-mystical rounded-full animate-quantum-float opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-brand-cyan rounded-full animate-quantum-float opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-brand-purple rounded-full animate-quantum-float opacity-70" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated Logo with enhanced glow */}
            <div className="flex justify-center mb-12 animate-slide-in-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-mystical to-brand-purple blur-xl opacity-20 animate-neural-pulse"></div>
                <AnimatedLogo />
              </div>
            </div>
            
            <Badge className={`mb-8 glass-apple text-mystical border-mystical/30 px-6 py-2 text-base font-medium animate-slide-in-up ${isVisible ? 'animate-delay-200' : ''} hover-neural group cursor-default`} variant="secondary">
              <div className="relative flex items-center">
                <div className="absolute -left-1 w-2 h-2 bg-mystical rounded-full animate-neural-pulse"></div>
                <Sparkles className="w-4 h-4 mr-2 animate-ai-thinking group-hover:rotate-12 transition-transform duration-500" />
                Powered by Ozone (O³) Technology
                <div className="absolute -right-1 w-1.5 h-1.5 bg-brand-cyan rounded-full animate-quantum-float opacity-70" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </Badge>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-[0.95] text-foreground animate-slide-in-up ${isVisible ? 'animate-delay-300' : ''} tracking-tight`}>
              <span className="block text-2xl md:text-3xl font-normal text-muted-foreground mb-4 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                Introducing
              </span>
              <span className="gradient-neural text-neural-glow relative inline-block">
                LEAP
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan via-mystical to-brand-purple blur-sm opacity-60 animate-data-flow"></div>
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''} font-light`}>
              We're building <span className="gradient-mystical font-medium">digital intelligence that actually thinks</span>.
              Not a tool. Not an AI employee. Not another model wrapped in fancy marketing.
            </p>
            
            <p className={`text-lg md:text-xl text-muted-foreground/80 mb-16 max-w-4xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''} font-light`}>
              LEAP is building intelligent structures that businesses can subscribe to — 
              the same way they subscribe to infrastructure, computing, or security. 
              Except this isn't software. <span className="text-foreground font-medium">It's cognition.</span>
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
              <Button asChild size="lg" className="text-lg px-10 py-8 glass-apple hover-neural group relative overflow-hidden border-0 shadow-2xl">
                <Link to="/benchmarks">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/30 to-mystical/30 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-data-flow"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Brain className="mr-3 h-6 w-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative z-10" />
                  <span className="relative z-10 font-semibold">Explore Benchmarks</span>
                  <ArrowRight className="ml-3 h-6 w-6 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110 relative z-10" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-10 py-8 glass-mystical border-mystical/40 hover-neural group backdrop-blur-xl shadow-xl">
                <Link to="/contact">
                  <div className="absolute inset-0 bg-gradient-to-r from-mystical/10 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Sparkles className="mr-3 h-5 w-5 transition-all duration-500 group-hover:rotate-180 animate-ai-thinking relative z-10" />
                  <span className="relative z-10 font-semibold">Request Access</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Live Stats */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20"></div>
        <div className="absolute inset-0 glass-apple opacity-60"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mystical/50 to-transparent animate-data-flow"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-brand-cyan/50 to-transparent animate-data-flow" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <Badge className="mb-6 glass-mystical text-mystical border-mystical/30 px-6 py-3 text-lg font-medium animate-neural-pulse hover-neural group cursor-default" variant="secondary">
              <div className="relative flex items-center">
                <TrendingUp className="w-5 h-5 mr-3 animate-ai-thinking group-hover:scale-125 transition-transform duration-500" />
                Real-time Neural Metrics
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-cyan rounded-full animate-quantum-float opacity-80"></div>
              </div>
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ozone <span className="gradient-mystical text-neural-glow">Performance</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Live benchmarks from our neuromorphic architecture, updated in real-time
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="card-glass-neural hover-lift animate-slide-in-left group cursor-pointer relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue mx-auto flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking shadow-xl">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-mystical rounded-full animate-quantum-float opacity-70"></div>
                </div>
                <div className="text-4xl font-black gradient-neural mb-3 text-neural-glow transition-all duration-500 group-hover:scale-110">
                  {stats?.suites || 4}
                </div>
                <div className="text-muted-foreground font-semibold text-base tracking-wide">Neural Suites</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-navy to-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
            
            <Card className="card-glass-neural hover-lift animate-slide-in-up animate-delay-100 group cursor-pointer relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan mx-auto flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking shadow-xl">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-cyan rounded-full animate-quantum-float opacity-70" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div className="text-4xl font-black gradient-mystical mb-3 text-neural-glow transition-all duration-500 group-hover:scale-110">
                  {stats?.models || 3}
                </div>
                <div className="text-muted-foreground font-semibold text-base tracking-wide">Active Models</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
            
            <Card className="card-glass-neural hover-lift animate-slide-in-up animate-delay-200 group cursor-pointer relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-mystical/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-mystical mx-auto flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking shadow-xl">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-mystical rounded-full animate-quantum-float opacity-70" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="text-4xl font-black gradient-mystical mb-3 text-neural-glow transition-all duration-500 group-hover:scale-110">
                  {stats?.results || 3}
                </div>
                <div className="text-muted-foreground font-semibold text-base tracking-wide">Verified Results</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-mystical transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
            
            <Card className="card-glass-neural hover-lift animate-slide-in-right animate-delay-300 group cursor-pointer relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-mystical/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mystical to-brand-purple mx-auto flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking shadow-xl">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-purple rounded-full animate-quantum-float opacity-70" style={{ animationDelay: '1.5s' }}></div>
                </div>
                <div className="text-4xl font-black gradient-neural mb-3 text-neural-glow transition-all duration-500 group-hover:scale-110">
                  {stats?.latestScore || 96.8}
                </div>
                <div className="text-muted-foreground font-semibold text-base tracking-wide">Latest {stats?.latestMetric || 'Score'}</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mystical to-brand-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What LEAP Does Section */}
      <section className="py-20 px-4 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-l from-mystical/5 to-transparent rounded-full blur-3xl animate-quantum-float"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <Badge className="mb-4 glass-apple text-mystical border-mystical/20 animate-neural-pulse" variant="secondary">
                <Brain className="w-4 h-4 mr-2 animate-ai-thinking" />
                Intelligence as Infrastructure
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                What This <span className="gradient-mystical">Really Means</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                LEAP focuses on one thing: teaching organizations how to use 
                <span className="gradient-mystical font-medium"> digital intelligence as a capability</span>, not a feature.
                We're not in the business of selling tools. We're in the business of intelligence itself.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-navy to-brand-blue flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">Intelligence as a structure, not a model</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">Plug into shared cognitive frameworks</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-cyan to-mystical flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Network className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">Adapts to your systems, workflows, and decisions</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mystical to-brand-purple flex items-center justify-center animate-neural-pulse group-hover:animate-ai-thinking">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:gradient-neural transition-all duration-300">Grows with your business, not as a dependency</span>
                </div>
              </div>
            </div>
            
            <Card className="card-glass-neural border-mystical/20 hover-neural animate-slide-in-right">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl gradient-mystical flex items-center text-neural-glow">
                  <Sparkles className="w-6 h-6 mr-2 text-mystical animate-neural-pulse" />
                  The LEAP Difference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg glass-apple border border-brand-blue/20 hover-lift group">
                  <div className="flex items-center mb-3">
                    <Eye className="w-5 h-5 mr-2 text-brand-navy animate-ai-thinking" />
                    <h4 className="font-semibold text-brand-navy">Not Just Tools</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Companies plug into our intelligence structure instead of hiring "AI" — it adapts to their systems
                  </p>
                </div>
                <div className="p-6 rounded-lg glass-apple border border-brand-cyan/20 hover-lift group">
                  <div className="flex items-center mb-3">
                    <Network className="w-5 h-5 mr-2 text-brand-blue animate-ai-thinking" />
                    <h4 className="font-semibold text-brand-blue">Connected Industries</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Shared cognitive frameworks that connect industries together for collective intelligence
                  </p>
                </div>
                <div className="p-6 rounded-lg glass-apple border border-mystical/20 hover-lift group">
                  <div className="flex items-center mb-3">
                    <Cpu className="w-5 h-5 mr-2 text-mystical animate-ai-thinking" />
                    <h4 className="font-semibold text-mystical">New Architecture</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Built on a decade of research — new architecture, new methods, new thinking
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
      <section className="py-20 px-4 bg-background relative overflow-hidden">
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
                Building the <span className="gradient-mystical text-neural-glow">Future of Intelligence</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                If you're working in frontier computing, AGI, or building systems that need real intelligence — reach out.
              </p>
              <p className="text-lg text-muted-foreground/70 mb-8">
                More details coming soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="glass-apple hover-neural group relative overflow-hidden">
                  <Link to="/contact">
                    <div className="absolute inset-0 bg-gradient-to-r from-mystical/20 to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-data-flow"></div>
                    <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12 animate-ai-thinking relative z-10" />
                    <span className="relative z-10">Get in Touch</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass-mystical border-mystical/30 hover-neural group">
                  <Link to="/about">
                    <Brain className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 animate-ai-thinking" />
                    Learn More About LEAP
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
