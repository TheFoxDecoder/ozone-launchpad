
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, Globe, ArrowRight, Cpu, Network, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Ozone = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 glass" variant="secondary">
            Ozone (O³) Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Revolutionary</span><br />
            AI Architecture
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Ozone represents a fundamental breakthrough in artificial intelligence, 
            combining neuromorphic processing with minimal-pass learning for unprecedented efficiency.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Core <span className="gradient-text">Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Three foundational innovations that power Ozone's capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Minimal-Pass Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Revolutionary learning approach that requires 90% fewer training examples 
                  while achieving superior performance through intelligent pattern recognition.
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <Network className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Neuromorphic Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Brain-inspired neural pathways that dynamically optimize information flow, 
                  reducing computational overhead by up to 85%.
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Eve Cycles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Adaptive learning cycles that continuously evolve and improve performance 
                  with minimal human supervision or intervention.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Technical <span className="gradient-text">Architecture</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore the innovative components that make Ozone possible
            </p>
          </div>

          <Tabs defaultValue="eve-cycles" className="w-full">
            <TabsList className="grid grid-cols-3 glass mb-8">
              <TabsTrigger value="eve-cycles">Eve Cycles</TabsTrigger>
              <TabsTrigger value="neuromorphic">Neuromorphic Routing</TabsTrigger>
              <TabsTrigger value="processor">Organic Processor</TabsTrigger>
            </TabsList>

            <TabsContent value="eve-cycles">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-secondary" />
                    <span>Eve Cycles: Evolutionary Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Eve Cycles represent a paradigm shift in how AI systems learn and adapt. 
                    Unlike traditional gradient descent methods, Eve Cycles use evolutionary 
                    principles to optimize neural pathways.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Self-organizing neural pathways</li>
                        <li>• Adaptive learning rate optimization</li>
                        <li>• Continuous performance evolution</li>
                        <li>• Minimal supervision requirements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Benefits:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• 90% reduction in training data</li>
                        <li>• 75% faster convergence</li>
                        <li>• Superior generalization</li>
                        <li>• Real-time adaptation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="neuromorphic">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Network className="h-6 w-6 text-secondary" />
                    <span>Neuromorphic Routing: Brain-Inspired Processing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    Our neuromorphic routing system mimics the efficiency of biological neural 
                    networks, creating dynamic pathways that optimize for both speed and accuracy.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Architecture:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Sparse connectivity patterns</li>
                        <li>• Dynamic pathway formation</li>
                        <li>• Event-driven processing</li>
                        <li>• Hierarchical information flow</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Performance:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• 85% reduction in compute</li>
                        <li>• 10x energy efficiency</li>
                        <li>• Real-time processing</li>
                        <li>• Scalable architecture</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="processor">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="h-6 w-6 text-secondary" />
                    <span>Organic Processor: Hardware Revolution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    The Organic Processor represents the next evolution in AI hardware, 
                    designed specifically to support Ozone's neuromorphic architecture.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Innovations:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Bio-inspired circuit design</li>
                        <li>• Adaptive memory allocation</li>
                        <li>• Ultra-low power consumption</li>
                        <li>• Parallel processing cores</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Roadmap:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Q4 2024: Prototype testing</li>
                        <li>• Q2 2025: Limited production</li>
                        <li>• Q4 2025: Commercial release</li>
                        <li>• 2026: Global deployment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Performance <span className="gradient-text">Advantages</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Quantified improvements over traditional AI architectures
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">90%</div>
                <div className="text-sm text-muted-foreground">Less Training Data</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">10x</div>
                <div className="text-sm text-muted-foreground">Energy Efficiency</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">75%</div>
                <div className="text-sm text-muted-foreground">Faster Training</div>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold gradient-text mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Less Compute</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass gradient-border text-center">
            <CardContent className="p-12">
              <Globe className="h-16 w-16 text-secondary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Experience <span className="gradient-text">Ozone</span> Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                See how Ozone's revolutionary architecture can transform your AI applications
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="glass-hover">
                  <Link to="/benchmarks">
                    View Benchmarks <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass">
                  <Link to="/contact">Request Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Ozone;
