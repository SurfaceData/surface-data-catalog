import { db } from 'src/lib/db'
import { supabaseClient } from 'src/lib/supabase'

export const users = async () => {
  const { data, error } = await supabaseClient.auth.api.listUsers()
  const result = await db.userRoles.findMany()
  const roleMap = result.reduce((m, entry) => {
    m.set(entry.id, entry.role)
    return m
  }, new Map())
  const users = data.map((user) => {
    return {
      id: user.id,
      email: user.email,
      role: roleMap.get(user.id) || 'general',
    }
  })
  return users
}

export const updateUserRole = async ({ id, role }) => {
  console.log(id)
  console.log(role)
  return await db.userRoles.update({
    data: {
      role: role,
    },
    where: { id },
  })
}
