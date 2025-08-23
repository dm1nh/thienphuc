import { Link, useLoaderData, useRouter } from "@tanstack/react-router"
import { format } from "date-fns"
import { EditIcon, PrinterIcon, Trash2Icon } from "lucide-react"

import { RecordList } from "@/components/record-list"
import { Breadcrumb } from "@/components/shared/breadcrumb"
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
import { Separator } from "@/components/ui/separator"
import type { QuoteWithRecords } from "@/lib/db/schema"
import { deleteQuote } from "@/lib/helpers/data.helpers"

export function HydrateFallback() {
  return <div>Đang tải...</div>
}

export function QuotePage() {
  const router = useRouter()

  const data = useLoaderData({ from: "/quotes/$quoteId" }) as QuoteWithRecords

  async function onDeleteQuote() {
    await deleteQuote(data.id)
    router.invalidate({ sync: true })
    router.navigate({ to: "/quotes" })
  }

  return (
    <>
      <Breadcrumb
        breadcrumb={[
          {
            to: "/",
            label: "Màn hình chính",
          },
          { to: "/quotes", label: "Phiếu sửa chữa" },
          { to: `/quotes/${data.id}`, label: `#${data.id}` },
        ]}
      />

      <div className="space-x-2">
        <Link to={`/quotes/$quoteId/print`} params={{ quoteId: data.id }}>
          <Button size="sm">
            <PrinterIcon /> In
          </Button>
        </Link>

        <Link to={`/quotes/$quoteId/edit`} params={{ quoteId: data.id }}>
          <Button size="sm" variant="outline">
            <EditIcon /> Cập nhật
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2Icon /> Xóa
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bạn có chắc muốn xóa phiếu báo giá này?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteQuote}>
                Tiếp tục
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <p>Số: {data.id}</p>
        <p>Khách hàng: {data.customer}</p>
        <p>Điện thoại: {data.phoneNumber}</p>
        <p>Địa chỉ: {data.address ?? "N/A"}</p>
        <p>Mã số thuế: {data.taxCode ?? "N/A"}</p>
        <p>Mẫu xe: {data.carModel ?? "N/A"}</p>
        <p>Biển số: {data.carRegistrationNumber ?? "N/A"}</p>
        <p>Số km: {data.carOdometer ?? "N/A"}</p>
        <p>VIN: {data.carVin ?? "N/A"}</p>
        <p>Ngày: {format(data.date, "dd-MM-yyy")}</p>
        <p>Ngày tạo: {format(data.createdAt, "dd-MM-yyy")}</p>
        <p>Cập nhật: {format(data.updatedAt, "dd-MM-yyy")}</p>
      </div>
      <Separator />
      <RecordList quote={data} />
    </>
  )
}
