import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "theo-kit";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["heading", "body"],
      description: "타이포그래피 변형",
      table: {
        defaultValue: { summary: "body" },
      },
    },
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
      description: "레벨 (heading: h1-h6, body: 크기 조절)",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "폰트 굵기",
      table: {
        defaultValue: { summary: "variant에 따라 다름" },
      },
    },
    as: {
      control: "text",
      description: "렌더링할 HTML 요소",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    variant: "body",
    level: 1,
  },
};
