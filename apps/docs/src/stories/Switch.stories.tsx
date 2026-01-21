import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "theo-kit";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "스위치 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    checked: {
      control: "boolean",
      description: "스위치의 체크 상태 (controlled)",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "레이블 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};

export const Checked: Story = {
  args: {
    checked: true,
    label: "Checked switch",
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch disabled label="Disabled (off)" />
      <Switch disabled defaultChecked label="Disabled (on)" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
    </div>
  ),
};
