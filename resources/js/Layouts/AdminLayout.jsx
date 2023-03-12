import Sidebar from "@/Components/Sidebar"

export function AdminLayout({children}){
  return (
    <>
      <div className="w-100">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
      
    </>
  )
}
