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
import { Label } from "@/components/ui/label"
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
            <div className="grid gap-2">
              <Label>Khoảng cách lề</Label>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="marginLeft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Trái (cm)</FormLabel>
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
                      <FormLabel className="font-normal">Phải (cm)</FormLabel>
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
                      <FormLabel className="font-normal">Trên (cm)</FormLabel>
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
                      <FormLabel className="font-normal">Dưới (cm)</FormLabel>
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
              </div>
            </div>
            <DialogClose asChild>
              <Button>Lưu</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
