
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Database, Network, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Ozone = () => {
  const capabilities = [
    {
      icon: Brain,
      title: "Advanced Reasoning",
      description: "State-of-the-art reasoning capabilities that understand context and nuance",
      features: ["Multi-step reasoning", "Contextual awareness", "Logical inference"]
    },
    {
      icon: Network,
      title: "Distributed Architecture",
      description: "Scalable, distributed system designed for enterprise-grade performance",
      features: ["Auto-scaling", "Global distribution", "99.99% uptime"]
    },
    {
      icon: Database,
      title: "Knowledge Integration",
      description: "Seamlessly integrate with your existing data sources and knowledge bases",
      features: ["Real-time sync", "Multi-format support", "Secure connections"]
    },
    {
      icon: Rocket,
      title: "Performance Optimized",
      description: "Optimized for speed without compromising on accuracy or reliability",
      features: ["Sub-second responses", "Batch processing", "Edge deployment"]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 glass" variant="secondary">
            AI Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet <span className="gradient-text">Ozone (O³)</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A revolutionary AI platform that combines the power of advanced language models 
            with cutting-edge distributed computing to deliver unprecedented performance and reliability.
          </p>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core <span className="gradient-text">Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Built on three fundamental pillars: Intelligence, Scale, and Speed
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Ozone Difference</h3>
              <p className="text-muted-foreground mb-6">
                Ozone represents a breakthrough in AI architecture. By combining transformer-based 
                models with novel attention mechanisms and distributed inference, we've created 
                a system that scales intelligently while maintaining consistency and accuracy.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Novel attention mechanisms for improved context understanding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Distributed inference across global edge nodes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Real-time model optimization and adaptation</span>
                </li>
              </ul>
            </div>
            <Card className="glass gradient-border">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">O³</div>
                  <p className="text-sm text-muted-foreground mb-4">Ozone Architecture</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">&lt; 100ms</div>
                      <div className="text-xs text-muted-foreground">Latency</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">∞</div>
                      <div className="text-xs text-muted-foreground">Scale</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Core <span className="gradient-text">Capabilities</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={capability.title} className="glass glass-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <capability.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{capability.description}</p>
                  <ul className="space-y-2">
                    {capability.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass gradient-border">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience Ozone Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                See how Ozone can transform your AI applications
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="glass-hover">
                  <Link to="/benchmarks">
                    View Performance Data <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass-hover">
                  <Link to="/contact">
                    Contact Our Team
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

export default Ozone;
