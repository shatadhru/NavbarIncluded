
"use client";
import React from "react";
import YoutubePlayer from "./YoutubePlayer";
import { Surface } from '@heroui/react';
import { Accordion } from "@heroui/react";
import { BookAIcon, BookOpenText, ChevronDown, Download, DownloadCloud, DownloadCloudIcon, LucideAArrowDown, Notebook } from "lucide-react";
import { Tabs } from "@heroui/react";
import {Button, ButtonGroup} from "@heroui/react";



const items = [
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <LucideAArrowDown />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <LucideAArrowDown />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <LucideAArrowDown />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <LucideAArrowDown />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <LucideAArrowDown  />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <LucideAArrowDown />,
    title: "How do I request a refund?",
  },
];

function Page() {
  return (
    <div className="w-full px-[16px] sm:px-[24px] md:px-[51px] pt-[55px] flex">

      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-4 mt-2 md:mt-6">

        <div className="col-span-2 flex flex-col gap-4 rounded-xl overflow-hidden">

  
            <YoutubePlayer />

  
     <Surface className="md:block flex  flex-col gap-3 rounded-3xl p-6 hidden" variant="tertiary">
<div className="flex items-center justify-between">
              <h3 className="grid col-span-3 text-base font-semibold text-foreground">Surface Content</h3>
              <Button className="col-span-1 text-[10px]" size="sm"><Download /> Download Slides</Button>


</div>
            <p className="text-sm text-muted">
              This is a tertiary surface variant. It uses bg-surface-tertiary styling.
            </p>
          </Surface>
        </div>

        <div className="col-span-1 grid grid-flow-col justify-items-center ml-auto">
          <Tabs className="w-[300px] md:w-sm " variant="secondary">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Options">
                <Tabs.Tab id="overview">
                  Overview
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="analytics">
                  Other Classes
                  <Tabs.Indicator />
                </Tabs.Tab>
            
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-4" id="overview">


              <h3 className="text-base font-semibold text-foreground">Surface Content</h3>
              <p className="text-sm text-muted">
                This is a tertiary surface variant. It uses bg-surface-tertiary styling.
              </p>

              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-muted">Others</p>
                <ButtonGroup variant="secondary">
                  <Button>
                    <Download />
                    Slide
                  </Button>
                  <Button>
                    <DownloadCloudIcon />
                    Interective Slides
                  </Button>
                  
                </ButtonGroup>
                <Button>
                  <Notebook />
                  Exam
                </Button>
              </div>






               </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="analytics">
              <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-1" variant="transparent">
                <h3 className="text-base font-semibold text-foreground px-0 py-0">Course Content</h3>
                <Accordion className="w-full pr-4">
                  {items.map((item, index) => (
                    <Accordion.Item key={index}>
                      <Accordion.Heading>
                        <Accordion.Trigger>
                         <BookOpenText className="mr-2 text-foreground" />
                          {item.title}
                          <Accordion.Indicator>
                            <ChevronDown className="ml-2" />                          </Accordion.Indicator>
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body>



                          <ButtonGroup variant="secondary">
                            <Button size="sm"><BookAIcon /> View</Button>      
                            <Button size="sm">Slide</Button>
                          </ButtonGroup>










                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Surface>                      </Tabs.Panel>
          
          </Tabs>
        </div>

      </div>

    </div>
  );
}

export default Page;
