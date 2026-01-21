import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "theo-kit";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 16, max: 128, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Theo Lee",
  },
};

export const WithImage: Story = {
  args: {
    name: "Theo Lee",
    src: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=50&h=50&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size={24} name="Alice" />
      <Avatar size={32} name="Bob" />
      <Avatar size={40} name="Charlie" />
      <Avatar size={48} name="David" />
      <Avatar size={64} name="Eve" />
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Charlie" />
      <Avatar name="David" />
      <Avatar name="Eve" />
      <Avatar name="Frank" />
      <Avatar name="Grace" />
    </div>
  ),
};

export const ImageWithFallback: Story = {
  args: {
    name: "Jane Doe",
    src: "https://invalid-url-that-will-fail.com/image.jpg",
  },
};
