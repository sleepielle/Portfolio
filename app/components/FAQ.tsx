import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  return (
    <Accordion type="multiple" className="w-full mt-10 mx-5">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-gray-500">
          Product Information
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-gray-400">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-gray-500">
          Shipping Details
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-gray-400">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>{" "}
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-gray-500">
          Shipping Details
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-gray-400">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
