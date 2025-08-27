
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Clock, Zap, Target, Search, Filter, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { sb } from "@/integrations/supabase/unsafeClient";
import type { BenchmarkResult, BenchmarkSuite } from "@/types/supabase";

const Benchmarks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSuite, setSelectedSuite] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Fetch benchmark suites
  const { data: suites } = useQuery<BenchmarkSuite[]>({
    queryKey: ['benchmark-suites'],
    queryFn: async () => {
      const { data, error } = await sb
        .from('benchmark_suites')
        .select('*')
        .order('title');
      if (error) throw error;
      return (data || []) as BenchmarkSuite[];
    }
  });

  // Fetch benchmark results with filters
  const { data: results, isLoading } = useQuery<BenchmarkResult[]>({
    queryKey: ['benchmark-results', selectedSuite, searchTerm, verifiedOnly],
    queryFn: async () => {
      let query = sb
        .from('benchmark_results')
        .select(`
          *,
          suite:benchmark_suites(title, slug)
        `)
        .order('created_at', { ascending: false });

      if (selectedSuite !== 'all') {
        query = query.eq('suite_id', selectedSuite);
      }

      if (verifiedOnly) {
        query = query.eq('is_verified', true);
      }

      if (searchTerm) {
        query = query.or(`task_name.ilike.%${searchTerm}%,metric_name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as BenchmarkResult[];
    }
  });

  // Calculate summary stats
  const stats = results ? {
    totalResults: results.length,
    verifiedResults: results.filter(r => r.is_verified).length,
    avgScore: results.length > 0 ? (results.reduce((acc, r) => acc + Number(r.value), 0) / results.length).toFixed(1) : 0,
    topScore: results.length > 0 ? Math.max(...results.map(r => Number(r.value))).toFixed(1) : 0
  } : { totalResults: 0, verifiedResults: 0, avgScore: 0, topScore: 0 };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 glass" variant="secondary">
            Performance Data
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Benchmarks</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive performance metrics showcasing Ozone's capabilities across industry-standard benchmarks
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stats.totalResults}</div>
                <div className="text-sm text-muted-foreground">Total Results</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stats.verifiedResults}</div>
                <div className="text-sm text-muted-foreground">Verified Results</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stats.avgScore}</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stats.topScore}</div>
                <div className="text-sm text-muted-foreground">Top Score</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="glass mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks or metrics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass"
                  />
                </div>
                
                <Select value={selectedSuite} onValueChange={setSelectedSuite}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="All Suites" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suites</SelectItem>
                    {suites?.map((suite) => (
                      <SelectItem key={suite.id} value={suite.id}>
                        {suite.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant={verifiedOnly ? "default" : "outline"}
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className="glass"
                >
                  {verifiedOnly ? "✓ " : ""}Verified Only
                </Button>
                
                <Button variant="outline" className="glass">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Table */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Benchmark Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading results...</div>
              ) : results && results.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Suite</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Metric</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">
                          {result.suite?.title || 'Unknown'}
                        </TableCell>
                        <TableCell>{result.task_name}</TableCell>
                        <TableCell>{result.metric_name}</TableCell>
                        <TableCell className="font-semibold text-secondary">
                          {Number(result.value).toFixed(1)}
                        </TableCell>
                        <TableCell>{result.units}</TableCell>
                        <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {result.is_verified ? (
                            <Badge className="glass text-xs" variant="default">
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="glass text-xs" variant="secondary">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No results found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benchmark Suites */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Benchmark <span className="gradient-text">Suites</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Industry-standard evaluations for comprehensive AI performance assessment
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suites?.map((suite) => (
              <Card key={suite.id} className="glass glass-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{suite.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {suite.description}
                  </p>
                  {suite.source_link && (
                    <Button asChild variant="outline" size="sm" className="glass">
                      <a href={suite.source_link} target="_blank" rel="noopener noreferrer">
                        View Source
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benchmarks;
