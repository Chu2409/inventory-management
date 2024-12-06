export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-col p-6 md:py-8 md:px-12 lg:px-20 bg-muted/40 h-full w-full'>
      {children}
    </main>
  )
}
