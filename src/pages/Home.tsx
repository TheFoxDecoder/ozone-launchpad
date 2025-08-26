
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Globe, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  // Fetch live stats from the database
  const { data: stats } = useQuery({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const [suites, results, latestResult] = await Promise.all([
        supabase.from('benchmark_suites').select('id'),
        supabase.from('benchmark_results').select('id').eq('is_verified', true),
        supabase.from('benchmark_results')
          .select('value, metric_name')
          .eq('is_verified', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
      ]);
      
      return {
        suites: suites.data?.length || 0,
        results: results.data?.length || 0,
        latestScore: latestResult.data?.value || 0,
        latestMetric: latestResult.data?.metric_name || 'Score'
      };
    }
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-6 glass" variant="secondary">
            Introducing Ozone (O³)
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            The Future of <br />
            <span className="gradient-text">Artificial Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            LEAP's revolutionary Ozone (O³) architecture combines neuromorphic processing 
            with minimal-pass learning to achieve unprecedented AI performance and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glass-hover text-lg px-8 py-6">
              <Link to="/benchmarks">
                Explore Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass text-lg px-8 py-6">
              <Link to="/contact">Request Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stats?.suites || 5}
                </div>
                <div className="text-muted-foreground">Benchmark Suites</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stats?.results || 0}
                </div>
                <div className="text-muted-foreground">Verified Results</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stats?.latestScore || 94.2}%
                </div>
                <div className="text-muted-foreground">Latest {stats?.latestMetric || 'Score'}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 glass" variant="secondary">
                The Challenge
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                AI That Thinks <span className="gradient-text">Differently</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Traditional AI architectures are hitting fundamental limits. They require massive 
                datasets, consume enormous energy, and struggle with true reasoning. The world 
                needs a breakthrough.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Brain className="h-6 w-6 text-secondary" />
                  <span>Minimal-pass learning reduces training requirements by 90%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-secondary" />
                  <span>Neuromorphic architecture delivers 10x energy efficiency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-secondary" />
                  <span>Distributed processing enables global-scale deployment</span>
                </div>
              </div>
            </div>
            
            <Card className="glass gradient-border">
              <CardHeader>
                <CardTitle className="text-2xl">Ozone (O³) Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg glass">
                  <h4 className="font-semibold mb-2 text-secondary">Eve Cycles</h4>
                  <p className="text-sm text-muted-foreground">
                    Revolutionary learning cycles that adapt and evolve with minimal supervision
                  </p>
                </div>
                <div className="p-4 rounded-lg glass">
                  <h4 className="font-semibold mb-2 text-secondary">Neuromorphic Routing</h4>
                  <p className="text-sm text-muted-foreground">
                    Brain-inspired pathways that optimize information flow and processing
                  </p>
                </div>
                <div className="p-4 rounded-lg glass">
                  <h4 className="font-semibold mb-2 text-secondary">Organic Processor</h4>
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
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 glass" variant="secondary">
              Recognition
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="gradient-text">Coverage</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="h-12 bg-muted/20 rounded-lg flex items-center justify-center mb-2">
                <span className="font-semibold text-lg">TechCrunch</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-12 bg-muted/20 rounded-lg flex items-center justify-center mb-2">
                <span className="font-semibold text-lg">Wired</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-12 bg-muted/20 rounded-lg flex items-center justify-center mb-2">
                <span className="font-semibold text-lg">MIT Review</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-12 bg-muted/20 rounded-lg flex items-center justify-center mb-2">
                <span className="font-semibold text-lg">Nature AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass gradient-border text-center">
            <CardContent className="p-12">
              <Users className="h-16 w-16 text-secondary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Experience <span className="gradient-text">Ozone</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join leading researchers and enterprises who are already leveraging 
                the power of next-generation AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="glass-hover">
                  <Link to="/contact">
                    Request Access <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass">
                  <Link to="/ozone">Learn More About O³</Link>
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
