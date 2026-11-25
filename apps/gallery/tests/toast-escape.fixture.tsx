import { mount, View } from "nsh";

import { Button } from "../../../packages/ui/button";
import { toast, Toaster } from "../../../packages/ui/toast";

function App() {
  return (
    <View style={{ gap: 8, padding: 12 }}>
      <Button onPress={() => toast("Kept", { duration: Infinity })}>Raise</Button>
      <Toaster closeOnEscape={false} />
    </View>
  );
}

mount(App);
