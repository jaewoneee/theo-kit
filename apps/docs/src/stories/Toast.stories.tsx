import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast, Button } from "theo-kit";
import { useEffect } from "react";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "토스트가 표시될 위치",
      table: {
        defaultValue: { summary: "bottom-right" },
      },
    },
    duration: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      description: "토스트가 자동으로 사라지기까지의 시간 (ms)",
      table: {
        defaultValue: { summary: "4000" },
      },
    },
    visibleToasts: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "최대로 표시할 토스트 개수",
      table: {
        defaultValue: { summary: "3" },
      },
    },
    closeButton: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
      description: "테마 설정",
      table: {
        defaultValue: { summary: "light" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo({
  position,
  duration,
  visibleToasts,
  closeButton,
  theme,
}: {
  position?: string;
  duration?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  theme?: "light" | "dark" | "system";
}) {
  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast("Default toast")}>Default</Button>
        <Button onClick={() => toast.success("Success!")} variant="outline">
          Success
        </Button>
        <Button onClick={() => toast.error("Error!")} variant="outline">
          Error
        </Button>
        <Button onClick={() => toast.warning("Warning!")} variant="outline">
          Warning
        </Button>
        <Button onClick={() => toast.info("Info!")} variant="outline">
          Info
        </Button>
      </div>
      <Toaster
        position={
          position as
            | "top-left"
            | "top-center"
            | "top-right"
            | "bottom-left"
            | "bottom-center"
            | "bottom-right"
        }
        duration={duration}
        visibleToasts={visibleToasts}
        closeButton={closeButton}
        theme={theme}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    position: "bottom-right",
    duration: 4000,
    visibleToasts: 3,
    closeButton: false,
    theme: "light",
  },
  render: (args) => (
    <ToastDemo
      position={args.position}
      duration={args.duration}
      visibleToasts={args.visibleToasts}
      closeButton={args.closeButton}
      theme={args.theme}
    />
  ),
};
