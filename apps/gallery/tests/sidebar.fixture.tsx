// A sidebar's behaviour: the provider's state, the trigger and the rail that fold it, the shortcut,
// a folded row's tooltip, and the sheet a narrow window gets. The readout sits in the page beside
// the column, where `useSidebar()` is read.
import { mount, signal, Text, View } from "nsh";

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
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "../../../packages/ui";

/** What the parts of a sidebar read, said as one line. */
function State() {
  const sidebar = useSidebar();
  return <Text>{() => `state ${sidebar.state} · sheet ${sidebar.openMobile}`}</Text>;
}

function App() {
  const changes = signal<string[]>([]);
  const presses = signal(0);
  return (
    <View style={{ flex: 1 }}>
      <Text>{() => `changes ${changes().length} · ${changes()[0] ?? "—"}`}</Text>
      <Text>{() => `presses ${presses()}`}</Text>
      <SidebarProvider
        onOpenChange={({ open, reason }) =>
          changes.set([`${open ? "open" : "closed"} · ${reason}`, ...changes()])
        }
      >
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Rows</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Tip A" onPress={() => presses.set(presses() + 1)}>
                      Row A
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>Row B</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail accessibilityLabel="Toggle rail" />
        </Sidebar>
        <SidebarInset>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, padding: 8 }}>
            <SidebarTrigger />
            <State />
          </View>
        </SidebarInset>
      </SidebarProvider>
    </View>
  );
}

mount(App);
