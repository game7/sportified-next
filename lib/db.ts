import { PrismaClient } from '@prisma/client'

// declare global {
//   var db: PrismaClient
// }

let db: PrismaClient

// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!global['db']) {
    global['db'] = new PrismaClient()
  }
  db = global['db']
}

export default db