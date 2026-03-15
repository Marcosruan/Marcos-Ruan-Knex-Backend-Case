import type { InferSelectModel } from 'drizzle-orm'
import { users } from '../../db/schema'

export type UserResponse = InferSelectModel<typeof users>