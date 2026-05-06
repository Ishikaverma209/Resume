import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwsdbmactzadcqobgzwf.supabase.co';
const supabaseKey = 'sb_publishable_dMKOfOoWps_aeMLGToiJeg_t95Xtr2S';

export const supabase = createClient(supabaseUrl, supabaseKey);
