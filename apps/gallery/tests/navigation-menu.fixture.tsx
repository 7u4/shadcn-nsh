import { mount, signal, Text, View } from "nsh";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../packages/ui";

function App() {
  const changes = signal(0);
  const last = signal("—");
  const picked = signal("—");
  return (
    <View>
      <Text>{() => `changes ${changes()} · ${last()}`}</Text>
      <Text>{() => `picked ${picked()}`}</Text>
      <NavigationMenu
        onValueChange={({ value, reason }) => {
          changes.set(changes() + 1);
          last.set(`${value ?? "closed"} · ${reason}`);
        }}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="a">
            <NavigationMenuTrigger>Open A</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Text>Body A</Text>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="b">
            <NavigationMenuTrigger>Open B</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Text>Body B</Text>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onPress={() => picked.set("Docs")}>Docs</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="off">
            <NavigationMenuTrigger disabled>Off</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Text>Body Off</Text>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  );
}

mount(App);
