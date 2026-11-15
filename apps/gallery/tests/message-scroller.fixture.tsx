import { mount, signal, Text, View } from "nsh";

import {
  Button,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "../../../packages/ui";

function App() {
  const offset = signal(0);
  const count = signal(8);
  const turns = () => Array.from({ length: count() }, (_, i) => i);
  const row = (_i: number) => (
    <MessageScrollerItem>
      <View style={{ height: 60 }} />
    </MessageScrollerItem>
  );
  return (
    <View>
      <MessageScroller style={{ width: 320, height: 240 }}>
        <MessageScrollerViewport
          accessibilityLabel="Conversation"
          onScroll={(e) => offset.set(Math.round(e.offset.y))}
        >
          <MessageScrollerContent>{turns().map((i) => row(i))}</MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
      <Button onPress={() => count.set(count() + 1)}>Send</Button>
      <Text>{`offset=${offset()}`}</Text>
      <Text>{`turns=${count()}`}</Text>
    </View>
  );
}

mount(App);
