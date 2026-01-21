import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, Button } from "theo-kit";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    delayDuration: {
      control: { type: "number", min: 0, max: 1000, step: 50 },
    },
    sideOffset: {
      control: { type: "number", min: 0, max: 20, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-16 p-16">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div className="flex gap-32">
        <Tooltip content="Left tooltip" side="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex gap-4">
        <Tooltip content="Start aligned" side="bottom" align="start">
          <Button variant="outline" className="w-32">
            Start
          </Button>
        </Tooltip>
        <Tooltip content="Center aligned" side="bottom" align="center">
          <Button variant="outline" className="w-32">
            Center
          </Button>
        </Tooltip>
        <Tooltip content="End aligned" side="bottom" align="end">
          <Button variant="outline" className="w-32">
            End
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: "This tooltip has a 500ms delay",
    delayDuration: 500,
    children: <Button>Hover me (500ms delay)</Button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: "This tooltip appears instantly",
    delayDuration: 0,
    children: <Button>Hover me (no delay)</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content: "This is a tooltip with longer content that wraps to multiple lines",
    className: "max-w-48 whitespace-normal text-center",
    children: <Button>Hover for details</Button>,
  },
};

export const OnIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Settings">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Share">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};
