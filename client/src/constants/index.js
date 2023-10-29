import {
  logo,
  star,
  badge,
  cocktail,
  heart,
  five,
  ten,
  twenty,
  thirty,
  happy,
  night,
  brunch,
  favorite,
  regular,
  whiskey,
  gin,
  rum,
  vodka,
  meta,
  starbucks,
  tesla,
  shopify
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "search",
    title: "Search",
  },
  {
    id: "login",
    title: "Sign up/Login",
  }
];

const ballLogo = [
  {
    name: "logo",
    icon: logo,
  },
]

const services = [
  {
    title: "Rate & Review",
    icon: star,
  },
  {
    title: "Collect Badges",
    icon: badge,
  },
  {
    title: "Find New Cocktails",
    icon: cocktail,
  },
  {
    title: "Connect With Friends",
    icon: heart,
  },
];

const badges = [
  {
    name: "5",
    icon: five,
  },
  {
    name: "10",
    icon: ten,
  },
  {
    name: "20",
    icon: twenty,
  },
  {
    name: "30",
    icon: thirty,
  },
  {
    name: "Happy Hour",
    icon: happy,
  },
  {
    name: "Night Owl",
    icon: night,
  },
  {
    name: "Brunch",
    icon: brunch,
  },
  {
    name: "Drink of Choice",
    icon: favorite,
  },
  {
    name: "Regular",
    icon: regular,
  },
  {
    name: "Whiskey",
    icon: whiskey,
  },
  {
    name: "Gin",
    icon: gin,
  },
  {
    name: "Vodka",
    icon: vodka,
  },
  {
    name: "Rum",
    icon: rum,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export { ballLogo, services, badges, experiences, testimonials };