
-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE content_status AS ENUM ('draft', 'scheduled', 'published');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role user_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Benchmark Suites
CREATE TABLE public.benchmark_suites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  source_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Benchmark Results
CREATE TABLE public.benchmark_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  suite_id UUID NOT NULL REFERENCES public.benchmark_suites(id) ON DELETE CASCADE,
  task_name TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  value DECIMAL NOT NULL,
  units TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  artifact_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  published_at TIMESTAMP WITH TIME ZONE,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  cover_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Press Items
CREATE TABLE public.press_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  outlet TEXT NOT NULL,
  url TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Release Notes
CREATE TABLE public.release_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL,
  notes TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- API Keys
CREATE TABLE public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL UNIQUE,
  scopes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  revoked_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benchmark_suites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benchmark_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.press_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
    AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for benchmark_suites (public read, admin write)
CREATE POLICY "Anyone can view benchmark suites" ON public.benchmark_suites
  FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Admins can manage benchmark suites" ON public.benchmark_suites
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for benchmark_results (public read, admin write)
CREATE POLICY "Anyone can view benchmark results" ON public.benchmark_results
  FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Admins can manage benchmark results" ON public.benchmark_results
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blog_posts (public read published, admin/editor write)
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT TO authenticated, anon USING (status = 'published');
CREATE POLICY "Editors can view all blog posts" ON public.blog_posts
  FOR SELECT USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors can manage blog posts" ON public.blog_posts
  FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies for newsletters (public read published, admin write)
CREATE POLICY "Anyone can view published newsletters" ON public.newsletters
  FOR SELECT TO authenticated, anon USING (status = 'published');
CREATE POLICY "Admins can manage newsletters" ON public.newsletters
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for newsletter_subscribers (admin only)
CREATE POLICY "Admins can manage newsletter subscribers" ON public.newsletter_subscribers
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for press_items (public read, admin write)
CREATE POLICY "Anyone can view press items" ON public.press_items
  FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Admins can manage press items" ON public.press_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for release_notes (public read, admin write)
CREATE POLICY "Anyone can view release notes" ON public.release_notes
  FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Admins can manage release notes" ON public.release_notes
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for api_keys (users can view own, admin can view all)
CREATE POLICY "Users can view own API keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own API keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can revoke own API keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all API keys" ON public.api_keys
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'name', new.email),
    CASE 
      WHEN new.email = 'admin@leap.ai' THEN 'admin'::user_role
      ELSE 'viewer'::user_role
    END
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample benchmark suites
INSERT INTO public.benchmark_suites (slug, title, description, source_link) VALUES
  ('mmlu', 'MMLU', 'Massive Multitask Language Understanding', 'https://github.com/hendrycks/test'),
  ('mmlu-pro', 'MMLU-Pro', 'Enhanced version of MMLU with more challenging questions', 'https://github.com/TIGER-AI-Lab/MMLU-Pro'),
  ('longbench-v3', 'LongBench v3', 'Long context understanding benchmark', 'https://github.com/THUDM/LongBench'),
  ('livecodebench', 'LiveCodeBench', 'Live coding benchmark with real-world problems', 'https://github.com/LiveCodeBench/LiveCodeBench'),
  ('archagi-3', 'ArchAGI 3', 'Architectural AGI reasoning benchmark', 'https://github.com/fchollet/ARC-AGI');

-- Insert sample benchmark results
INSERT INTO public.benchmark_results (suite_id, task_name, metric_name, value, units, date, is_verified, notes) VALUES
  ((SELECT id FROM public.benchmark_suites WHERE slug = 'mmlu'), 'Overall', 'Accuracy', 94.2, '%', '2024-08-26', true, 'Ozone-13B performance on MMLU benchmark'),
  ((SELECT id FROM public.benchmark_suites WHERE slug = 'mmlu-pro'), 'Overall', 'Accuracy', 89.1, '%', '2024-08-26', true, 'Ozone-13B performance on MMLU-Pro'),
  ((SELECT id FROM public.benchmark_suites WHERE slug = 'longbench-v3'), 'Overall', 'Score', 78.5, 'points', '2024-08-25', true, 'Long context understanding evaluation'),
  ((SELECT id FROM public.benchmark_suites WHERE slug = 'livecodeench'), 'Overall', 'Pass Rate', 82.3, '%', '2024-08-24', true, 'Code generation and debugging tasks'),
  ((SELECT id FROM public.benchmark_suites WHERE slug = 'archagi-3'), 'Overall', 'Score', 67.9, 'points', '2024-08-23', true, 'Abstract reasoning performance');
