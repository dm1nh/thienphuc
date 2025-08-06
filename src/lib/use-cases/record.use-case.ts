import { recordRepository } from "@/lib/repositories/record.repository"
import type {
  CreateRecordInput,
  DeleteRecordInput,
  UpdateRecordInput,
} from "@/lib/schemas/record.schema"
import { recordValidation } from "@/lib/validations/record.validation"

export const recordUseCase = {
  createRecord: (input: CreateRecordInput) => {
    recordValidation.createRecord(input)
    return recordRepository.createRecord(input)
  },
  updateRecord: (input: UpdateRecordInput) => {
    recordValidation.updateRecord(input)
    return recordRepository.updateRecord(input)
  },
  deleteRecord: (input: DeleteRecordInput) => {
    recordValidation.deleteRecord(input)
    return recordRepository.deleteRecord(input)
  },
}
