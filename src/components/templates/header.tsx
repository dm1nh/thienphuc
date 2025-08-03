import { Container } from "@/components/ui/container"

import { Logo } from "./logo"
import { Nav } from "./nav"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <Container className="flex h-16 flex-row items-center gap-8 space-y-0">
        <Logo />
        <Nav />
      </Container>
    </header>
  )
}
