import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "theo-kit";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
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
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "동의합니다",
  },
};

export const Checked: Story = {
  args: {
    label: "선택됨",
    checked: true,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "비활성화 (선택됨)",
    disabled: true,
    checked: true,
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    label: "이용약관에 동의합니다",
    error: true,
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "이용약관에 동의합니다",
    error: true,
    errorMessage: "필수 항목입니다",
  },
};

export const CustomLabelStyle: Story = {
  args: {
    label: "커스텀 라벨 스타일",
    labelClassName: "text-base font-semibold text-blue-600",
  },
};
