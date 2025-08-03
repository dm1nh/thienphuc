import { Link } from "@tanstack/react-router"

import { Breadcrumb } from "@/components/shared/breadcrumb"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const cards = [
  {
    to: "/quotes",
    label: "Phiếu báo giá",
    description: "Xem tất cả các phiếu báo giá",
  },
]

export function HomePage() {
  return (
    <>
      <Breadcrumb />
      <div className="grid grid-cols-2 gap-6">
        {cards.map(({ to, label, description }) => (
          <Link key={to} to={to}>
            <Card>
              <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
