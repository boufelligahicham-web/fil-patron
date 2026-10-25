import { readFileSync } from 'node:fs'
import pg from 'pg'

const file = process.argv[2]
const connectionString = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').replace(/[?&]sslmode=[^&]*/, '')
const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })

await client.connect()
await client.query(readFileSync(file, 'utf8'))
const { rows } = await client.query(
  "select table_name from information_schema.tables where table_schema = 'public' order by table_name",
)
console.log('Tables:', rows.map((r) => r.table_name).join(', '))
await client.end()
