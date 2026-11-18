"use client";

import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from "fumadocs-ui/components/codeblock";

import { PACKAGE_MANAGER_GROUP, PACKAGE_MANAGERS } from "@/lib/package-managers";

/**
 * An install command as the three package-manager tabs, for the places a command is written in
 * JSX rather than in markdown (the themes page). It is Fumadocs' own code block and tabs — the
 * same components `remarkNpm` builds from a fence tagged `npm` — with the same shared `groupId` and
 * `persist`, so a choice made in a markdown block switches this one too (and the other way round).
 */
export function InstallTabs({ command }: { command: string }) {
  return (
    <CodeBlockTabs defaultValue={PACKAGE_MANAGERS[0]!.name} groupId={PACKAGE_MANAGER_GROUP} persist>
      <CodeBlockTabsList>
        {PACKAGE_MANAGERS.map((manager) => (
          <CodeBlockTabsTrigger key={manager.name} value={manager.name}>
            {manager.name}
          </CodeBlockTabsTrigger>
        ))}
      </CodeBlockTabsList>
      {PACKAGE_MANAGERS.map((manager) => (
        <CodeBlockTab key={manager.name} value={manager.name}>
          <CodeBlock>
            <Pre>
              {/* One `line` span per line, as Shiki writes a fence: the code block pads its lines. */}
              <code>
                {manager
                  .command(command)
                  .split("\n")
                  .map((line, index) => (
                    <span key={index} className="line">
                      {line}
                    </span>
                  ))}
              </code>
            </Pre>
          </CodeBlock>
        </CodeBlockTab>
      ))}
    </CodeBlockTabs>
  );
}
