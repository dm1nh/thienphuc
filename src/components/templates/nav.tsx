import { Link, useLocation, type LinkProps } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

export function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="flex items-center gap-6">
      <NavLink to="/" active={pathname === "/"}>
        Trang chủ
      </NavLink>
      <NavLink to="/quotes" active={pathname.startsWith("/quotes")}>
        Phiếu báo giá
      </NavLink>
    </nav>
  )
}

function NavLink({
  active = false,
  className = "",
  ...props
}: LinkProps & { active?: boolean; className?: string }) {
  return (
    <Link
      className={cn({ "text-background font-bold": active }, className)}
      {...props}
    />
  )
}
