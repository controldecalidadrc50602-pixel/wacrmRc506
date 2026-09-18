import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data: msgs } = await supabase.from('messages').select('*').order('created_at', {ascending: false}).limit(5);
  console.log("MESSAGES:", JSON.stringify(msgs, null, 2));
  const { data: convs } = await supabase.from('conversations').select('*').order('created_at', {ascending: false}).limit(5);
  console.log("CONVERSATIONS:", JSON.stringify(convs, null, 2));
  const { data: contacts } = await supabase.from('contacts').select('*').order('created_at', {ascending: false}).limit(5);
  console.log("CONTACTS:", JSON.stringify(contacts, null, 2));
}
run();
