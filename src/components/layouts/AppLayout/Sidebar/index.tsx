import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"

// Images
import users from '@/assets/images/user-regular.svg'

const AppSidebar = () => {
  return (
    <Sidebar className="font-kanit">
        <SidebarContent>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                  <img src={users} alt="users-icons" className="w-[15px]"/>
                  <p className="text-[15px] ms-2">Usuários</p>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar