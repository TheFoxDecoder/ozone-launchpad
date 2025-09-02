import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { email, name, source = 'website' } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Try to insert new subscription
    const { data, error } = await supabase
      .from('newsletters')
      .insert({
        email,
        name,
        subscription_source: source,
        status: 'subscribed'
      })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        // Update existing subscription status
        const { data: updateData, error: updateError } = await supabase
          .from('newsletters')
          .update({ 
            status: 'subscribed',
            name: name || undefined,
            subscription_source: source,
            updated_at: new Date().toISOString()
          })
          .eq('email', email)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating subscription:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to update subscription' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            message: 'Subscription updated successfully',
            data: updateData
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      console.error('Error subscribing to newsletter:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe to newsletter' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log successful subscription
    console.log(`New newsletter subscription: ${email} from ${source}`);

    return new Response(
      JSON.stringify({ 
        message: 'Successfully subscribed to newsletter',
        data
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});