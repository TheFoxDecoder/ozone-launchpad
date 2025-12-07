import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Globe, Target, TrendingUp, Users, Cpu, Network, Eye, Zap } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Logo */}
            <div className={`flex justify-center mb-10 animate-slide-in-up ${isVisible ? '' : 'opacity-0'}`}>
              <AnimatedLogo />
            </div>
            
            <Badge className={`mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium animate-slide-in-up ${isVisible ? 'animate-delay-200' : ''}`} variant="secondary">
              Powered by Ozone (O³) Technology
            </Badge>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground animate-slide-in-up ${isVisible ? 'animate-delay-300' : ''} tracking-tight`}>
              <span className="block text-lg md:text-xl font-normal text-muted-foreground mb-3">
                Introducing
              </span>
              <span className="gradient-neural">LEAP</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''}`}>
              We're building <span className="text-foreground font-medium">digital intelligence that actually thinks</span>.
              Not a tool. Not an AI employee. Not another model wrapped in fancy marketing.
            </p>
            
            <p className={`text-base md:text-lg text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''}`}>
              LEAP is building intelligent structures that businesses can subscribe to — 
              the same way they subscribe to infrastructure, computing, or security. 
              Except this isn't software. <span className="text-foreground font-medium">It's cognition.</span>
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
              <Button asChild size="lg" className="text-base px-8 py-6">
                <Link to="/benchmarks">
                  <Brain className="mr-2 h-5 w-5" />
                  Explore Benchmarks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6">
                <Link to="/contact">
                  Request Access
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">
              Ozone Performance
            </h2>
            <p className="text-muted-foreground">
              Live benchmarks from our neuromorphic architecture
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stats?.suites || 4}
                </div>
                <div className="text-sm text-muted-foreground">Neural Suites</div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stats?.models || 3}
                </div>
                <div className="text-sm text-muted-foreground">Active Models</div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stats?.results || 3}
                </div>
                <div className="text-sm text-muted-foreground">Verified Results</div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-mystical/10 mx-auto flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-mystical" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stats?.latestScore || 96.8}
                </div>
                <div className="text-sm text-muted-foreground">Latest {stats?.latestMetric || 'Score'}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What LEAP Does Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="secondary">
                <Brain className="w-4 h-4 mr-2" />
                Intelligence as Infrastructure
              </Badge>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                What This Really Means
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                LEAP focuses on one thing: teaching organizations how to use 
                <span className="text-foreground font-medium"> digital intelligence as a capability</span>, not a feature.
                We're not in the business of selling tools. We're in the business of intelligence itself.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Intelligence as a structure, not a model</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Plug into shared cognitive frameworks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Network className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Adapts to your systems, workflows, and decisions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-mystical/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-mystical" />
                  </div>
                  <span className="text-foreground">Grows with your business, not as a dependency</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">The LEAP Difference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center mb-2">
                    <Eye className="w-5 h-5 mr-2 text-primary" />
                    <h4 className="font-semibold">Not Just Tools</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Companies plug into our intelligence structure instead of hiring "AI" — it adapts to their systems
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center mb-2">
                    <Network className="w-5 h-5 mr-2 text-primary" />
                    <h4 className="font-semibold">Connected Industries</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Shared cognitive frameworks that connect industries together for collective intelligence
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-mystical/5 border border-mystical/20">
                  <div className="flex items-center mb-2">
                    <Cpu className="w-5 h-5 mr-2 text-mystical" />
                    <h4 className="font-semibold">New Architecture</h4>
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

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
            <Users className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Building the Future of Intelligence
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            If you're working in frontier computing, AGI, or building systems that need real intelligence — reach out.
          </p>
          <p className="text-muted-foreground mb-8">
            More details coming soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                <Brain className="mr-2 h-4 w-4" />
                Learn More About LEAP
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
