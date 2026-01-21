import type { Meta, StoryObj } from "@storybook/react";
import { QuantityInput } from "theo-kit";
import { useState } from "react";

const meta: Meta<typeof QuantityInput> = {
  title: "Components/QuantityInput",
  component: QuantityInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    min: {
      control: "number",
      description: "최소 값",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    max: {
      control: "number",
      description: "최대 값",
      table: {
        defaultValue: { summary: "Infinity" },
      },
    },
    step: {
      control: "number",
      description: "증감 단위",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 1,
    min: 0,
    max: 10,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <QuantityInput size="sm" defaultValue={1} />
      <QuantityInput size="md" defaultValue={1} />
      <QuantityInput size="lg" defaultValue={1} />
    </div>
  ),
};

export const WithMinMax: Story = {
  args: {
    defaultValue: 5,
    min: 1,
    max: 10,
  },
};

export const WithStep: Story = {
  args: {
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 10,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 3,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState(1);
    return (
      <div className="flex flex-col gap-4 items-center">
        <QuantityInput value={value} onChange={setValue} min={1} max={99} />
        <p className="text-sm text-gray-600">현재 값: {value}</p>
      </div>
    );
  },
};
