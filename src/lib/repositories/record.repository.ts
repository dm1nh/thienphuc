import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import type {
  CreateRecordInput,
  DeleteRecordInput,
  UpdateRecordInput,
} from "@/lib/schemas/record.schema"

import { records } from "../db/schema"

export const recordRepository = {
  createRecord: async (input: CreateRecordInput) => {
    const [record] = await db
      .insert(records)
      .values(input)
      .returning({ id: records.id })
    return record.id
  },
  updateRecord: async (input: UpdateRecordInput) => {
    const [record] = await db
      .update(records)
      .set(input.data)
      .where(eq(records.id, input.id))
      .returning({ id: records.id })
    return record.id
  },
  deleteRecord: async (input: DeleteRecordInput) => {
    const [record] = await db
      .delete(records)
      .where(eq(records.id, input))
      .returning({ id: records.id })
    return record.id
  },
}
