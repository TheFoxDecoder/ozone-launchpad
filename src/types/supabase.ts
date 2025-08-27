
export interface Profile {
  id: string;
  user_id: string;
  company_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  role?: "admin" | "user";
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Company {
  id: string;
  name: string;
  description?: string | null;
  website?: string | null;
  logo_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OzoneModel {
  id: string;
  name: string;
  version: string;
  description?: string | null;
  model_type: "neural" | "neuromorphic" | "eve-cycle";
  performance_score?: number | null;
  energy_efficiency?: number | null;
  training_data_size?: number | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BenchmarkSuite {
  id: string;
  name: string;
  description?: string | null;
  category: "reasoning" | "language" | "vision" | "multimodal";
  difficulty_level?: number;
  total_tests: number;
  source_link?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BenchmarkResult {
  id: string;
  model_id: string;
  suite_id: string;
  metric_name: string;
  value: number;
  unit?: string | null;
  test_date?: string;
  is_verified?: boolean;
  metadata?: any;
  created_at?: string;
  model?: { name?: string | null; version?: string | null } | null;
  suite?: { name?: string | null; category?: string | null } | null;
}

export interface AccessRequest {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
  request_type?: "api" | "partnership" | "research" | "general";
  status?: "pending" | "approved" | "rejected";
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  author_id?: string | null;
  status: "draft" | "published";
  published_at?: string | null;
  featured_image?: string | null;
  tags?: string[] | null;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
  author?: { name?: string | null } | null;
}
