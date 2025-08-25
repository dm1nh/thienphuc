import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { format } from "date-fns"
import { CalendarIcon, LoaderCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MAPPED_QUOTE_TYPES } from "@/lib/constants"
import { QuoteWithRecords } from "@/lib/db/schema"
import { createQuote, updateQuote } from "@/lib/helpers/data.helpers"
import {
  CreateQuoteFormInput,
  createQuoteFormInputSchema,
} from "@/lib/schemas/quote.schema"
import { cn } from "@/lib/utils"

export function QuoteForm({ quote }: { quote?: QuoteWithRecords }) {
  const isEditing = !!quote
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const initialValues: CreateQuoteFormInput = {
    id: quote?.id ?? "",
    type: quote?.type ?? "1",
    customer: quote?.customer ?? "",
    phoneNumber: quote?.phoneNumber ?? "",
    taxCode: quote?.taxCode ?? "",
    address: quote?.address ?? "",
    carModel: quote?.carModel ?? "",
    carRegistrationNumber: quote?.carRegistrationNumber ?? "",
    carOdometer: quote?.carOdometer ?? 0,
    carVin: quote?.carVin ?? "",
    date: quote?.date ?? new Date().toISOString(),
  }
  const form = useForm<CreateQuoteFormInput>({
    resolver: zodResolver(createQuoteFormInputSchema),
    values: initialValues,
  })

  async function onSubmit(values: CreateQuoteFormInput) {
    try {
      setLoading(true)

      if (isEditing) {
        await updateQuote({
          id: quote.id,
          data: values,
        })
        setLoading(false)
        router.invalidate({ sync: true })
        toast.success("Cập nhật phiếu báo giá thành công")
        return
      }

      await createQuote(values)
      setLoading(false)
      toast.success("Thêm phiếu báo giá thành công")
      router.invalidate({ sync: true })
      router.navigate({ to: "/quotes" })
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        toast.error(`Lỗi: ${err.message}`)
      }
      throw err
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Loại phiếu</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại phiếu báo giá" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(MAPPED_QUOTE_TYPES).map((type) => (
                    <SelectItem key={type} value={type}>
                      {
                        MAPPED_QUOTE_TYPES[
                          type as keyof typeof MAPPED_QUOTE_TYPES
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

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên khách hàng*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã số thuế</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mẫu xe*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carRegistrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biển số*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carOdometer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số KM</FormLabel>
              <FormControl>
                <NumberInput min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carVin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>VIN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày xuất phiếu</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd-MM-yyy")
                      ) : (
                        <span>Chọn ngày xuất phiếu</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(value) => field.onChange(value?.toISOString())}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading || !form.formState.isDirty}
          className="justify-self-start"
        >
          {loading ? (
            <>
              <LoaderCircleIcon className="animate-spin" /> Đang xử lý
            </>
          ) : quote ? (
            "Cập nhật"
          ) : (
            "Tạo mới"
          )}
        </Button>
      </form>
    </Form>
  )
}
