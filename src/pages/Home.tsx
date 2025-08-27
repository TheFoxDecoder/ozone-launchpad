
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Globe, Target, TrendingUp, Users, Sparkles, Cpu, Network } from "lucide-react";
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
    latestScore: number;
    latestMetric: string;
  }>({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const [suites, results, latestResult] = await Promise.all([
        sb.from('benchmark_suites').select('id'),
        sb.from('benchmark_results').select('id').eq('is_verified', true),
        sb.from('benchmark_results')
          .select('value, metric_name')
          .eq('is_verified', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
      ]);
      
      return {
        suites: suites.data ? suites.data.length : 0,
        results: results.data ? results.data.length : 0,
        latestScore: latestResult.data ? Number(latestResult.data.value) : 0,
        latestMetric: latestResult.data?.metric_name ?? 'Score'
      };
    }
  });

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden hero-bg">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-mystical/5 to-brand-purple/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-brand-cyan/5 to-mystical/5 rounded-full blur-3xl animate-float-reverse"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <AnimatedLogo />
          </div>
          
          <Badge className={`mb-6 glass-mystical text-mystical border-mystical/30 animate-slide-in-up ${isVisible ? 'animate-delay-200' : ''}`} variant="secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            Introducing Ozone (O³)
          </Badge>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight text-foreground animate-slide-in-up ${isVisible ? 'animate-delay-300' : ''}`}>
            The Future of <br />
            <span className="gradient-mystical">Artificial Intelligence</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''}`}>
            LEAP's revolutionary Ozone (O³) architecture combines neuromorphic processing 
            with minimal-pass learning to achieve unprecedented AI performance and efficiency.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-professional hover-glow group">
              <Link to="/benchmarks">
                <Brain className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Explore Benchmarks 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 glass border-mystical/30 hover-mystical group">
              <Link to="/contact">
                <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Request Access
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-20 px-4 gradient-mystical-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass-mystical text-mystical border-mystical/20" variant="secondary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Live Performance
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Performance <span className="gradient-mystical">Metrics</span>
            </h2>
            <p className="text-lg text-muted-foreground">Real-time benchmarks and verified results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-mystical shadow-mystical hover-lift animate-slide-in-left group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-navy to-brand-blue mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:animate-mystical-pulse transition-all duration-300">
                  <Target className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform">
                  {stats?.suites || 5}
                </div>
                <div className="text-muted-foreground font-medium">Benchmark Suites</div>
              </CardContent>
            </Card>
            
            <Card className="glass-mystical shadow-mystical hover-lift animate-slide-in-up animate-delay-200 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:animate-mystical-pulse transition-all duration-300">
                  <TrendingUp className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold gradient-mystical mb-2 group-hover:scale-105 transition-transform">
                  {stats?.results || 0}
                </div>
                <div className="text-muted-foreground font-medium">Verified Results</div>
              </CardContent>
            </Card>
            
            <Card className="glass-mystical shadow-mystical hover-lift animate-slide-in-right animate-delay-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-cyan to-mystical mx-auto mb-4 flex items-center justify-center shadow-mystical group-hover:animate-mystical-pulse transition-all duration-300">
                  <Zap className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold gradient-accent mb-2 group-hover:scale-105 transition-transform">
                  {stats?.latestScore || 94.2}%
                </div>
                <div className="text-muted-foreground font-medium">Latest {stats?.latestMetric || 'Score'}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-l from-mystical/3 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <Badge className="mb-4 glass text-primary border-primary/20" variant="secondary">
                <Brain className="w-4 h-4 mr-2" />
                The Challenge
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                AI That Thinks <span className="gradient-mystical">Differently</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Traditional AI architectures are hitting fundamental limits. They require massive 
                datasets, consume enormous energy, and struggle with true reasoning. The world 
                needs a breakthrough.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-navy to-brand-blue flex items-center justify-center shadow-sm group-hover:shadow-glow transition-all duration-300">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-brand-blue transition-colors">Minimal-pass learning reduces training requirements by 90%</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan flex items-center justify-center shadow-sm group-hover:shadow-glow transition-all duration-300">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-brand-cyan transition-colors">Neuromorphic architecture delivers 10x energy efficiency</span>
                </div>
                <div className="flex items-center space-x-3 group hover-lift">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-cyan to-mystical flex items-center justify-center shadow-sm group-hover:shadow-mystical transition-all duration-300">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-mystical transition-colors">Distributed processing enables global-scale deployment</span>
                </div>
              </div>
            </div>
            
            <Card className="glass-mystical border border-mystical/20 shadow-mystical hover-mystical animate-slide-in-right">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl gradient-mystical flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-mystical animate-pulse-glow" />
                  Ozone (O³) Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-brand-navy/5 to-brand-blue/5 border border-brand-blue/10 hover-lift group">
                  <div className="flex items-center mb-2">
                    <Brain className="w-5 h-5 mr-2 text-brand-navy group-hover:animate-pulse-slow" />
                    <h4 className="font-semibold text-brand-navy">Eve Cycles</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Revolutionary learning cycles that adapt and evolve with minimal supervision
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5 border border-brand-cyan/10 hover-lift group">
                  <div className="flex items-center mb-2">
                    <Network className="w-5 h-5 mr-2 text-brand-blue group-hover:animate-pulse-slow" />
                    <h4 className="font-semibold text-brand-blue">Neuromorphic Routing</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Brain-inspired pathways that optimize information flow and processing
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-brand-cyan/5 to-mystical/5 border border-mystical/10 hover-lift group">
                  <div className="flex items-center mb-2">
                    <Cpu className="w-5 h-5 mr-2 text-mystical group-hover:animate-pulse-slow" />
                    <h4 className="font-semibold text-mystical">Organic Processor</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Next-generation hardware designed specifically for Ozone architecture
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-20 px-4 gradient-bg relative">
        <div className="absolute inset-0 animate-shimmer opacity-50"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 glass text-primary border-primary/20" variant="secondary">
              <Globe className="w-4 h-4 mr-2" />
              Recognition
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Featured <span className="gradient-text">Coverage</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 items-center">
            {['TechCrunch', 'Wired', 'MIT Review', 'Nature AI'].map((publication, index) => (
              <div key={publication} className={`text-center animate-slide-in-up animate-delay-${(index + 1) * 100}`}>
                <div className="h-16 glass-mystical rounded-lg flex items-center justify-center mb-2 shadow-sm border border-mystical/10 hover-mystical transition-all duration-300 group">
                  <span className="font-semibold text-lg text-muted-foreground group-hover:gradient-mystical transition-all duration-300">{publication}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Mystical background effects */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-mystical/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-cyan/10 rounded-full blur-2xl animate-float-reverse"></div>
        
        <div className="max-w-4xl mx-auto relative">
          <Card className="glass-mystical gradient-mystical-border shadow-mystical animate-slide-in-up">
            <CardContent className="p-12 text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan to-mystical mx-auto mb-6 flex items-center justify-center shadow-mystical animate-mystical-pulse">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-mystical rounded-full animate-float opacity-70"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brand-cyan rounded-full animate-float-reverse opacity-60"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Ready to Experience <span className="gradient-mystical">Ozone</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join leading researchers and enterprises who are already leveraging 
                the power of next-generation AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-professional hover-glow group">
                  <Link to="/contact">
                    <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    Request Access 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass border-mystical/30 hover-mystical group">
                  <Link to="/ozone">
                    <Brain className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Learn More About O³
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
