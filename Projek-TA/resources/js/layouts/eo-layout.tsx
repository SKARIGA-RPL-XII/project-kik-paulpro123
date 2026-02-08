import { PropsWithChildren } from "react"
import EOHeader from "@/components/eo-header"
import EOSidebar from "@/components/eo-sidebar"

interface EOLayoutProps extends PropsWithChildren {
  title?: string
}

export default function EOLayout({ children, title }: EOLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <EOSidebar />

      <div className="flex-1 flex flex-col">
        <EOHeader title={title} />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}