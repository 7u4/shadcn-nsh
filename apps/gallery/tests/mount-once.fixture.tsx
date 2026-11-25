import { mount, signal, Text, View } from "nsh";

import { Empty, SidebarHeader, SidebarProvider } from "../../../packages/ui";

const mounts = signal<Record<string, number>>({});

function Probe(props: { name: string }) {
  queueMicrotask(() => mounts.set({ ...mounts(), [props.name]: (mounts()[props.name] ?? 0) + 1 }));
  return <Text>{props.name}</Text>;
}

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Text>{() => `header mounts ${mounts().header ?? 0}`}</Text>
      <Text>{() => `empty mounts ${mounts().empty ?? 0}`}</Text>
      <Empty>
        <Probe name="empty" />
      </Empty>
      <SidebarProvider>
        <SidebarHeader>
          <Probe name="header" />
        </SidebarHeader>
      </SidebarProvider>
    </View>
  );
}

mount(App);
