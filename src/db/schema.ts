import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  username: text('username'),
  chatId: integer('chat_id').notNull().unique(),
  coins: integer('coins').notNull().default(0),
  refer: integer('refer_id').notNull(),
  level1: integer('level_1').notNull().default(0),
  level2: integer('level_2').notNull().default(0),
  level3: integer('level_3').notNull().default(0),
  withdraw: integer('withdraw').notNull().default(0),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert


export const videos = sqliteTable('videos', {
  id: integer('id').primaryKey(),
  videoId: text('video_id').notNull(),
  coins: integer('coins').notNull().default(0),
  code: integer('code').notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type Videos = typeof videos.$inferSelect
export type InsertVideos = typeof videos.$inferInsert


export const videoDone = sqliteTable('videoDone', {
  id: integer('id').primaryKey(),
  videoId: integer('video_id')
    .notNull(),
  chatId: integer('chat_id')
    .notNull(),
  completedAt: text('completed_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type VideoDone = typeof videoDone.$inferSelect
export type InsertVideoDone = typeof videoDone.$inferInsert

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  platform: text('platform').notNull(),
  name: text('name').notNull(),
  coins: integer('coins').notNull().default(0),
  link: text('link').notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type Tasks = typeof tasks.$inferSelect
export type InsertTasks = typeof tasks.$inferInsert

export const taskDone = sqliteTable('taskDone', {
  id: integer('id').primaryKey(),
  task_id: integer('task_id')
    .notNull(),
  chat_id: integer('chat_id')
    .notNull(),
  completed_at: text('completed_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type TaskDone = typeof taskDone.$inferSelect
export type InsertTaskDone = typeof taskDone.$inferInsert

export const games = sqliteTable('games', {
  id: integer('id').primaryKey(),
  gameId: text('game_id').notNull(),
  coins: integer('coins').notNull().default(0),
  code: integer('code').notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type Games = typeof games.$inferSelect
export type InsertGames= typeof games.$inferInsert


export const history = sqliteTable('history', {
  id: integer('id').primaryKey(),
  name: text('name'),
  coin: integer('coin'),
  status: integer('status'),
  chatId: integer('chat_id'),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type History = typeof history.$inferSelect
export type InsertHistory = typeof history.$inferInsert

export const withdwaral = sqliteTable('withdwaral', {
  id: integer('id').primaryKey(),
  coins: integer('coins'),
  method: text('method'),
  address: text('address'),
  chatId: integer('chat_id'),
  status: integer('status'),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type Withdwaral = typeof withdwaral.$inferSelect
export type InsertWithdwaral = typeof withdwaral.$inferInsert

export const plans = sqliteTable('plans', {
  id: integer('id').primaryKey(),
  requests: integer('requests').default(0),
  price: integer('price').default(0),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type Plans = typeof plans.$inferSelect
export type InsertPlans = typeof plans.$inferInsert

export const setting = sqliteTable('setting', {
  id: integer('id').primaryKey(),
  refer1: integer('refer1').default(0),
  refer2: integer('refer2').default(0),
  refer3: integer('refer3').default(0),
  planId: integer('plan_id').default(0),
  admin: text('admin').default("admin"),
  password: text('password').default("password"),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
})

export type Setting = typeof setting.$inferSelect
export type InsertSetting = typeof setting.$inferInsert