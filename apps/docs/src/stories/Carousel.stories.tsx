import type { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselSlide } from "theo-kit";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    autoPlay: {
      control: "boolean",
      description: "자동 재생 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    interval: {
      control: "number",
      description: "자동 재생 간격 (ms)",
      table: {
        defaultValue: { summary: "3000" },
      },
    },
    loop: {
      control: "boolean",
      description: "무한 루프 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showArrows: {
      control: "boolean",
      description: "네비게이션 화살표 표시 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showIndicators: {
      control: "boolean",
      description: "인디케이터(dots) 표시 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    draggable: {
      control: "boolean",
      description: "드래그로 슬라이드 넘기기 활성화 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    gap: {
      control: "number",
      description: "슬라이드 간 간격 (px)",
      table: {
        defaultValue: { summary: "16" },
      },
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

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
];

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      {colors.map((color, index) => (
        <CarouselSlide key={index}>
          <div
            className={`${color} h-64 flex items-center justify-center rounded-lg`}
          >
            <span className="text-white text-2xl font-bold">
              Slide {index + 1}
            </span>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    interval: 2000,
  },
  render: (args) => (
    <Carousel {...args}>
      {colors.map((color, index) => (
        <CarouselSlide key={index}>
          <div
            className={`${color} h-64 flex items-center justify-center rounded-lg`}
          >
            <span className="text-white text-2xl font-bold">
              Slide {index + 1}
            </span>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const NoLoop: Story = {
  args: {
    loop: false,
  },
  render: (args) => (
    <Carousel {...args}>
      {colors.map((color, index) => (
        <CarouselSlide key={index}>
          <div
            className={`${color} h-64 flex items-center justify-center rounded-lg`}
          >
            <span className="text-white text-2xl font-bold">
              Slide {index + 1}
            </span>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Carousel>
      {["/theo_1.jpg", "/theo_2.jpg", "/theo_3.jpg", "/theo_4.jpg"].map(
        (src, index) => (
          <CarouselSlide key={index}>
            <div className="h-130 bg-gray-200 relative rounded-lg">
              <img
                src={`/images/${src}`}
                alt={`theo_${index + 1}`}
                className="object-top object-cover size-full"
              />
            </div>
          </CarouselSlide>
        )
      )}
    </Carousel>
  ),
};

export const MinimalUI: Story = {
  args: {
    showArrows: false,
    showIndicators: true,
  },
  render: (args) => (
    <Carousel {...args}>
      {colors.map((color, index) => (
        <CarouselSlide key={index}>
          <div
            className={`${color} h-64 flex items-center justify-center rounded-lg`}
          >
            <span className="text-white text-2xl font-bold">
              Slide {index + 1}
            </span>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};

export const WithGap: Story = {
  args: {
    gap: 16,
  },
  render: (args) => (
    <Carousel {...args}>
      {colors.map((color, index) => (
        <CarouselSlide key={index}>
          <div
            className={`${color} h-64 flex items-center justify-center rounded-lg`}
          >
            <span className="text-white text-2xl font-bold">
              Slide {index + 1}
            </span>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};
