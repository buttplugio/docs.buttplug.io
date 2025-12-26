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
  devGuideSidebar: [
    "dev-guide/index",
    "dev-guide/foreword",
    {
      type: "doc",
      label: "Quick Start",
      id: "dev-guide/getting-started",
    },
    {
      type: "category",
      label: "Flared Basics",
      items: [
        "dev-guide/intro/introduction",
        "dev-guide/intro/how-to-read",
        "dev-guide/intro/buttplug-ethics",
        "dev-guide/intro/getting-help",
      ],
    },
    {
      type: "category",
      label: "Strategies Against Buttplug Architecture",
      items: [
        "dev-guide/architecture/intro",
        "dev-guide/architecture/sessions-and-components",
        "dev-guide/architecture/protocol-in-depth",
        "dev-guide/architecture/client-in-depth",
        "dev-guide/architecture/client-device-in-depth",
        "dev-guide/architecture/server-in-depth",
        "dev-guide/architecture/intiface",
        "dev-guide/architecture/terms",
      ],
    },
    {
      type: "category",
      label: "Sticking Buttplug In",
      items: [
        "dev-guide/writing-buttplug-applications/intro",
        "dev-guide/writing-buttplug-applications/api-basics",
        "dev-guide/writing-buttplug-applications/connectors",
        "dev-guide/writing-buttplug-applications/connecting",
        "dev-guide/writing-buttplug-applications/device-enum",
        "dev-guide/writing-buttplug-applications/device-info",
        "dev-guide/writing-buttplug-applications/device-control",
        "dev-guide/writing-buttplug-applications/application",
        "dev-guide/writing-buttplug-applications/logging",
      ],
    },
    {
      type: "category",
      label: "Winning Ways for Your Buttplug Plays",
      items: [
        "dev-guide/cookbook/intro",
        {
          type: "category",
          label: "Buttplug Connectors, Connections, and Engines",
          items: [
            "dev-guide/cookbook/connections/embedding",
            "dev-guide/cookbook/connections/ping",
          ],
        },
        {
          type: "category",
          label: "Devices and Commands",
          items: [
            "dev-guide/cookbook/devices-and-commands/intro",
            "dev-guide/cookbook/devices-and-commands/device-configurations",
          ],
        },
        {
          type: "category",
          label: "Integrating Buttplug in Games",
          items: [
            "dev-guide/cookbook/games/intro",
            "dev-guide/cookbook/games/unity",
            "dev-guide/cookbook/games/unreal",
            "dev-guide/cookbook/games/modding",
          ],
        },
        "dev-guide/cookbook/privacy-models",
      ],
    },
    {
      type: "category",
      label: "Implementing new Devices and Clients",
      items: [
        "dev-guide/inflating-buttplug/intro",
        {
          type: "category",
          label: "Adding and Customizing Devices",
          items: [
            "dev-guide/inflating-buttplug/devices/intro",
            "dev-guide/inflating-buttplug/devices/device-configuration-file",
            "dev-guide/inflating-buttplug/devices/websocket-device-manager",
            "dev-guide/inflating-buttplug/devices/adding-device-protocols",
            "dev-guide/inflating-buttplug/devices/adding-device-comm-managers",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Appendices",
      items: ["dev-guide/appendices/history-of-buttplug"],
    },
    {
      type: "doc",
      label: "v3 Dev Guide (Deprecated)",
      id: "dev-guide/index",
    },
  ],
  specSidebar: [
    "spec/index",
    "spec/changelog",
    "spec/architecture",
    "spec/messages",
    "spec/status",
    "spec/identification",
    "spec/device_discovery",
    "spec/device_information",
    "spec/stop",
    "spec/output",
    "spec/input",
    "spec/deprecated",
    {
      type: "doc",
      label: "v3 Spec (Deprecated)",
      id: "spec/index",
    },
  ],
};

module.exports = sidebars;
