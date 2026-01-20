import { createClient } from "@/lib/supabase/server"
import { UsersClient } from "./users-client"

export const metadata = {
  title: "Usuarios | Admin",
}

export default async function AdminUsuariosPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-4 lg:p-8">
      <UsersClient users={users || []} />
    </div>
  )
}
