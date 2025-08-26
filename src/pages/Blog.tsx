
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Introducing Ozone: The Future of AI is Here",
      excerpt: "Today marks a significant milestone in AI development. We're excited to introduce Ozone, our revolutionary AI platform that combines cutting-edge language models with distributed computing.",
      author: "Ozone Team",
      date: "2024-08-26",
      readTime: "5 min",
      category: "Announcement",
      featured: true
    },
    {
      id: 2,
      title: "The Architecture Behind Ozone's Performance",
      excerpt: "Dive deep into the technical architecture that makes Ozone possible, from our novel attention mechanisms to distributed inference.",
      author: "Engineering Team",
      date: "2024-08-20",
      readTime: "8 min",
      category: "Technical",
      featured: false
    },
    {
      id: 3,
      title: "Scaling AI: Lessons from Building Ozone",
      excerpt: "What we learned building a globally distributed AI system and the challenges we overcame along the way.",
      author: "CTO",
      date: "2024-08-15",
      readTime: "6 min",
      category: "Engineering",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 glass" variant="secondary">
            Blog
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Latest <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Deep dives into AI, technology, and the future of machine intelligence
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Post</h2>
          
          {posts.filter(post => post.featured).map((post) => (
            <Card key={post.id} className="glass gradient-border mb-12">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <Badge className="glass">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
                
                <Button className="glass-hover">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">All Posts</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="glass glass-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="glass" variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass gradient-border text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get the latest insights on AI development and Ozone updates delivered to your inbox
              </p>
              <Button asChild size="lg" className="glass-hover">
                <Link to="/contact">
                  Subscribe to Newsletter <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Blog;
