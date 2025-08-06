import { ValidationInputError } from "@/lib/errors"
import {
  createRecordInputSchema,
  deleteRecordInputSchema,
  updateRecordInputSchema,
  type CreateRecordInput,
  type DeleteRecordInput,
  type UpdateRecordInput,
} from "@/lib/schemas/record.schema"

export const recordValidation = {
  createRecord: (input: CreateRecordInput) => {
    const { error } = createRecordInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
  updateRecord: (input: UpdateRecordInput) => {
    const { error } = updateRecordInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
  deleteRecord: (input: DeleteRecordInput) => {
    const { error } = deleteRecordInputSchema.safeParse(input)

    if (error) {
      throw new ValidationInputError("Validation failed", { cause: error })
    }
  },
}
