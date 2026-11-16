/**
 * The components' kinds: the sidebar, the components index and the coverage page group the set
 * by these, one kind per component, in this order.
 *
 * A kind lives here and not in the page's frontmatter, so a page added on another branch is
 * placed by editing this table alone. `bun run check:pages` fails when a component page has no
 * kind, or when this table names something that is neither a page nor a planned one.
 */
export type ComponentKindId =
  | "actions"
  | "forms"
  | "overlays"
  | "navigation"
  | "layout"
  | "data"
  | "chat"
  | "text";

/** What a kind is called in the sidebar, on the index and on the coverage page. */
export const KIND_LABELS: Record<ComponentKindId, string> = {
  actions: "Actions",
  forms: "Forms",
  overlays: "Overlays",
  navigation: "Navigation & menus",
  layout: "Layout",
  data: "Data display",
  chat: "Chat",
  text: "Text & code",
};

/** The kinds, in the order they are listed everywhere. */
export const KINDS: readonly ComponentKindId[] = [
  "actions",
  "forms",
  "overlays",
  "navigation",
  "layout",
  "data",
  "chat",
  "text",
];

/** Every component's kind, by registry id. */
export const KIND_OF: Record<string, ComponentKindId> = {
  button: "actions",
  "button-group": "actions",
  kbd: "actions",
  link: "actions",
  pressable: "actions",
  segmented: "actions",
  toggle: "actions",
  "toggle-group": "actions",
  toolbar: "actions",

  calendar: "forms",
  checkbox: "forms",
  "color-picker": "forms",
  combobox: "forms",
  "date-picker": "forms",
  "emoji-picker": "forms",
  field: "forms",
  input: "forms",
  "input-group": "forms",
  label: "forms",
  "number-input": "forms",
  "otp-input": "forms",
  "radio-group": "forms",
  select: "forms",
  slider: "forms",
  switch: "forms",
  textarea: "forms",
  "time-field": "forms",

  "alert-dialog": "overlays",
  command: "overlays",
  dialog: "overlays",
  drawer: "overlays",
  "hover-card": "overlays",
  popover: "overlays",
  sheet: "overlays",
  toast: "overlays",
  tooltip: "overlays",

  breadcrumb: "navigation",
  "context-menu": "navigation",
  menu: "navigation",
  menubar: "navigation",
  "navigation-menu": "navigation",
  pagination: "navigation",
  sidebar: "navigation",
  tabs: "navigation",
  tree: "navigation",

  accordion: "layout",
  "aspect-ratio": "layout",
  card: "layout",
  collapsible: "layout",
  "dock-area": "layout",
  empty: "layout",
  item: "layout",
  resizable: "layout",
  scrollbar: "layout",
  separator: "layout",

  alert: "data",
  avatar: "data",
  badge: "data",
  carousel: "data",
  "data-table": "data",
  meter: "data",
  plot: "data",
  progress: "data",
  skeleton: "data",
  spinner: "data",
  stat: "data",
  status: "data",
  table: "data",

  attachment: "chat",
  bubble: "chat",
  marker: "chat",
  message: "chat",
  "message-scroller": "chat",

  "code-editor": "text",
  "diff-view": "text",
  editor: "text",
  "text-view": "text",
};
