import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "theo-kit";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
  },
};

export const WithLabel: Story = {
  args: {
    value: "option1",
    label: "옵션 1",
  },
};

export const Checked: Story = {
  args: {
    value: "option1",
    label: "선택됨",
    checked: true,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: "option1",
    label: "비활성화",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    value: "option1",
    label: "비활성화 (선택됨)",
    disabled: true,
    checked: true,
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    value: "option1",
    label: "에러 상태",
    error: true,
  },
};

export const WithErrorMessage: Story = {
  args: {
    value: "option1",
    label: "에러 상태",
    error: true,
    errorMessage: "필수 항목입니다",
  },
};

export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="옵션 1" />
      <Radio value="option2" label="옵션 2" />
      <Radio value="option3" label="옵션 3" />
    </RadioGroup>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <Radio value="option1" label="옵션 1" />
      <Radio value="option2" label="옵션 2" />
      <Radio value="option3" label="옵션 3" />
    </RadioGroup>
  ),
};

export const GroupWithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="옵션 1" />
      <Radio value="option2" label="옵션 2 (비활성화)" disabled />
      <Radio value="option3" label="옵션 3" />
    </RadioGroup>
  ),
};
