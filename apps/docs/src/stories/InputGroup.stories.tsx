import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputGroup, InputLeftAddon, InputRightAddon } from "theo-kit";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const WithLeftIcon: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputLeftAddon>
        <SearchIcon />
      </InputLeftAddon>
      <Input grouped placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithRightIcon: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input grouped placeholder="Enter email..." />
      <InputRightAddon>
        <MailIcon />
      </InputRightAddon>
    </InputGroup>
  ),
};

export const WithBothAddons: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputLeftAddon>
        <MailIcon />
      </InputLeftAddon>
      <Input grouped placeholder="Enter email..." />
      <InputRightAddon>
        <button className="cursor-pointer text-blue-500 hover:text-blue-600 text-sm font-medium">
          Send
        </button>
      </InputRightAddon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputLeftAddon>
        <SearchIcon />
      </InputLeftAddon>
      <Input grouped placeholder="Search..." />
      <InputRightAddon>
        <button className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
          Search
        </button>
      </InputRightAddon>
    </InputGroup>
  ),
};

export const WithError: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputLeftAddon>
        <MailIcon />
      </InputLeftAddon>
      <Input grouped placeholder="Enter email..." />
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputLeftAddon>
        <span className="text-sm">https://</span>
      </InputLeftAddon>
      <Input grouped placeholder="example.com" />
    </InputGroup>
  ),
};
