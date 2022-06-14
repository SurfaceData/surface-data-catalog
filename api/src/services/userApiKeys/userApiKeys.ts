import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import generateApiKey from 'generate-api-key'

import { db } from 'src/lib/db'

export const userApiKey: QueryResolvers['userApiKey'] = (
  args,
  { root, context, info }
) => {
  const id = context.currentUser.sub
  return db.userApiKey.findUnique({
    where: { id },
  })
}

export const createUserApiKey: MutationResolvers['createUserApiKey'] = (
  args,
  { root, context, info }
) => {
  const id = context.currentUser.sub
  const key = generateApiKey({ method: 'bytes' })
  return db.userApiKey.create({
    data: {
      id,
      key,
    },
  })
}

export const deleteUserApiKey: MutationResolvers['deleteUserApiKey'] = (
  args,
  { root, context, info }
) => {
  const id = context.currentUser.sub
  return db.userApiKey.delete({
    where: { id },
  })
}
