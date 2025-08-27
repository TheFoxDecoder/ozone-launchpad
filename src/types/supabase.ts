
export interface Profile {
  id: string;
  name: string | null;
  role?: "admin" | "editor" | "viewer";
}

export interface BenchmarkSuite {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  source_link?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BenchmarkResult {
  id: string;
  suite_id: string;
  task_name: string;
  metric_name: string;
  value: number | string;
  units?: string | null;
  date: string; // ISO date string
  notes?: string | null;
  artifact_url?: string | null;
  is_verified: boolean;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  suite?: { title?: string | null; slug?: string | null } | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  author_id: string;
  published_at?: string | null;
  status: "draft" | "scheduled" | "published";
  created_at?: string;
  updated_at?: string;
  author?: { name?: string | null } | null;
}
