import "./global.css";
import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Badge,
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Input,
  QuantityInput,
} from "theo-kit-native";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-lg font-bold text-gray-900">{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  const [switchOn, setSwitchOn] = useState(false);
  const [checkboxOn, setCheckboxOn] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      <StatusBar style="dark" />
      <Typography variant="h2" className="mb-6">
        theo-kit-native
      </Typography>

      <Section title="Button">
        <View className="flex-row flex-wrap gap-2">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </View>
      </Section>

      <Section title="Badge">
        <View className="flex-row flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </View>
      </Section>

      <Section title="Typography">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="body">Body text</Typography>
        <Typography variant="caption">Caption text</Typography>
      </Section>

      <Section title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-gray-600">Card content area</Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Switch">
        <Switch
          checked={switchOn}
          onChange={setSwitchOn}
          label={switchOn ? "On" : "Off"}
        />
      </Section>

      <Section title="Checkbox">
        <Checkbox
          checked={checkboxOn}
          onChange={setCheckboxOn}
          label="I agree to terms"
        />
      </Section>

      <Section title="Radio">
        <RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      </Section>

      <Section title="Input">
        <Input placeholder="Enter text..." label="Name" />
        <View className="h-3" />
        <Input
          placeholder="Enter email..."
          label="Email"
          keyboardType="email-address"
        />
      </Section>

      <Section title="QuantityInput">
        <QuantityInput
          value={quantity}
          onChange={setQuantity}
          min={0}
          max={10}
        />
      </Section>

      <Section title="Accordion">
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is theo-kit?</AccordionTrigger>
            <AccordionContent>
              A cross-platform UI component library for React and React Native.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              Headless hooks in core, platform-specific rendering in web/native packages.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Dialog">
        <Dialog>
          <DialogTrigger>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <View className="h-12" />
    </ScrollView>
  );
}
