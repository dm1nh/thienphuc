import { useRef } from "react"

import { notFound, useLoaderData } from "@tanstack/react-router"
import { format } from "date-fns"
import { PrinterIcon } from "lucide-react"
import { useReactToPrint } from "react-to-print"

import { RecordList } from "@/components/record-list"
import { Breadcrumb } from "@/components/shared/breadcrumb"
import { Button } from "@/components/ui/button"
import { MAPPED_QUOTE_TYPES } from "@/lib/constants"
import type { QuoteWithRecords } from "@/lib/db/schema"

export function PrintQuotePage() {
  const data = useLoaderData({
    from: "/quotes/$quoteId/print",
  }) as QuoteWithRecords
  console.log(data)

  const contentRef = useRef<HTMLDivElement>(null)
  const print = useReactToPrint({ contentRef })

  if (!data) {
    return notFound()
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
          { to: `/quotes/${data.id}/print`, label: "In" },
        ]}
      />

      <p className="text-destructive text-center">
        Vui lòng kiểm tra phiếu báo giá lần cuối trước khi in phiếu
      </p>
      <div
        ref={contentRef}
        className="mx-auto flex w-[960px] flex-col items-stretch p-6"
      >
        <div className="flex items-center justify-center gap-16">
          <img src="/images/logo.jpg" alt="Logo" className="w-[192px]" />
          <div>
            <p className="font-semibold uppercase">
              Gara ô tô Thiên Phúc Workshop
            </p>
            <p>
              Địa chỉ: 72 Trần Đại Nghĩa, Phường Tân Tạo A, quận Bình Tân, TP.
              Hồ Chí Minh
            </p>
            <p>Tel: 093.82.84.079 hoặc 096.444.62.64</p>
            <p>Website: thienphucworkshop.com.vn</p>
            <p>Email: thienphucworkshop@gmail.com</p>
            <p>Số TK: 060333030813 - SACOMBANK - CN Hồ Chí Minh</p>
          </div>
        </div>
        <h1 className="mt-8 text-center text-2xl font-semibold uppercase">
          {MAPPED_QUOTE_TYPES[data.type]}
        </h1>
        <div className="mt-2 flex justify-center">
          <table>
            <tbody>
              <tr>
                <td className="w-[80px]">Ngày:</td>
                <td>{format(data.date, "dd-MM-yyy")}</td>
              </tr>
              <tr>
                <td className="w-[80px]">Số:</td>
                <td>{data.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-[150px]">Khách hàng:</td>
                <td className="uppercase">{data.customer}</td>
              </tr>
              <tr>
                <td>Địa chỉ:</td>
                <td>{data.address ?? "N/A"}</td>
              </tr>
              <tr>
                <td>Điện thoại:</td>
                <td>{data.phoneNumber}</td>
                <td className="w-[150px]">Biển số:</td>
                <td>{data.carRegistrationNumber ?? "N/A"}</td>
              </tr>
              <tr>
                <td>Mã số thuế:</td>
                <td>{data.taxCode ?? "N/A"}</td>
                <td>Số KM:</td>
                <td>{data.carOdometer ?? "N/A"}</td>
              </tr>
              <tr>
                <td>Loại xe:</td>
                <td>{data.carModel ?? "N/A"}</td>
                <td>VIN:</td>
                <td>{data.carVin ?? "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <RecordList quote={data} />
        <div className="mt-4">
          <h3 className="font-semibold">Ghi chú</h3>
          <p>
            <span className="font-semibold">Lưu ý</span>: Báo giá này chỉ có giá
            trị trong vòng 07 ngày kể từ ngày xuất phiếu. Những chi phí phát
            sinh ngoài phần báo giá sẽ được thông báo sau khi tháo ra kiểm tra
            trực tiếp.
          </p>
          <ul>
            <li>
              - Phụ tùng thay thế chính hãng được bảo hành 6 tháng hoặc 10.000
              km tùy điều kiện nào đến trước (trừ các phụ tùng cho công việc bảo
              dưỡng định kỳ và phụ tùng hao mòn tự nhiên).
            </li>
            <li>
              - Đồng sơn bảo hành 6 tháng hoặc 6.000 km tùy điều kiện nào đến
              trước.
            </li>
            <li>
              - Công việc thực hiện sữa chữa tại xưởng dịch vụ bảo hành 3 tháng
              hoặc 3.000 km tùy điều kiện nào đến trước.
            </li>
            <li>
              - Đối với trường hợp đặt phụ tùng, khách hàng vui lòng đặt cọc
              100% giá trị phụ tùng. Thời gian khách hàng đến nhận và thay thế
              là 30 ngày kể từ ngày thông báo có phụ tùng. Sau thời gian trên,
              khách hàng không đến nhận và thay thế sẽ mất cọc.
            </li>
          </ul>
          <p>Rất hân hạnh được đón tiếp và làm việc cùng quý khách hàng!</p>
        </div>
        <div className="mt-6 grid grid-cols-3 grid-rows-[200px]">
          <div className="flex flex-col items-center">
            <p className="uppercase">Chấp thuận của khách hàng</p>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="uppercase">Giám đốc dịch vụ</p>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="uppercase">Cố vấn dịch vụ</p>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
        </div>
      </div>
      <Button onClick={print} className="w-full">
        <PrinterIcon /> Xác nhận và In phiếu
      </Button>
    </>
  )
}
