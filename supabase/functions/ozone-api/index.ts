import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

interface ApiKeyData {
  user_id: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
  rate_limit: number;
  usage_count: number;
  is_active: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const apiKey = req.headers.get('x-api-key');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate API key
    const keyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(apiKey));
    const hashArray = Array.from(new Uint8Array(keyHash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('user_id, permissions, rate_limit, usage_count, is_active')
      .eq('key_hash', hashHex)
      .eq('is_active', true)
      .single();

    if (keyError || !keyData) {
      console.error('Invalid API key attempt:', apiKey.substring(0, 10) + '...');
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const apiKeyData = keyData as ApiKeyData;

    // Check rate limiting (basic implementation)
    if (apiKeyData.usage_count >= apiKeyData.rate_limit) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Update usage count
    await supabase
      .from('api_keys')
      .update({ 
        usage_count: (apiKeyData.usage_count || 0) + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('key_hash', hashHex);

    const url = new URL(req.url);
    const endpoint = url.pathname.split('/').pop();

    switch (endpoint) {
      case 'models':
        if (req.method === 'GET') {
          if (!apiKeyData.permissions.read) {
            return new Response(
              JSON.stringify({ error: 'Read permission required' }),
              { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const { data: models, error: modelsError } = await supabase
            .from('ozone_models')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

          if (modelsError) {
            return new Response(
              JSON.stringify({ error: 'Failed to fetch models' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ 
              data: models,
              meta: {
                count: models?.length || 0,
                endpoint: 'models'
              }
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        break;

      case 'benchmarks':
        if (req.method === 'GET') {
          if (!apiKeyData.permissions.read) {
            return new Response(
              JSON.stringify({ error: 'Read permission required' }),
              { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          const { data: benchmarks, error: benchmarksError } = await supabase
            .from('benchmark_results')
            .select(`
              *,
              model:ozone_models(name, version),
              suite:benchmark_suites(name, category)
            `)
            .eq('is_verified', true)
            .order('test_date', { ascending: false })
            .limit(100);

          if (benchmarksError) {
            return new Response(
              JSON.stringify({ error: 'Failed to fetch benchmarks' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({ 
              data: benchmarks,
              meta: {
                count: benchmarks?.length || 0,
                endpoint: 'benchmarks'
              }
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        break;

      case 'status':
        return new Response(
          JSON.stringify({ 
            status: 'active',
            version: '1.0.0',
            ozone_version: 'O³-1.2.0',
            api_version: 'v1',
            user_id: apiKeyData.user_id,
            permissions: apiKeyData.permissions,
            usage: {
              current: apiKeyData.usage_count || 0,
              limit: apiKeyData.rate_limit || 1000
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        return new Response(
          JSON.stringify({ 
            error: 'Endpoint not found',
            available_endpoints: ['models', 'benchmarks', 'status']
          }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});