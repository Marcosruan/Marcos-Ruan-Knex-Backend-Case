import type { InferSelectModel } from 'drizzle-orm'
import { users } from '../db/schema'
import { companies } from '../db/schema'
import { products } from '../db/schema'
import { orders } from '../db/schema'

export type UserResponse = InferSelectModel<typeof users>

export type CompanyResponse = InferSelectModel<typeof companies>

export type ProductResponse = InferSelectModel<typeof products>

export type OrdersResponse = InferSelectModel<typeof orders>