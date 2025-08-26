
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Clock, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Benchmarks = () => {
  const mockBenchmarks = [
    {
      model: "Ozone-7B",
      accuracy: 94.2,
      latency: "45ms",
      throughput: "12.5K",
      status: "Production"
    },
    {
      model: "Ozone-13B",
      accuracy: 96.8,
      latency: "78ms",
      throughput: "8.2K",
      status: "Production"
    },
    {
      model: "Ozone-70B",
      accuracy: 98.1,
      latency: "156ms",
      throughput: "3.1K",
      status: "Beta"
    }
  ];

  const comparisons = [
    { metric: "MMLU", ozone: "94.2%", competitor: "87.3%", improvement: "+6.9%" },
    { metric: "HumanEval", ozone: "78.5%", competitor: "71.2%", improvement: "+7.3%" },
    { metric: "GSM8K", ozone: "89.4%", competitor: "82.1%", improvement: "+7.3%" },
    { metric: "HellaSwag", ozone: "96.1%", competitor: "93.8%", improvement: "+2.3%" }
  ];

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
            Comprehensive performance metrics and comparisons showcasing Ozone's capabilities
          </p>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass gradient-border text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Detailed Benchmarks Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                We're preparing comprehensive benchmark results across multiple evaluation suites. 
                Full performance data will be available shortly.
              </p>
              <Button asChild className="glass-hover">
                <Link to="/contact">Get Notified When Available</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Preview Data */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Performance <span className="gradient-text">Preview</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Early results from our internal testing (subject to change)
          </p>

          {/* Model Performance Table */}
          <Card className="glass mb-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Model Performance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Model</th>
                      <th className="text-left py-3 px-4">Accuracy</th>
                      <th className="text-left py-3 px-4">Latency</th>
                      <th className="text-left py-3 px-4">Throughput</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBenchmarks.map((benchmark) => (
                      <tr key={benchmark.model} className="border-b border-white/5">
                        <td className="py-3 px-4 font-medium">{benchmark.model}</td>
                        <td className="py-3 px-4">{benchmark.accuracy}%</td>
                        <td className="py-3 px-4">{benchmark.latency}</td>
                        <td className="py-3 px-4">{benchmark.throughput} req/s</td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant={benchmark.status === "Production" ? "default" : "secondary"}
                            className="glass"
                          >
                            {benchmark.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Competitive Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Benchmark</th>
                      <th className="text-left py-3 px-4">Ozone</th>
                      <th className="text-left py-3 px-4">Leading Competitor</th>
                      <th className="text-left py-3 px-4">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((comparison) => (
                      <tr key={comparison.metric} className="border-b border-white/5">
                        <td className="py-3 px-4 font-medium">{comparison.metric}</td>
                        <td className="py-3 px-4 text-primary font-semibold">{comparison.ozone}</td>
                        <td className="py-3 px-4">{comparison.competitor}</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400 font-semibold">{comparison.improvement}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Metrics Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">98.1%</div>
                <div className="text-sm text-muted-foreground">Peak Accuracy</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">45ms</div>
                <div className="text-sm text-muted-foreground">Average Latency</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">12.5K</div>
                <div className="text-sm text-muted-foreground">Requests/Second</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benchmarks;
