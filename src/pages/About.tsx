import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Brain, 
  Lightbulb, 
  Shield, 
  Zap, 
  Rocket, 
  Globe, 
  Users, 
  Eye,
  Cpu,
  ArrowRight,
  Sparkles,
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
      icon: Brain,
      gradient: "from-brand-cyan to-mystical"
    },
    {
      title: "Applied Science Products",
      subtitle: "Global Challenge Solutions",
      description: "Build specialized tools powered by O³ for major global challenges in climate, energy, space exploration, and cyber safety.",
      icon: Lightbulb,
      gradient: "from-mystical to-brand-purple"
    },
    {
      title: "Human-Centered Tools",
      subtitle: "Empowering Decision Making",
      description: "Everyday products that help researchers, engineers, policymakers, and individuals make better decisions.",
      icon: Users,
      gradient: "from-brand-purple to-brand-blue"
    },
    {
      title: "Ethics & Safety",
      subtitle: "Core Principle",
      description: "Transparency, interpretability, and oversight baked into every tool. Avoiding the 'black box' trap of today's AI.",
      icon: Shield,
      gradient: "from-brand-blue to-brand-cyan"
    }
  ];

  const appliedSolutions = [
    {
      title: "Climate & Energy",
      description: "AI models that optimize renewable energy grids, design better batteries, and simulate new sustainable materials.",
      icon: Battery,
      color: "text-brand-cyan"
    },
    {
      title: "Space Exploration", 
      description: "Autonomous mission planning systems, spacecraft navigation AI, and tools to design novel propulsion or shielding systems.",
      icon: Rocket,
      color: "text-mystical"
    },
    {
      title: "Cyber & Safety",
      description: "O³-driven systems for real-time threat detection, quantum-safe protocols, and global cyber defense coordination.",
      icon: Radar,
      color: "text-brand-purple"
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden relative">
      {/* Enhanced AI Matrix Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan via-mystical to-brand-purple animate-matrix-rain"></div>
        <div className="absolute inset-0 animate-data-flow opacity-50">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-mystical to-transparent" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <Badge className={`mb-8 glass-apple text-mystical border-mystical/30 px-6 py-2 text-base font-medium animate-slide-in-up ${isVisible ? 'animate-delay-200' : ''}`} variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              A Decade in the Making
            </Badge>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-10 leading-tight gradient-neural animate-slide-in-up ${isVisible ? 'animate-delay-300' : ''}`}>
              Intelligence That
              <br />
              <span className="text-mystical">Actually Thinks</span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''} mb-6`}>
              LEAP is the company built around one idea: create a form of digital intelligence that truly reasons — not just responds.
            </p>
            
            <p className={`text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed animate-slide-in-up ${isVisible ? 'animate-delay-400' : ''}`}>
              This is the foundation built quietly for years — new architecture, new methods, new thinking.
              We're building intelligent structures that businesses can subscribe to, like infrastructure or security. Except this isn't software. It's cognition.
            </p>
          </section>

          {/* What LEAP Is */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className={`card-glass-primary hover-neural animate-slide-in-up ${isVisible ? 'animate-delay-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-mystical/20 to-brand-purple/20 border border-mystical/30">
                      <Eye className="h-6 w-6 text-mystical" />
                    </div>
                    <CardTitle className="text-2xl gradient-neural">What LEAP Is</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                    LEAP isn't in the business of selling tools. We're in the business of <span className="text-foreground font-medium">intelligence itself</span>.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    We design intelligence as a structure, not a model. Companies plug into that structure instead of hiring "AI" — it adapts to their systems, workflows, and decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className={`card-glass-neural hover-neural animate-slide-in-up ${isVisible ? 'animate-delay-600' : ''}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-brand-cyan/20 to-mystical/20 border border-brand-cyan/30">
                      <Target className="h-6 w-6 text-brand-cyan" />
                    </div>
                    <CardTitle className="text-2xl gradient-neural">Our Focus</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-foreground">Capability, Not Feature</span> — Teaching organizations how to use digital intelligence as a core capability.
                    </p>
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-foreground">Connected Industries</span> — Linking organizations through shared cognitive frameworks.
                    </p>
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-foreground">Growing Intelligence</span> — Systems that grow with the business instead of becoming another dependency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Strategic Pillars */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-neural">Strategic Pillars</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Four foundational areas that guide our development and ensure we create AI that truly serves humanity's needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {strategicPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Card key={pillar.title} className={`card-glass-primary hover-neural animate-slide-in-up`} style={{ animationDelay: `${700 + index * 100}ms` }}>
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${pillar.gradient}/20 border border-mystical/30 flex-shrink-0`}>
                          <Icon className="h-6 w-6 text-mystical" />
                        </div>
                        <div>
                          <CardTitle className="text-xl gradient-neural mb-1">{pillar.title}</CardTitle>
                          <Badge variant="outline" className="text-xs text-mystical border-mystical/30">
                            {pillar.subtitle}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Applied Science Solutions */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-neural">Applied Science Products</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Specialized tools powered by O³ for major global challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {appliedSolutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={solution.title} className={`card-glass-neural hover-neural animate-slide-in-up`} style={{ animationDelay: `${1100 + index * 100}ms` }}>
                    <CardHeader>
                      <div className="text-center">
                        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-mystical/10 to-brand-purple/10 border border-mystical/20 mb-4">
                          <Icon className={`h-8 w-8 ${solution.color}`} />
                        </div>
                        <CardTitle className="text-xl gradient-neural">{solution.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center leading-relaxed">{solution.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* First Products */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-neural">First Products</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Demonstrations of applied Leap technology—real solutions, not just prototypes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {firstProducts.map((product, index) => (
                <Card key={product.name} className={`card-glass-primary hover-neural animate-slide-in-up`} style={{ animationDelay: `${1400 + index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg gradient-neural">{product.name}</CardTitle>
                      <Badge variant="outline" className="text-mystical border-mystical/30">
                        {product.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Card className="card-glass-primary hover-neural max-w-4xl mx-auto">
              <CardContent className="p-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-mystical/20 to-brand-purple/20 border border-mystical/30">
                    <Sparkles className="h-10 w-10 text-mystical" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 gradient-neural">Ready to Shape the Future?</h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  AI as an amplifier of human science—creating tools that tackle existential challenges and accelerate discovery for all.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="glass-apple hover-neural">
                    <Link to="/ozone">
                      Explore O³ Technology
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="glass-apple">
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