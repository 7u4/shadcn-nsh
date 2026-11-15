// A breadcrumb has no official example here, so this page is the library's own: the trail from the
// app's root to the page it shows, one with the steps it leaves out, and a separator of the
// caller's own. A press on a step is reported under the page.
import { mount, signal, Text } from "nsh";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/packages/ui/breadcrumb";

import { DemoCard, DemoPage, DemoSection } from "./kit";
import { desktop, ui } from "./stage";

/** The trail the page shows. */
const TRAIL = [
  { name: "Home", route: "/" },
  { name: "Components", route: "/components" },
  { name: "Breadcrumb", route: "/components/breadcrumb" },
];

function App() {
  // The route a step asked for, as the app's own navigation would hear it.
  const opened = signal<string | null>(null);
  const open = (route: string) => opened.set(route);
  return (
    <DemoPage
      title="Breadcrumb"
      note={() =>
        opened() === null
          ? `${desktop ? "Click" : "Tap"} a step: it opens its route.`
          : `Opened ${opened()}`
      }
    >
      <Text style={{ color: ui().muted }}>
        {"Where the page sits: a row of quiet links, the page itself last."}
      </Text>

      <DemoCard>
        <DemoSection title="A trail" axis="block">
          <Breadcrumb>
            <BreadcrumbList>
              {TRAIL.map((step, i) => (
                <BreadcrumbItem>
                  {i === TRAIL.length - 1 ? (
                    <BreadcrumbPage>{step.name}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink onPress={() => open(step.route)}>{step.name}</BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </DemoSection>

        <DemoSection title="Steps left out" axis="block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onPress={() => open("/")}>Home</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink onPress={() => open("/components")}>Components</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DemoSection>

        <DemoSection title="A separator of your own" axis="block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onPress={() => open("/")}>Home</BreadcrumbLink>
                <BreadcrumbSeparator>
                  <Text style={{ fontSize: 13, color: ui().muted }}>/</Text>
                </BreadcrumbSeparator>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink onPress={() => open("/components")}>Components</BreadcrumbLink>
                <BreadcrumbSeparator>
                  <Text style={{ fontSize: 13, color: ui().muted }}>/</Text>
                </BreadcrumbSeparator>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DemoSection>
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
