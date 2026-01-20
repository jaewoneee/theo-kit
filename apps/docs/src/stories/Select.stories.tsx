import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectOption } from "theo-kit";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    clearable: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300, paddingBottom: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} placeholder="Select a fruit">
      <SelectOption value="apple">🍎 Apple</SelectOption>
      <SelectOption value="banana">🍌 Banana</SelectOption>
      <SelectOption value="orange">🍊 Orange</SelectOption>
      <SelectOption value="grape">🍇 Grape</SelectOption>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="banana" placeholder="Select a fruit">
      <SelectOption value="apple">🍎 Apple</SelectOption>
      <SelectOption value="banana">🍌 Banana</SelectOption>
      <SelectOption value="orange">🍊 Orange</SelectOption>
      <SelectOption value="grape">🍇 Grape</SelectOption>
    </Select>
  ),
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: "Please select a valid option",
  },
  render: (args) => (
    <Select {...args} placeholder="Select a fruit">
      <SelectOption value="apple">🍎 Apple</SelectOption>
      <SelectOption value="banana">🍌 Banana</SelectOption>
      <SelectOption value="orange">🍊 Orange</SelectOption>
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Select {...args} defaultValue="apple" placeholder="Select a fruit">
      <SelectOption value="apple">🍎 Apple</SelectOption>
      <SelectOption value="banana">🍌 Banana</SelectOption>
    </Select>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <Select placeholder="Select a fruit">
      <SelectOption value="apple">🍎 Apple</SelectOption>
      <SelectOption value="banana" disabled>
        🍌Banana (Out of stock)
      </SelectOption>
      <SelectOption value="orange">🍊 Orange</SelectOption>
    </Select>
  ),
};

export const Clearable: Story = {
  render: () => (
    <Select placeholder="Select a fruit" clearable>
      <SelectOption value="apple">🍎 Apple</SelectOption>
      <SelectOption value="banana">🍌 Banana</SelectOption>
      <SelectOption value="orange">🍊 Orange</SelectOption>
    </Select>
  ),
};
