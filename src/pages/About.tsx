import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Brain, 
  Lightbulb, 
  Shield, 
  Rocket, 
  Users, 
  Eye,
  ArrowRight,
  Network,
  Battery,
  Radar
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const strategicPillars = [
    {
      title: "Core Intelligence",
      subtitle: "Leap O³ Platform",
      description: "Continue refining O³ as a universal reasoning engine. Integrate with the Organic Processor to make intelligence scalable and efficient.",
      icon: Brain
    },
    {
      title: "Applied Science Products",
      subtitle: "Global Challenge Solutions",
      description: "Build specialized tools powered by O³ for major global challenges in climate, energy, space exploration, and cyber safety.",
      icon: Lightbulb
    },
    {
      title: "Human-Centered Tools",
      subtitle: "Empowering Decision Making",
      description: "Everyday products that help researchers, engineers, policymakers, and individuals make better decisions.",
      icon: Users
    },
    {
      title: "Ethics & Safety",
      subtitle: "Core Principle",
      description: "Transparency, interpretability, and oversight baked into every tool. Avoiding the 'black box' trap of today's AI.",
      icon: Shield
    }
  ];

  const appliedSolutions = [
    {
      title: "Climate & Energy",
      description: "AI models that optimize renewable energy grids, design better batteries, and simulate new sustainable materials.",
      icon: Battery
    },
    {
      title: "Space Exploration", 
      description: "Autonomous mission planning systems, spacecraft navigation AI, and tools to design novel propulsion or shielding systems.",
      icon: Rocket
    },
    {
      title: "Cyber & Safety",
      description: "O³-driven systems for real-time threat detection, quantum-safe protocols, and global cyber defense coordination.",
      icon: Radar
    }
  ];

  const firstProducts = [
    {
      name: "Leap Research Copilot",
      description: "Reads scientific papers/data once, extracts rules, and proposes experimental designs or solutions.",
      badge: "Research"
    },
    {
      name: "Leap Climate Solver", 
      description: "Models global energy systems and optimizes renewable integration in near real-time.",
      badge: "Climate"
    },
    {
      name: "Leap Cyber Guardian",
      description: "Learns new exploits or vulnerabilities after scanning them once and generates mitigation strategies.",
      badge: "Security"
    },
    {
      name: "Leap Space Navigator",
      description: "Reads mission data and autonomously plans routes, fuel use, and adaptive repairs for spacecraft.",
      badge: "Space"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <Badge className={`mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 animate-slide-in-up ${isVisible ? 'animate-delay-200' : ''}`} variant="secondary">
              A Decade in the Making
            </Badge>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight text-foreground animate-slide-in-up ${isVisible ? 'animate-delay-300' : ''}`}>
              Intelligence That
              <br />
              <span className="gradient-mystical">Actually Thinks</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''} mb-4`}>
              LEAP is the company built around one idea: create a form of digital intelligence that truly reasons — not just responds.
            </p>
            
            <p className={`text-base text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''}`}>
              This is the foundation built quietly for years — new architecture, new methods, new thinking.
              We're building intelligent structures that businesses can subscribe to, like infrastructure or security. Except this isn't software. It's cognition.
            </p>
          </section>

          {/* What LEAP Is */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={`animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">What LEAP Is</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    LEAP isn't in the business of selling tools. We're in the business of <span className="text-foreground font-medium">intelligence itself</span>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We design intelligence as a structure, not a model. Companies plug into that structure instead of hiring "AI" — it adapts to their systems, workflows, and decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className={`animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Our Focus</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Capability, Not Feature</span> — Teaching organizations how to use digital intelligence as a core capability.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Connected Industries</span> — Linking organizations through shared cognitive frameworks.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Growing Intelligence</span> — Systems that grow with the business instead of becoming another dependency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Strategic Pillars */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Strategic Pillars</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Four foundational areas that guide our development and ensure we create AI that truly serves humanity's needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {strategicPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Card key={pillar.title} className="animate-slide-in-up" style={{ animationDelay: `${600 + index * 100}ms` }}>
                    <CardHeader>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">{pillar.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {pillar.subtitle}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{pillar.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Applied Science Solutions */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Applied Science Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Specialized tools powered by O³ for major global challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {appliedSolutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={solution.title} className="text-center animate-slide-in-up" style={{ animationDelay: `${1000 + index * 100}ms` }}>
                    <CardHeader>
                      <div className="inline-flex p-3 rounded-xl bg-mystical/10 mx-auto mb-3">
                        <Icon className="h-6 w-6 text-mystical" />
                      </div>
                      <CardTitle className="text-lg">{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{solution.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* First Products */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">First Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Demonstrations of applied Leap technology — real solutions, not just prototypes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {firstProducts.map((product, index) => (
                <Card key={product.name} className="animate-slide-in-up" style={{ animationDelay: `${1300 + index * 100}ms` }}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {product.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-10">
                <div className="w-14 h-14 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                  <Network className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Ready to Shape the Future?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  AI as an amplifier of human science — creating tools that tackle existential challenges and accelerate discovery for all.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg">
                    <Link to="/ozone">
                      Explore O³ Technology
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Request Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
