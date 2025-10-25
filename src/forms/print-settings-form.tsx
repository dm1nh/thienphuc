import { zodResolver } from "@hookform/resolvers/zod"
import { SettingsIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { NumberInput } from "@/components/ui/number-input"
import {
  printSettingsFormInputSchema,
  type PrintSettingsFormInput,
} from "@/lib/schemas/quote.schema"

export function PrintSettingsForm({
  setSettings,
}: {
  setSettings: React.Dispatch<React.SetStateAction<PrintSettingsFormInput>>
}) {
  const form = useForm<PrintSettingsFormInput>({
    resolver: zodResolver(printSettingsFormInputSchema),
    defaultValues: {
      marginLeft: 1.5,
      marginRight: 1.5,
      marginTop: 1.5,
      marginBottom: 3,
    },
  })

  function onSubmit(values: PrintSettingsFormInput) {
    console.log(values)
    setSettings(values)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="w-full">
          <SettingsIcon /> Cài đặt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Cài đặt in</DialogTitle>
        <DialogDescription>
          {" "}
          Thiết lập các thông số trước khi in
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="marginLeft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Left</FormLabel>
                  <FormControl>
                    <NumberInput
                      min={0}
                      decimalScale={1}
                      fixedDecimalScale
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marginRight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Right</FormLabel>
                  <FormControl>
                    <NumberInput
                      min={0}
                      decimalScale={1}
                      fixedDecimalScale
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marginTop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Top</FormLabel>
                  <FormControl>
                    <NumberInput
                      min={0}
                      decimalScale={1}
                      fixedDecimalScale
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marginBottom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bottom</FormLabel>
                  <FormControl>
                    <NumberInput
                      min={0}
                      decimalScale={1}
                      fixedDecimalScale
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button>Lưu</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
