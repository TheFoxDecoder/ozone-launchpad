
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest in LEAP. We'll be in touch soon.",
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <Card className="glass gradient-border text-center max-w-md">
          <CardContent className="p-12">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              We've received your message and will get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="glass-hover">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 glass" variant="secondary">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact <span className="gradient-text">LEAP</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to explore the future of AI? Get in touch with our team to learn more about Ozone and how it can transform your applications.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="glass"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Your company"
                        className="glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="researcher">Researcher</SelectItem>
                          <SelectItem value="engineer">Engineer</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interest</label>
                    <Select value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
                      <SelectTrigger className="glass">
                        <SelectValue placeholder="What are you interested in?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api-access">API Access</SelectItem>
                        <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="research">Research Collaboration</SelectItem>
                        <SelectItem value="press">Press Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your use case and how we can help..."
                      className="glass min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass-hover"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-secondary mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">hello@leap.ai</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-secondary mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-secondary mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">
                      123 AI Boulevard<br />
                      San Francisco, CA 94105
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">General Inquiries</span>
                  <span className="font-medium">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enterprise</span>
                  <span className="font-medium">4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Press</span>
                  <span className="font-medium">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Support</span>
                  <span className="font-medium">1 hour</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
