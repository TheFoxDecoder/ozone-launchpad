
import AnimatedLogo from "@/components/AnimatedLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with cutting-edge architecture"
    },
    {
      icon: Shield,
      title: "Secure by Design",
      description: "Built with security and privacy as core principles"
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Next-generation AI capabilities at your fingertips"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <AnimatedLogo />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up animate-delay-200">
            Welcome to <span className="gradient-text">Ozone</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up animate-delay-400">
            The next generation AI platform that transforms how you think about machine intelligence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-600">
            <Button asChild size="lg" className="glass-hover">
              <Link to="/ozone">
                Discover Ozone <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass-hover">
              <Link to="/benchmarks">
                View Benchmarks
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="gradient-text">Ozone</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="glass glass-hover animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg glass mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass gradient-border">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to experience the future?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers already building with Ozone
              </p>
              <Button asChild size="lg" className="glass-hover">
                <Link to="/contact">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
