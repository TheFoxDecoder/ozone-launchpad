-- Create blog_posts table for content management
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES public.profiles(user_id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  tags TEXT[],
  reading_time INTEGER DEFAULT 5,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletters table for email subscriptions
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'bounced')),
  subscription_source TEXT DEFAULT 'website',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create api_keys table for user API access
CREATE TABLE public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  permissions JSONB DEFAULT '{"read": true, "write": false}',
  usage_count INTEGER DEFAULT 0,
  rate_limit INTEGER DEFAULT 1000,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user', 'researcher');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  role app_role NOT NULL,
  granted_by UUID REFERENCES auth.users,
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can create their own blog posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own blog posts" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for newsletters
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" ON public.newsletters
  FOR SELECT USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Admins can manage all newsletter subscriptions" ON public.newsletters
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for api_keys
CREATE POLICY "Users can view their own API keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" ON public.api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to check user roles (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON public.blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at 
  BEFORE UPDATE ON public.newsletters 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at 
  BEFORE UPDATE ON public.api_keys 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, status, published_at, tags, author_id) VALUES
(
  'Introducing Ozone: The Future of AI Architecture',
  'introducing-ozone-future-ai-architecture',
  'Discover how Ozone''s revolutionary neuromorphic design is transforming the landscape of artificial intelligence.',
  '# Introducing Ozone: The Future of AI Architecture

Artificial Intelligence has reached an inflection point. While traditional architectures have served us well, they''re hitting fundamental limitations in efficiency, adaptability, and resource consumption. Enter Ozone (O³) - our groundbreaking neuromorphic architecture that promises to redefine what''s possible in AI.

## The Problem with Traditional AI

Current AI systems suffer from three critical limitations:

1. **Massive Data Requirements**: Modern models require enormous datasets to achieve competent performance
2. **Energy Inefficiency**: Training and inference consume unsustainable amounts of computational resources  
3. **Inflexibility**: Once trained, models struggle to adapt to new scenarios without extensive retraining

## How Ozone Changes Everything

Ozone addresses these challenges through three core innovations:

### Minimal-Pass Learning
Our revolutionary learning approach reduces training data requirements by 90% while achieving superior performance. By mimicking how the human brain processes and retains information, Ozone can learn from far fewer examples.

### Neuromorphic Routing
Drawing inspiration from biological neural networks, our dynamic routing system optimizes information flow in real-time, reducing computational overhead by up to 85%.

### Eve Cycles
Self-evolving learning cycles that continuously adapt and improve performance with minimal supervision, enabling real-time learning and adaptation.

## Real-World Impact

The implications are transformative:
- **Healthcare**: Diagnostic AI that learns from limited patient data
- **Autonomous Systems**: Vehicles that adapt to new environments instantly  
- **Scientific Research**: Models that discover patterns in sparse datasets
- **Edge Computing**: Powerful AI that runs efficiently on mobile devices

## Looking Forward

Ozone represents more than an incremental improvement - it''s a fundamental reimagining of how artificial intelligence can work. As we continue development, we''re excited to share this journey with researchers, developers, and organizations ready to embrace the future of AI.

Stay tuned for detailed technical papers, benchmark results, and early access opportunities.',
  'published',
  now() - interval '2 days',
  ARRAY['AI', 'Ozone', 'Technology', 'Innovation'],
  (SELECT user_id FROM public.profiles LIMIT 1)
),
(
  'Eve Cycles: Self-Evolving Neural Networks',
  'eve-cycles-self-evolving-neural-networks',
  'Deep dive into Eve Cycles, the adaptive learning system that enables continuous improvement without traditional retraining.',
  '# Eve Cycles: Self-Evolving Neural Networks

One of the most exciting innovations in Ozone is our Eve Cycles system - a revolutionary approach to continuous learning that enables neural networks to evolve and improve autonomously.

## Traditional Learning vs. Eve Cycles

Traditional neural networks follow a rigid training paradigm: collect data, train model, deploy, repeat. This cycle is expensive, time-consuming, and creates static systems that can''t adapt to changing conditions.

Eve Cycles break this paradigm by implementing continuous, evolutionary learning cycles that mirror biological adaptation processes.

## How Eve Cycles Work

### 1. Pattern Discovery
The system continuously analyzes new data to identify emerging patterns and anomalies, building a dynamic understanding of the environment.

### 2. Hypothesis Generation  
Based on discovered patterns, the system generates hypotheses about optimal neural pathway configurations.

### 3. Micro-Evolution
Small, targeted modifications are made to neural connections, testing hypotheses in controlled experiments.

### 4. Performance Validation
Changes are validated against performance metrics, with successful adaptations retained and unsuccessful ones discarded.

### 5. Knowledge Integration
Validated improvements are integrated into the core model, becoming part of the permanent knowledge base.

## Key Advantages

- **Continuous Improvement**: Performance increases over time without manual intervention
- **Adaptation Speed**: Real-time response to changing conditions  
- **Resource Efficiency**: No need for expensive retraining cycles
- **Robustness**: Natural resilience to data drift and environmental changes

## Applications

Eve Cycles are particularly powerful in:
- Dynamic environments requiring real-time adaptation
- Systems with limited training data  
- Mission-critical applications demanding high reliability
- Edge devices with computational constraints

The future of AI is adaptive, efficient, and continuously improving. Eve Cycles are helping us build that future today.',
  'published',
  now() - interval '5 days',
  ARRAY['Eve Cycles', 'Machine Learning', 'Adaptive AI', 'Technical'],
  (SELECT user_id FROM public.profiles LIMIT 1)
);

-- Insert default admin role (you'll need to update the user_id after authentication is set up)
-- This will be updated once a user signs up
INSERT INTO public.companies (name, description) VALUES 
('LEAP Admin', 'Administrative access for LEAP platform');