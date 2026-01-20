import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
  Input,
} from "theo-kit";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">This is a popover content.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4 p-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="center">
          <p className="text-sm">Top popover</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="center">
          <p className="text-sm">Right popover</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="center">
          <p className="text-sm">Bottom popover</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" align="center">
          <p className="text-sm">Left popover</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-10">
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Start</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start">
            <p className="text-sm">Aligned to start</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Center</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="center">
            <p className="text-sm">Aligned to center</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">End</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end">
            <p className="text-sm">Aligned to end</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Update dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Dimensions</h4>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm w-16">Width</label>
              <Input defaultValue="100%" className="h-8" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm w-16">Height</label>
              <Input defaultValue="auto" className="h-8" />
            </div>
          </div>
          <div className="flex justify-end">
            <PopoverClose asChild>
              <Button size="sm">Apply</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Show Info</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Information</h4>
          <p className="text-sm text-gray-500">
            This is some helpful information that appears in a popover.
          </p>
          <PopoverClose asChild>
            <Button variant="outline" size="sm" className="w-full">
              Got it
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
