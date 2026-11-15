import { colors, currentTheme, selectTheme, type AppTheme } from "@shadcn-nsh/theme";
import { colorScheme, mount, signal, Text, View } from "nsh";

import { shadcn } from "../../../packages/theme/themes/shadcn/index";
import { Button, buttonLook } from "../../../packages/ui";

/** The raised look a button wears: the component's own getter, read where the page renders it. */
const raised = () => buttonLook("secondary").style;

/** A style value as the page reads it out: the string it is, or its JSON. */
const shown = (value: unknown) => (typeof value === "string" ? value : JSON.stringify(value));

/** A theme NSH cannot read (a color that is none), on the neutral theme's finishes. */
const broken: AppTheme = {
  id: "broken",
  label: "broken",
  theme: { cssVars: { light: { primary: "#zz" }, dark: { primary: "#zz" } } },
  finishes: shadcn.finishes,
};

function App() {
  const failure = signal("none");
  const switched = (theme: AppTheme | null) => {
    try {
      selectTheme(theme);
      failure.set("none");
    } catch (error) {
      failure.set(error instanceof TypeError ? "TypeError" : String(error));
    }
  };
  return (
    <View>
      <Text testID="fill">{`fill:${shown(raised().backgroundColor ?? "none")}`}</Text>
      <Text testID="shadow">{`shadow:${shown(raised().boxShadow ?? "none")}`}</Text>
      <Text testID="radius">{`radius:${shown(raised().borderRadius ?? "none")}`}</Text>
      <Text testID="theme">{`theme:${currentTheme() ?? "build-time"}`}</Text>
      <Text testID="failure">{`failure:${failure()}`}</Text>
      <Text testID="appearance">{`appearance:${colorScheme()}`}</Text>
      <Text testID="ink" style={{ color: colors.text }}>
        Ink
      </Text>
      <Button onPress={() => switched(shadcn)}>Shadcn</Button>
      <Button onPress={() => switched(null)}>Build-time</Button>
      <Button onPress={() => switched(broken)}>Broken</Button>
    </View>
  );
}

mount(App);
