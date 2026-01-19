import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "theo-kit";

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

const ArrowRightIcon = () => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    leftIcon: {
      control: "select",
      options: ["none", "search", "arrow"],
      mapping: {
        none: undefined,
        search: <SearchIcon />,
        arrow: <ArrowRightIcon />,
      },
    },
    rightIcon: {
      control: "select",
      options: ["none", "search", "arrow"],
      mapping: {
        none: undefined,
        search: <SearchIcon />,
        arrow: <ArrowRightIcon />,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    children: "Button",
    variant: "solid",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Search",
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Next",
    rightIcon: <ArrowRightIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: "Search",
    leftIcon: <SearchIcon />,
    rightIcon: <ArrowRightIcon />,
  },
};
