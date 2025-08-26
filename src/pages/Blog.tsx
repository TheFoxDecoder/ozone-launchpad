
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, User, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  // Fetch published blog posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1) || [];

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

      {isLoading ? (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse">Loading posts...</div>
          </div>
        </section>
      ) : posts && posts.length > 0 ? (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="py-12 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Featured Post</h2>
                
                <Card className="glass gradient-border mb-12">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <Badge className="glass">Featured</Badge>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{featuredPost.author?.name || 'LEAP Team'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {featuredPost.published_at 
                                ? new Date(featuredPost.published_at).toLocaleDateString()
                                : 'Recently'
                              }
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    
                    <Button className="glass-hover">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* All Posts */}
          {otherPosts.length > 0 && (
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">All Posts</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <Card key={post.id} className="glass glass-hover">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="glass" variant="secondary">Article</Badge>
                          <span className="text-sm text-muted-foreground">5 min read</span>
                        </div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground space-x-2">
                            <User className="h-3 w-3" />
                            <span>{post.author?.name || 'LEAP Team'}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {post.published_at 
                                ? new Date(post.published_at).toLocaleDateString()
                                : 'Recently'
                              }
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Coming Soon / Empty State */
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="glass gradient-border text-center">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-full glass mx-auto mb-6 flex items-center justify-center">
                  <PenTool className="h-8 w-8 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Blog Coming Soon</h2>
                <p className="text-muted-foreground mb-8">
                  We're preparing insightful articles about AI breakthroughs, Ozone development, 
                  and the future of machine intelligence. Stay tuned for our first posts!
                </p>
                <Button asChild className="glass-hover">
                  <Link to="/contact">Get Notified When We Launch</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

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
