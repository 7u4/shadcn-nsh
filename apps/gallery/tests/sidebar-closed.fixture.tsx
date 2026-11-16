// A sidebar that starts closed: the column is folded to its icons from the first frame, so its rows
// draw the icon alone — their names stay for the tooltip and the screen reader, not for the page.
import { mount, Text, View } from "nsh";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../../../packages/ui";

/** What the parts of a sidebar read, said as one line. */
function State() {
  const sidebar = useSidebar();
  return <Text>{() => `state ${sidebar.state} · sheet ${sidebar.openMobile}`}</Text>;
}

function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Rows</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Tip A">Row A</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, padding: 8 }}>
          <SidebarTrigger />
          <State />
        </View>
      </SidebarInset>
    </SidebarProvider>
  );
}

mount(App);
