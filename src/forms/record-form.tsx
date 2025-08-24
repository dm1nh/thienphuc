import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { PenIcon, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NumberInput } from "@/components/ui/number-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MAPPED_RECORD_TYPES, VAT_VALUES } from "@/lib/constants"
import type { QuoteWithRecords } from "@/lib/db/schema"
import { createRecord, updateRecord } from "@/lib/helpers/data.helpers"
import {
  createRecordFormInputSchema,
  type CreateRecordFormInput,
} from "@/lib/schemas/record.schema"

export function RecordForm({
  quote,
  recordId,
}: {
  quote: QuoteWithRecords
  recordId?: number
}) {
  const router = useRouter()

  const record = quote.records.find((record) => record.id === recordId)

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const initialValues = {
    name: record?.name ?? "",
    unitPrice: record?.unitPrice ?? 0,
    unit: record?.unit ?? "",
    quantity: record?.quantity ?? 1,
    vat: record?.vat ?? 8,
    type: record?.type ?? "1",
  }

  const form = useForm<CreateRecordFormInput>({
    resolver: zodResolver(createRecordFormInputSchema),
    values: initialValues,
  })

  async function onSubmit(values: CreateRecordFormInput) {
    try {
      setLoading(true)
      if (!record) {
        await createRecord({
          ...values,
          quoteId: quote.id,
        })
        toast.success("Tạo mới hạng mục thành công")
      } else {
        await updateRecord({ id: record.id, data: values })
        toast.success("Cập nhật hạng mục thành công")
      }
      router.invalidate({ sync: true })
      form.reset()
      setOpen(false)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        toast.error(err.message)
      }
      throw err
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {recordId ? (
          <Button variant="outline" size="icon">
            <PenIcon />
          </Button>
        ) : (
          <Button variant="secondary">
            <PlusIcon /> Thêm hạng mục
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {record ? `Cập nhật hạng mục` : "Thêm hạng mục"}
        </DialogTitle>
        <DialogDescription>
          {record
            ? `Cập nhật hạng mục #${record.id} trong phiếu #${quote.id}`
            : `Thêm hạng mục mới vào phiếu #${quote.id}`}
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên hạng mục</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đơn giá</FormLabel>
                  <FormControl>
                    <NumberInput min={0} stepper={1000} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đơn vị tính</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <NumberInput
                      min={0}
                      allowedDecimalSeparators={["."]}
                      decimalScale={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT(%)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VAT_VALUES.map((vl) => (
                        <SelectItem key={vl} value={vl.toString()}>
                          {vl.toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại hạng mục</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(MAPPED_RECORD_TYPES).map((type) => (
                        <SelectItem key={type} value={type}>
                          {
                            MAPPED_RECORD_TYPES[
                              type as keyof typeof MAPPED_RECORD_TYPES
                            ]
                          }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading || !form.formState.isDirty}>
              {record ? "Cập nhật" : "Thêm"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
