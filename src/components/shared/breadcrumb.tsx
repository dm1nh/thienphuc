import { Fragment } from "react"

import { Link } from "@tanstack/react-router"

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface BreadcrumbEntry {
  label: string
  to: string
}

export function Breadcrumb({
  breadcrumb = [{ label: "Màn hình chính", to: "/" }],
}: {
  breadcrumb?: BreadcrumbEntry[]
}) {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {breadcrumb.slice(0, -1).map(({ to, label }) => (
          <Fragment key={to}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={to}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {breadcrumb[breadcrumb.length - 1].label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}
