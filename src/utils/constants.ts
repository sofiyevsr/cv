export const seoData = {
  name: "Rasul Sofiyev",
  website: "https://sofiyevsr.com",
  email: "sofiyevsr99@gmail.com",
  jobTitle: "Full Stack Developer",
  image: "https://sofiyevsr.com/rs.jpg",
};

export const userData = {
  firstName: "Rasul",
  lastName: "Sofiyev",
  links: {
    github: "https://github.com/sofiyevsr",
  },
};

export const technologies = [
  {
    emoji: "💪",
    title: "Skills",
    techs: [
      "Typescript",
      "NodeJS",
      "Serverless",
      "PostgreSQL",
      "Redis",
      "DrizzleORM",
      "ReactJS",
      "React Native",
      "Tailwind",
      "Flutter",
    ],
  },
  {
    emoji: "🚀",
    title: "Cloud",
    techs: [
      "Docker",
      "AWS",
      "Vercel",
      "Neon (Serverless PostgreSQL)",
      "Upstash (Serverless Redis)",
      "Cloudflare Workers",
    ],
  },
  {
    emoji: "📚",
    title: "Skills I am working on",
    techs: ["Golang", "Terraform", "Distributed Systems"],
  },
];

export const experiences = [
  {
    title: "Full Stack Developer",
    subtitle: "Kernel LLC",
    details: [
      {
        description:
          "Full Stack developer of web based project of Bus Routes System of Azerbaijan. I was integrally involved in all phases of the project's lifecycle. The web client leverages ReactJS and responsive web design for mobile and desktop devices.",
        techs: [
          "ReactJS",
          "NodeJS",
          "PostgreSQL",
          "Open Route Service (routing directions)",
          "Swagger (Api documentation)",
          "AWS",
        ],
      },
      {
        description:
          "Built CI/CD pipelines that decreased deployment times by 40%, check against regressions, build applications and reliably deploy them to cloud instances.",
        techs: ["Github actions", "Nginx", "AWS", "EC2", "Linux"],
      },
      {
        description:
          "Participated in development of Taxi App which includes migrating dashboards from Angular to React, cross-platform apps using React Native, building api services as microservices and etc.",
        techs: [
          "Typescript",
          "NodeJS",
          "ReactJS",
          "React Native",
          "PostgreSQL",
          "Firebase (realtime updates, notifications and storage)",
        ],
      },
    ],
    dateRange: ["03/2020", "01/2022"],
  },
  {
    title: "Software Developer",
    subtitle: "AMC Bridge",
    details: [
      {
        description:
          "Full Stack developer of laundry network application that matches user with closest laundry service and handles pickups and dropoffs with realtime tracking. I contributed multiple apps of the project including mobile apps, web based dashboard apps and etc.",
        techs: ["Flutter", "Typescript", "ReactJS", "NodeJS", "PostgreSQL"],
      },
      {
        description:
          "Frontend developer of corporate website migration and redesign project. Reimplemented frontend part of more than 15 pages and created fully responsive landing pages for Japanese users.",
        techs: ["Javascript", "Jquery", "SCSS", "Gulp"],
      },
    ],
    dateRange: ["10/2022", "02/2024"],
  },
  {
    title: "Full Stack Developer",
    subtitle: "Self Employed (Contract)",
    details: [
      {
        description:
          "Building MVP for driver finding app as a contract job. Project includes building cross platform apps using React Native, web based dashboard, website and etc. All backend services are built on serverless technologies (realtime service using websocket hibernation api).",
        techs: [
          "TRPC",
          "NodeJS (edge runtime)",
          "React",
          "React Native",
          "Typescript",
          "Drizzle ORM (Typesafe ORM)",
          "AWS",
          "SQS",
          "SNS",
          "Lambda",
          "Neon (serverless PostgreSQL)",
          "Cloudflare workers (for realtime updates)",
          "Upstash (serverless redis for caching and rate limiting)",
        ],
      },
    ],
    dateRange: ["01/2024", "04/2024"],
  },
];

export const projects = [
  {
    title: "News aggregator",
    description:
      "Built an app that aggregates news from more than 50 hand-picked sources in 4 languages every 3 minutes. It was archived and removed from stores as of 01.2023",
    link: "https://github.com/sofiyevsr/stolk",
    techs: [
      "Flutter",
      "NodeJS",
      "Golang",
      "React",
      "NextJS",
      "PostgreSQL",
      "NGINX",
      "EventBridge",
      "Lambda",
      "EC2",
      "RDS",
      "S3",
      "CloudWatch",
    ],
  },
  {
    title: "Multiplayer guessing game",
    description:
      "Built a multiplayer game in which users have to guess name of football players' names with given clues in given time frame.",
    link: "https://github.com/sofiyevsr/guess-the-footballer",
    techs: ["Typescript", "NextJS", "PostgreSQL", "Redis", "Websockets"],
  },
  {
    title: "Asynchronous state management for Flutter",
    description:
      "Built unofficial React Query port for Flutter to use in my side projects to fetch and cache remote resources",
    link: "https://github.com/sofiyevsr/flutter_remoter",
    techs: ["Flutter", "Dart"],
  },
  {
    title: "Chess Timer",
    description:
      "Simple chess timer made with flutter using Flux Pattern with BLoC and freezed packages",
    link: "https://github.com/sofiyevsr/chess_timer",
    techs: ["Flutter", "Dart", "BLoC"],
  },
];

// -- UI Constants
export const constraints = {
  maxWidth: "1000px",
};
