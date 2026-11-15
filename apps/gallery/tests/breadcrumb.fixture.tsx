import { mount, signal, Text, View } from "nsh";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  breadcrumbLook,
} from "../../../packages/ui";

// The look's own report, so a test can hold the trail to what it is: the label's size, the page
// in the text color, and the ring the keyboard shows.
const look = breadcrumbLook();
const size = `size=${look.linkText.fontSize}`;
const hover = `hover=${look.linkTextClass.includes("group-hover:text-foreground") ? "ink" : "—"}`;
const ring = `ring=${look.focusVisible.outlineWidth}`;

function App() {
  const opened = signal<string | null>(null);
  const open = (href: string) => opened.set(href);
  return (
    <View style={{ gap: 8, padding: 12 }}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" openWith="app" onOpen={({ href }) => open(href)}>
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components" openWith="app" onOpen={({ href }) => open(href)}>
              Components
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/archive" openWith="app" disabled>
              Archive
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Text>{`opened=${opened() ?? "none"}`}</Text>
      <Text>{size}</Text>
      <Text>{hover}</Text>
      <Text>{ring}</Text>
    </View>
  );
}

mount(App);
