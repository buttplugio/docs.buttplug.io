/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  devGuidev4Sidebar: [
    "dev-guide/v4/index",
    "dev-guide/v4/foreword",
    {
      type: "doc",
      label: "Quick Start",
      id: "dev-guide/v4/getting-started",
    },
    {
      type: "category",
      label: "Flared Basics",
      items: [
        "dev-guide/v4/intro/introduction",
        "dev-guide/v4/intro/how-to-read",
        "dev-guide/v4/intro/buttplug-ethics",
        "dev-guide/v4/intro/getting-help",
      ],
    },
    {
      type: "category",
      label: "Strategies Against Buttplug Architecture",
      items: [
        "dev-guide/v4/architecture/intro",
        "dev-guide/v4/architecture/sessions-and-components",
        "dev-guide/v4/architecture/protocol-in-depth",
        "dev-guide/v4/architecture/client-in-depth",
        "dev-guide/v4/architecture/client-device-in-depth",
        "dev-guide/v4/architecture/server-in-depth",
        "dev-guide/v4/architecture/intiface",
        "dev-guide/v4/architecture/terms",
      ],
    },
    {
      type: "category",
      label: "Sticking Buttplug In",
      items: [
        "dev-guide/v4/writing-buttplug-applications/intro",
        "dev-guide/v4/writing-buttplug-applications/api-basics",
        "dev-guide/v4/writing-buttplug-applications/connectors",
        "dev-guide/v4/writing-buttplug-applications/connecting",
        "dev-guide/v4/writing-buttplug-applications/device-enum",
        "dev-guide/v4/writing-buttplug-applications/device-info",
        "dev-guide/v4/writing-buttplug-applications/device-control",
        "dev-guide/v4/writing-buttplug-applications/application",
        "dev-guide/v4/writing-buttplug-applications/logging",
      ],
    },
    {
      type: "category",
      label: "Winning Ways for Your Buttplug Plays",
      items: [
        "dev-guide/v4/cookbook/intro",
        {
          type: "category",
          label: "Buttplug Connectors, Connections, and Engines",
          items: [
            "dev-guide/v4/cookbook/connections/embedding",
            "dev-guide/v4/cookbook/connections/ping",
          ],
        },
        {
          type: "category",
          label: "Devices and Commands",
          items: [
            "dev-guide/v4/cookbook/devices-and-commands/intro",
            "dev-guide/v4/cookbook/devices-and-commands/device-configurations",
          ],
        },
        {
          type: "category",
          label: "Integrating Buttplug in Games",
          items: [
            "dev-guide/v4/cookbook/games/intro",
            "dev-guide/v4/cookbook/games/unity",
            "dev-guide/v4/cookbook/games/unreal",
            "dev-guide/v4/cookbook/games/modding",
          ],
        },
        "dev-guide/v4/cookbook/privacy-models",
      ],
    },
    {
      type: "category",
      label: "Implementing new Devices and Clients",
      items: [
        "dev-guide/v4/inflating-buttplug/intro",
        {
          type: "category",
          label: "Adding and Customizing Devices",
          items: [
            "dev-guide/v4/inflating-buttplug/devices/intro",
            "dev-guide/v4/inflating-buttplug/devices/device-configuration-file",
            "dev-guide/v4/inflating-buttplug/devices/websocket-device-manager",
            "dev-guide/v4/inflating-buttplug/devices/adding-device-protocols",
            "dev-guide/v4/inflating-buttplug/devices/adding-device-comm-managers",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Appendices",
      items: ["dev-guide/v4/appendices/history-of-buttplug"],
    },
    {
      type: "doc",
      label: "v3 Dev Guide (Deprecated)",
      id: "dev-guide/v3/index",
    },
  ],
  specSidebar: [
    "spec/v4/index",
    "spec/v4/changelog",
    "spec/v4/architecture",
    "spec/v4/messages",
    "spec/v4/status",
    "spec/v4/identification",
    "spec/v4/device_discovery",
    "spec/v4/device_information",
    "spec/v4/stop",
    "spec/v4/output",
    "spec/v4/input",
    "spec/v4/deprecated",
    {
      type: "doc",
      label: "v3 Spec (Deprecated)",
      id: "spec/v3/index",
    },
  ],
  devGuidev3Sidebar: [
    "dev-guide/v3/index",
    "dev-guide/v3/foreword",
    {
      type: "category",
      label: "Introduction",
      items: [
        "dev-guide/v3/intro/introduction",
        "dev-guide/v3/intro/how-to-read",
        "dev-guide/v3/intro/buttplug-ethics",
        "dev-guide/v3/intro/getting-help",
      ],
    },
    {
      type: "doc",
      label: "Quick Start",
      id: "dev-guide/v3/getting-started",
    },
    {
      type: "category",
      label: "Project and Library Architecture",
      items: [
        "dev-guide/v3/architecture/intro",
        "dev-guide/v3/architecture/sessions-and-components",
        "dev-guide/v3/architecture/protocol-in-depth",
        "dev-guide/v3/architecture/client-in-depth",
        "dev-guide/v3/architecture/server-in-depth",
        "dev-guide/v3/architecture/intiface",
        "dev-guide/v3/architecture/terms",
      ],
    },
    {
      type: "category",
      label: "Build A Simple Buttplug Application",
      items: [
        "dev-guide/v3/writing-buttplug-applications/intro",
        "dev-guide/v3/writing-buttplug-applications/api-basics",
        "dev-guide/v3/writing-buttplug-applications/connectors",
        "dev-guide/v3/writing-buttplug-applications/connecting",
        "dev-guide/v3/writing-buttplug-applications/device-enum",
        "dev-guide/v3/writing-buttplug-applications/device-control",
        "dev-guide/v3/writing-buttplug-applications/application",
        "dev-guide/v3/writing-buttplug-applications/logging",
      ],
    },
    {
      type: "category",
      label: "Advanced Buttpluging",
      items: [
        "dev-guide/v3/cookbook/intro",
        {
          type: "category",
          label: "Buttplug Connectors, Connections, and Engines",
          items: [
            "dev-guide/v3/cookbook/connections/embedding",
            "dev-guide/v3/cookbook/connections/ping",
          ],
        },
        {
          type: "category",
          label: "Devices and Commands",
          items: [
            "dev-guide/v3/cookbook/devices-and-commands/intro",
            "dev-guide/v3/cookbook/devices-and-commands/device-configurations",
            "dev-guide/v3/cookbook/devices-and-commands/scalar-command",
            "dev-guide/v3/cookbook/devices-and-commands/linear-command",
            "dev-guide/v3/cookbook/devices-and-commands/rotate-command",
            "dev-guide/v3/cookbook/devices-and-commands/sensor-commands",
            "dev-guide/v3/cookbook/devices-and-commands/raw-commands",
          ],
        },
        {
          type: "category",
          label: "Integrating Buttplug in Games",
          items: [
            "dev-guide/v3/cookbook/games/intro",
            "dev-guide/v3/cookbook/games/unity",
            "dev-guide/v3/cookbook/games/unreal",
            "dev-guide/v3/cookbook/games/modding",
          ],
        },
        "dev-guide/v3/cookbook/privacy-models",
      ],
    },
    {
      type: "category",
      label: "Implementing new Devices and Clients",
      items: [
        "dev-guide/v3/inflating-buttplug/intro",
        {
          type: "category",
          label: "Adding and Customizing Devices",
          items: [
            "dev-guide/v3/inflating-buttplug/devices/intro",
            "dev-guide/v3/inflating-buttplug/devices/device-configuration-file",
            "dev-guide/v3/inflating-buttplug/devices/websocket-device-manager",
            "dev-guide/v3/inflating-buttplug/devices/adding-device-protocols",
            "dev-guide/v3/inflating-buttplug/devices/adding-device-comm-managers",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Appendices",
      items: ["dev-guide/v3/appendices/history-of-buttplug"],
    },
  ],
  specv3Sidebar: [
    "spec/v3/index",
    "spec/v3/changelog",
    "spec/v3/architecture",
    "spec/v3/messages",
    "spec/v3/status",
    "spec/v3/identification",
    "spec/v3/enumeration",
    "spec/v3/generic",
    "spec/v3/sensors",
    "spec/v3/raw",
    "spec/v3/deprecated",
  ],
  stpihkalSidebar: [
    "stpihkal/index",
    {
      type: "category",
      label: "Protocols and Memory Layouts",
      items: [
        {
          type: "autogenerated",
          dirName: "stpihkal/protocols",
        },
      ],
    },
    {
      type: "category",
      label: "Firmware and Bootloaders",
      items: [
        {
          type: "autogenerated",
          dirName: "stpihkal/firmware",
        },
      ],
    },
    {
      type: "category",
      label: "Network Protocols",
      items: [
        {
          type: "autogenerated",
          dirName: "stpihkal/network",
        },
      ],
    },
    {
      type: "category",
      label: "Video Encoding Formats",
      items: [
        {
          type: "autogenerated",
          dirName: "stpihkal/video-encoding-formats",
        },
      ],
    },
  ],
};

module.exports = sidebars;
