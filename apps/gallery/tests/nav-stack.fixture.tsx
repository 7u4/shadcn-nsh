import { mount, signal, Text, View } from "nsh";

import { Button, createNavStack, NavPage, NavStack } from "../../../packages/ui";

/** Three pages pushed one on another; each says where the stack is, and how many backs it heard. */
type Route = { id: "first" | "second" | "third" };

function App() {
  const nav = createNavStack<Route>([{ id: "first" }]);
  const backs = signal(0);
  return (
    <View style={{ flex: 1 }}>
      <Text testID="routes">
        {() =>
          `routes ${nav
            .routes()
            .map((route) => route.id)
            .join(",")}`
        }
      </Text>
      <Text testID="backs">{() => `backs ${backs()}`}</Text>
      <NavStack state={nav}>
        {(route) =>
          route.id === "first" ? (
            <NavPage testID="page-first" title="First">
              <View style={{ padding: 12 }}>
                <Button onPress={() => nav.push({ id: "second" })}>Go to second</Button>
              </View>
            </NavPage>
          ) : route.id === "second" ? (
            <NavPage testID="page-second" title="Second" onBackPress={() => backs.set(backs() + 1)}>
              <View style={{ padding: 12 }}>
                <Button onPress={() => nav.push({ id: "third" })}>Go to third</Button>
              </View>
            </NavPage>
          ) : (
            <NavPage
              testID="page-third"
              title="Third"
              popOnBack={false}
              onBackPress={() => backs.set(backs() + 1)}
            >
              <View style={{ padding: 12 }}>
                <Button onPress={() => nav.pop()}>Pop by hand</Button>
              </View>
            </NavPage>
          )
        }
      </NavStack>
    </View>
  );
}

mount(App);
