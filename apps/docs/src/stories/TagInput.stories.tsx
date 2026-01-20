import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "theo-kit";

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
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
    allowDuplicates: {
      control: "boolean",
    },
    maxTags: {
      control: "number",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "태그를 입력하세요...",
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: ["React", "TypeScript", "Tailwind"],
    placeholder: "태그를 입력하세요...",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: ["React", "TypeScript"],
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    defaultValue: ["Invalid"],
    error: true,
    errorMessage: "유효하지 않은 태그가 포함되어 있습니다",
  },
};

export const MaxTags: Story = {
  args: {
    defaultValue: ["Tag1", "Tag2"],
    maxTags: 3,
    placeholder: "최대 3개까지 입력 가능",
  },
};

export const AllowDuplicates: Story = {
  args: {
    allowDuplicates: true,
    placeholder: "중복 태그 허용",
  },
};
