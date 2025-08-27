
-- Create companies table for LEAP and other organizations
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create users profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  company_id UUID REFERENCES public.companies,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create ozone_models table for AI models
CREATE TABLE public.ozone_models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  description TEXT,
  model_type TEXT NOT NULL, -- 'neural', 'neuromorphic', 'eve-cycle'
  performance_score DECIMAL(5,2),
  energy_efficiency DECIMAL(5,2),
  training_data_size BIGINT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create benchmark_suites table
CREATE TABLE public.benchmark_suites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'reasoning', 'language', 'vision', 'multimodal'
  difficulty_level INTEGER DEFAULT 1,
  total_tests INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create benchmark_results table
CREATE TABLE public.benchmark_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES public.ozone_models NOT NULL,
  suite_id UUID REFERENCES public.benchmark_suites NOT NULL,
  metric_name TEXT NOT NULL,
  value DECIMAL(10,4) NOT NULL,
  unit TEXT,
  test_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_verified BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create access_requests table
CREATE TABLE public.access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  request_type TEXT DEFAULT 'general', -- 'api', 'partnership', 'research', 'general'
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ozone_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benchmark_suites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benchmark_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for public data (models, benchmarks)
CREATE POLICY "Anyone can view ozone models" ON public.ozone_models
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view benchmark suites" ON public.benchmark_suites
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view verified benchmark results" ON public.benchmark_results
  FOR SELECT USING (is_verified = true);

-- RLS Policies for companies
CREATE POLICY "Anyone can view companies" ON public.companies
  FOR SELECT USING (true);

-- RLS Policies for access requests
CREATE POLICY "Anyone can create access requests" ON public.access_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own access requests" ON public.access_requests
  FOR SELECT USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Insert initial data for LEAP
INSERT INTO public.companies (name, description, website) VALUES 
('LEAP', 'Leading Edge AI Platform - Pioneering the future of artificial intelligence with Ozone technology', 'https://leap.ai');

-- Insert sample Ozone models
INSERT INTO public.ozone_models (name, version, description, model_type, performance_score, energy_efficiency) VALUES 
('Ozone-Core', '1.0', 'Foundation neuromorphic model with Eve cycles', 'neuromorphic', 94.2, 89.5),
('Ozone-Reasoning', '1.2', 'Advanced reasoning model with minimal-pass learning', 'eve-cycle', 96.8, 92.1),
('Ozone-Vision', '0.9', 'Multimodal vision processing with organic processors', 'neural', 91.3, 87.9);

-- Insert sample benchmark suites
INSERT INTO public.benchmark_suites (name, description, category, total_tests) VALUES 
('LEAP-Reasoning', 'Comprehensive reasoning and logic benchmarks', 'reasoning', 1500),
('LEAP-Language', 'Natural language understanding and generation tests', 'language', 2800),
('LEAP-Vision', 'Computer vision and multimodal processing benchmarks', 'vision', 1200),
('LEAP-Efficiency', 'Energy efficiency and performance optimization tests', 'multimodal', 900);

-- Insert sample benchmark results
INSERT INTO public.benchmark_results (model_id, suite_id, metric_name, value, unit, is_verified) VALUES 
((SELECT id FROM public.ozone_models WHERE name = 'Ozone-Core' LIMIT 1),
 (SELECT id FROM public.benchmark_suites WHERE name = 'LEAP-Reasoning' LIMIT 1),
 'Accuracy', 94.2, 'percentage', true),
((SELECT id FROM public.ozone_models WHERE name = 'Ozone-Reasoning' LIMIT 1),
 (SELECT id FROM public.benchmark_suites WHERE name = 'LEAP-Language' LIMIT 1),
 'BLEU Score', 96.8, 'score', true),
((SELECT id FROM public.ozone_models WHERE name = 'Ozone-Vision' LIMIT 1),
 (SELECT id FROM public.benchmark_suites WHERE name = 'LEAP-Vision' LIMIT 1),
 'mAP', 91.3, 'percentage', true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ozone_models_updated_at BEFORE UPDATE ON public.ozone_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_benchmark_suites_updated_at BEFORE UPDATE ON public.benchmark_suites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_access_requests_updated_at BEFORE UPDATE ON public.access_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
