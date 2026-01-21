import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
} from "theo-kit";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    border: {
      control: "boolean",
      description: "테두리 표시 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    shadow: {
      control: "boolean",
      description: "그림자 표시 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          This is the card content. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card>
      <p className="text-sm text-gray-600">
        A simple card with just content, no header or footer.
      </p>
    </Card>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Login</Button>
      </CardFooter>
    </Card>
  ),
};

export const NoBorder: Story = {
  args: {
    border: false,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>No Border</CardTitle>
        <CardDescription>This card has no border.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Card content here.</p>
      </CardContent>
    </Card>
  ),
};

export const NoShadow: Story = {
  args: {
    shadow: false,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>No Shadow</CardTitle>
        <CardDescription>This card has no shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Card content here.</p>
      </CardContent>
    </Card>
  ),
};
