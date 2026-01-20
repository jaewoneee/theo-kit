import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
  Input,
} from "theo-kit";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    modal: {
      control: "boolean",
      description: "true면 외부 클릭해도 닫히지 않음",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. It provides additional context about
            the dialog content.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Dialog content goes here. You can put any content inside.
        </p>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Modal: Story = {
  args: {
    modal: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>
        <Button>Open Modal Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogDescription>
            This dialog cannot be closed by clicking outside. You must use the
            close button or action buttons.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          외부 클릭으로 닫히지 않습니다. 닫기 버튼을 사용하세요.
        </p>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogClose />
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>프로필 정보를 수정하세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <Input placeholder="테오" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <Input type="email" placeholder="theo@mungmung.dog" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
