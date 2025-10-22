// // config/supabase.config.js
// require('dotenv').config();
// const { createClient } = require('@supabase/supabase-js');

// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// module.exports = { supabase };



require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY; // <-- use service role key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase };
