import { Header } from "@/components/templates/header"
import { Container } from "@/components/ui/container"

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container className="py-8">{children}</Container>
    </>
  )
}
