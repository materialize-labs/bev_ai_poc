export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative">
      {children}
    </div>
  )
} 