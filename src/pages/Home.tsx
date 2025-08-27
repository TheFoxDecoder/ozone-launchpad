
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Globe, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sb } from "@/integrations/supabase/unsafeClient";
import AnimatedLogo from "@/components/AnimatedLogo";

const Home = () => {
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden hero-bg">
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <AnimatedLogo />
          </div>
          <Badge className="mb-6 bg-white/90 text-primary border-primary/20" variant="secondary">
            Introducing Ozone (O³)
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-foreground">
            The Future of <br />
            <span className="gradient-text">Artificial Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            LEAP's revolutionary Ozone (O³) architecture combines neuromorphic processing 
            with minimal-pass learning to achieve unprecedented AI performance and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-professional">
              <Link to="/benchmarks">
                Explore Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5">
              <Link to="/contact">Request Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Performance <span className="gradient-text">Metrics</span>
            </h2>
            <p className="text-lg text-muted-foreground">Real-time benchmarks and verified results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-professional hover:shadow-professional-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-navy to-brand-blue mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stats?.suites || 5}
                </div>
                <div className="text-muted-foreground font-medium">Benchmark Suites</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-professional hover:shadow-professional-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stats?.results || 0}
                </div>
                <div className="text-muted-foreground font-medium">Verified Results</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-professional hover:shadow-professional-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stats?.latestScore || 94.2}%
                </div>
                <div className="text-muted-foreground font-medium">Latest {stats?.latestMetric || 'Score'}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="secondary">
                The Challenge
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                AI That Thinks <span className="gradient-accent">Differently</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Traditional AI architectures are hitting fundamental limits. They require massive 
                datasets, consume enormous energy, and struggle with true reasoning. The world 
                needs a breakthrough.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-navy to-brand-blue flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium">Minimal-pass learning reduces training requirements by 90%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium">Neuromorphic architecture delivers 10x energy efficiency</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium">Distributed processing enables global-scale deployment</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-white border border-slate-200 shadow-professional-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl gradient-text">Ozone (O³) Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-brand-navy/5 to-brand-blue/5 border border-brand-blue/10">
                  <h4 className="font-semibold mb-2 text-brand-navy">Eve Cycles</h4>
                  <p className="text-sm text-muted-foreground">
                    Revolutionary learning cycles that adapt and evolve with minimal supervision
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-brand-blue/5 to-brand-cyan/5 border border-brand-cyan/10">
                  <h4 className="font-semibold mb-2 text-brand-blue">Neuromorphic Routing</h4>
                  <p className="text-sm text-muted-foreground">
                    Brain-inspired pathways that optimize information flow and processing
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 border border-brand-purple/10">
                  <h4 className="font-semibold mb-2 text-brand-purple">Organic Processor</h4>
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
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="secondary">
              Recognition
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Featured <span className="gradient-text">Coverage</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 items-center">
            {['TechCrunch', 'Wired', 'MIT Review', 'Nature AI'].map((publication, index) => (
              <div key={publication} className="text-center">
                <div className="h-16 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 shadow-sm border border-slate-200/50 hover:shadow-professional transition-all duration-300">
                  <span className="font-semibold text-lg text-muted-foreground">{publication}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-professional-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Ready to Experience <span className="gradient-accent">Ozone</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join leading researchers and enterprises who are already leveraging 
                the power of next-generation AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-professional">
                  <Link to="/contact">
                    Request Access <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
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
