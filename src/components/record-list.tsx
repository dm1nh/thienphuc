import { useRouter } from "@tanstack/react-router"
import { Trash2Icon } from "lucide-react"
import { NumericFormat } from "react-number-format"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RecordForm } from "@/forms/record-form"
import { MAPPED_RECORD_TYPES } from "@/lib/constants"
import type { QuoteWithRecords } from "@/lib/db/schema"
import { deleteRecord } from "@/lib/helpers/data.helpers"
import { calculateQuote } from "@/lib/utils"

export function RecordList({
  allowEdit = false,
  quote,
}: {
  allowEdit?: boolean
  quote: QuoteWithRecords
}) {
  const router = useRouter()

  async function onDeleteRecord(id: number) {
    await deleteRecord(id)
    router.invalidate({ sync: true })
  }

  const data = calculateQuote(quote)

  return (
    quote.records.length > 0 && (
      <div className="mt-4">
        <div>
          {Object.keys(data.groupedRecords).map((type) => {
            const { records, subtotal } = data.groupedRecords[type]
            return (
              <div key={type} className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="mb-1 font-medium uppercase">
                    {
                      MAPPED_RECORD_TYPES[
                        type as keyof typeof MAPPED_RECORD_TYPES
                      ]
                    }
                  </h3>
                  <NumericFormat
                    type="text"
                    className="mr-2 text-right text-base font-medium"
                    value={subtotal}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={0}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">STT</TableHead>
                      <TableHead>Hạng mục</TableHead>
                      <TableHead className="text-right">Đơn giá</TableHead>
                      <TableHead className="text-right">Số lượng</TableHead>
                      <TableHead>Đơn vị</TableHead>
                      <TableHead className="text-right">VAT(%)</TableHead>
                      <TableHead className="text-right">Thành tiền</TableHead>
                      {allowEdit && (
                        <TableHead className="text-right">Hành động</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record, _index) => (
                      <TableRow key={record.id}>
                        <TableCell>{_index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {record.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <NumericFormat
                            type="text"
                            className="max-w-[120px] text-right"
                            value={record.unitPrice}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={0}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {record.quantity}
                        </TableCell>
                        <TableCell>{record.unit}</TableCell>
                        <TableCell className="text-right">
                          {record.vat}
                        </TableCell>
                        <TableCell className="text-right">
                          <NumericFormat
                            type="text"
                            className="max-w-[120px] text-right font-medium"
                            value={record.total}
                            decimalScale={0}
                            thousandSeparator="."
                            decimalSeparator=","
                          />
                        </TableCell>
                        {allowEdit && (
                          <TableCell className="space-x-2 text-right">
                            <RecordForm quote={quote} recordId={record.id} />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                  <Trash2Icon />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Bạn có chắc muốn xóa hạng mục này?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Dữ liệu sẽ bị xóa vĩnh viễn và không thể
                                    khôi phục.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => onDeleteRecord(record.id)}
                                  >
                                    Tiếp tục
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          })}
          <div className="mt-2 flex justify-end">
            <table>
              <tbody>
                <tr>
                  <td className="w-[200px]">Thành tiền (chưa VAT):</td>
                  <td className="px-2">
                    <NumericFormat
                      type="text"
                      className="text-right font-medium"
                      value={data.grandTotalExcludingTax}
                      decimalScale={0}
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </td>
                </tr>
                <tr>
                  <td>Thuế VAT:</td>
                  <td className="px-2">
                    <NumericFormat
                      type="text"
                      className="text-right font-medium"
                      value={data.grandTax}
                      decimalScale={0}
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </td>
                </tr>
                <tr>
                  <td>Thành tiền:</td>
                  <td className="px-2">
                    <NumericFormat
                      type="text"
                      className="text-right font-medium"
                      value={data.grandTotal}
                      decimalScale={0}
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  )
}
