import { DIRECTIONS, STORAGE } from "@/content/directions";

/**
 * Approved answers only. Each answer is either plain paragraphs or an ordered
 * list of steps. Answers that come from the Safety Data Sheet say so in
 * `source`, so a reviewer can check them against the document.
 */

export type FaqTopic =
  | "Basics"
  | "Using it"
  | "Safety"
  | "Testing"
  | "Buying";

export type Faq = {
  id: string;
  topic: FaqTopic;
  question: string;
  paragraphs?: readonly string[];
  steps?: readonly string[];
  source?: "SDS" | "Application directions";
  /** Show on the homepage. */
  featured?: boolean;
};

export const FAQS: readonly Faq[] = [
  {
    id: "what-is-it",
    topic: "Basics",
    question: "What is No Sweat®?",
    paragraphs: [
      "No Sweat® is a clear, water-based spray coating that you apply to the outside of cold drinkware. It is engineered to reduce exterior condensation, helping keep hands, desks, counters and cupholders drier.",
    ],
    featured: true,
  },
  {
    id: "does-it-stop-condensation",
    topic: "Basics",
    question: "Does it completely stop condensation?",
    paragraphs: [
      "No. How much water collects on a cup depends on temperature and humidity, and condensation can still form under some conditions. No Sweat® is engineered to reduce it, not to guarantee a perfectly dry cup.",
      "We publish test conditions and results on the Testing page so you can judge for yourself.",
    ],
    featured: true,
  },
  {
    id: "how-to-apply",
    topic: "Using it",
    question: "How do I apply it?",
    steps: DIRECTIONS,
    source: "Application directions",
    featured: true,
  },
  {
    id: "where-to-spray",
    topic: "Safety",
    question: "Where should I spray it, and where should I not?",
    paragraphs: [
      "Spray only the outside of the cup. Do not apply No Sweat® to the inside of a cup or to any surface that touches food or drink. It is not for ingestion.",
      "Use it in a well-ventilated area, avoid breathing the spray mist, and wear eye protection.",
    ],
    source: "SDS",
    featured: true,
  },
  {
    id: "which-surfaces",
    topic: "Using it",
    question: "Which cups and surfaces is it for?",
    paragraphs: [
      "No Sweat® is designed for the outside of cold drinkware: disposable plastic cups, reusable tumblers, glassware and stainless drinkware.",
      "We are evaluating other surfaces. We will only list a surface as supported once it has been tested.",
    ],
    featured: true,
  },
  {
    id: "dry-time",
    topic: "Using it",
    question: "How long does it take to dry?",
    paragraphs: ["Allow 5 minutes to dry, then apply a second thin coat."],
    source: "Application directions",
  },
  {
    id: "removal",
    topic: "Using it",
    question: "How do I remove it?",
    paragraphs: ["Rubbing alcohol or warm, soapy water removes it."],
    source: "Application directions",
  },
  {
    id: "storage",
    topic: "Safety",
    question: "How should I store it?",
    paragraphs: [
      STORAGE,
    ],
    source: "SDS",
    featured: true,
  },
  {
    id: "safety-documents",
    topic: "Safety",
    question: "Where can I find the safety information?",
    paragraphs: [
      "Download the Safety Data Sheet from the Safety page or the product page. It covers handling, first aid, storage and disposal.",
    ],
    source: "SDS",
  },
  {
    id: "testing-status",
    topic: "Testing",
    question: "What is the testing status?",
    paragraphs: [
      "No Sweat® is in prototype testing. Each test is published with its conditions, formula revision and status: prototype, development test, verified or superseded.",
    ],
    featured: true,
  },
  {
    id: "sizes",
    topic: "Buying",
    question: "What sizes are available?",
    paragraphs: [
      "A 4 oz spray bottle, a 16 oz refill bottle and a 1-gallon commercial jug.",
    ],
  },
  {
    id: "commercial",
    topic: "Buying",
    question: "Can I use it in a café, bar or restaurant?",
    paragraphs: [
      "Yes. The 1-gallon size is made for commercial use. Send a commercial inquiry with your volume and we will follow up about sizes and pricing.",
    ],
  },
  {
    id: "shipping",
    topic: "Buying",
    question: "Where do you ship?",
    paragraphs: [
      "Orders currently ship within the United States. See Shipping & returns for details.",
    ],
  },
] as const;

export const FAQ_TOPICS: readonly FaqTopic[] = [
  "Basics",
  "Using it",
  "Safety",
  "Testing",
  "Buying",
];

export const featuredFaqs = () => FAQS.filter((faq) => faq.featured);
