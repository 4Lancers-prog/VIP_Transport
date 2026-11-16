/**
 * ============================================================================
 *  VIP TRANSPORTS — SINGLE SOURCE OF TRUTH FOR BUSINESS FACTS & COPY
 * ============================================================================
 *
 *  All copy below comes from "VIP Transports — New Website SEO Content".
 *  Edit text here; components read from this file.
 *
 *  Before launch, the content document asks the company to confirm: the four
 *  headline figures, the industries list, shipment-tracking claims, fuel
 *  licences/permits, and permission to show client logos.
 * ============================================================================
 */

export const VERIFIED = {
  contact: true,
  fleet: false,
  clients: true,
  serviceArea: false,
} as const;

/* -------------------------------------------------------------------------- */
/*  Brand                                                                      */
/* -------------------------------------------------------------------------- */

export const BRAND = {
  name: 'VIP Transports',
  tagline: 'Your trusted transportation & logistics partner',
  logoSrc: '' as string,
  colors: {
    ink: '#14120C',
    charcoal: '#1B1810',
    orange: '#C19A33', // brand GOLD (drives the 3D key light + tank decal)
    amber: '#DDBB55',
    warm: '#F7F3E9',
    steel: '#A79F8C',
  },
} as const;

export const EXPERIENCE_YEARS = 10;

/* -------------------------------------------------------------------------- */
/*  Per-page SEO                                                               */
/* -------------------------------------------------------------------------- */

export const SEO = {
  home: {
    title: 'Transportation & Logistics Services in Bengaluru | VIP Transports',
    description:
      'Looking for reliable transportation, goods distribution and fuel logistics services? Connect with VIP Transports for business-focused logistics support in Bengaluru.',
  },
  about: {
    title: 'About VIP Transports | Transportation & Logistics Company',
    description:
      'Learn about VIP Transports and our commitment to dependable transportation, distribution and fuel logistics solutions for businesses.',
  },
  services: {
    title: 'Transportation, Distribution & Fuel Logistics Services | VIP Transports',
    description:
      "Explore VIP Transports' business transportation, goods distribution and fuel logistics services. Discuss your requirements and request a quote.",
  },
  contact: {
    title: 'Contact VIP Transports | Get a Transportation Quote',
    description:
      'Contact VIP Transports in Bengaluru for transportation, distribution and fuel logistics enquiries. Call, email or submit your requirements online.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  phone: '+91 99160 60602',
  phoneHref: 'tel:+919916060602',
  phoneAlt: '+91 99666 96246',
  phoneAltHref: 'tel:+919966696246',
  email: 'Office@viptransports.in',
  emailAlt: 'We@viptransports.in',
  whatsapp: 'https://wa.me/919916060602',
  addressLines: [
    'VIP Transports, #213, 6th Cross, 2nd Stage',
    'Arekere Mico Layout, BG Road',
    'Bengaluru - 560076',
  ] as string[],
  directionsHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('#213, 6th Cross, 2nd Stage, Arekere Mico Layout, BG Road, Bengaluru 560076'),
} as const;

/* -------------------------------------------------------------------------- */
/*  Stats — "Our Journey in Numbers"                                           */
/* -------------------------------------------------------------------------- */

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 18000, suffix: '+', label: 'Fuel Deliveries Completed' },
  { value: 500000, suffix: '+', label: 'Safe Kilometres Covered Every Month' },
  { value: 600000, suffix: '+', label: 'Litres of Fuel Distributed Every Month' },
  { value: 300, suffix: '+', label: 'Trusted Business Clients' },
];

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export interface Service {
  id: string;
  index: string;
  title: string;
  /** Short summary used on the Home page cards. */
  copy: string;
  cta: string;
  /** Long-form Services page content. */
  heading: string;
  paragraphs: string[];
  listIntro: string;
  points: string[];
  closing: string;
  pageCta: string;
}

export const SERVICES: Service[] = [
  {
    id: 'transportation-solutions',
    index: '01',
    title: 'Transportation Solutions',
    copy: 'Reliable goods transportation for businesses requiring safe and timely movement of cargo. We focus on efficient coordination, secure handling and dependable delivery for local and long-distance transportation requirements.',
    cta: 'Explore Transportation Solutions',
    heading: 'Reliable Goods Transportation Services',
    paragraphs: [
      'Moving goods safely and efficiently is essential for businesses operating across different locations. VIP Transports provides transportation solutions designed to support the movement of commercial goods and cargo according to customer requirements.',
      'We focus on dependable transportation coordination, responsible cargo handling and delivery planning to help businesses manage their logistics operations effectively.',
      'Whether your requirement involves regular goods movement, inter-location transportation or long-distance cargo delivery, our objective is to provide a reliable transportation experience.',
    ],
    listIntro: 'Our transportation service focuses on:',
    points: [
      'Business and commercial goods transportation',
      'Local and long-distance cargo movement',
      'Transportation scheduling and coordination',
      'Secure cargo handling',
      'Delivery planning and operational coordination',
      'Shipment status communication',
      'Customer-specific transportation requirements',
    ],
    closing:
      'A dependable transportation arrangement can help businesses maintain inventory movement, meet customer commitments and reduce unnecessary logistical complications. VIP Transports aims to make transportation simpler through professional coordination, customer-focused service and a commitment to reliable delivery.',
    pageCta: 'Enquire About Transportation Services',
  },
  {
    id: 'distribution-services',
    index: '02',
    title: 'Distribution Services',
    copy: 'Efficient distribution support to help businesses move products across multiple destinations. Our focus on delivery coordination, route planning and shipment visibility helps maintain smooth distribution operations.',
    cta: 'Explore Distribution Services',
    heading: 'Efficient Distribution Services for Growing Businesses',
    paragraphs: [
      'An organised distribution network is essential for ensuring that products reach the right destinations at the right time.',
      'VIP Transports provides distribution support to businesses that require coordinated product movement across multiple locations. We focus on improving the flow of goods through organised delivery planning, route coordination and shipment visibility.',
      'Our distribution services are designed to support businesses that depend on consistent product movement to maintain their day-to-day operations.',
    ],
    listIntro: 'Our distribution capabilities include:',
    points: [
      'Multi-location product distribution',
      'Business-to-business goods movement',
      'Delivery route coordination',
      'Distribution scheduling',
      'Shipment monitoring and status updates',
      'Supply-chain transportation support',
      'Customised distribution arrangements',
    ],
    closing:
      "Delays in distribution can affect inventory availability, business productivity and customer satisfaction. Our approach focuses on reliable coordination and efficient transportation to help businesses maintain smoother distribution activities. We work towards understanding each customer's delivery requirements and providing suitable distribution support.",
    pageCta: 'Discuss Your Distribution Requirements',
  },
  {
    id: 'fuel-distribution',
    index: '03',
    title: 'Fuel Distribution Services',
    copy: 'Dependable fuel transportation and distribution support for industrial, commercial and retail requirements. We prioritise safe handling, professional coordination and compliance with applicable transportation and safety requirements.',
    cta: 'Explore Fuel Distribution',
    heading: 'Safe and Reliable Fuel Distribution Services',
    paragraphs: [
      'Fuel availability is essential for many industrial and commercial operations. Interruptions in fuel supply can affect productivity, operational schedules and business continuity.',
      'VIP Transports provides fuel distribution and transportation support for industries, commercial establishments and retail outlets that require dependable fuel movement.',
      'We place importance on safe transportation practices, professional coordination and compliance with applicable fuel transportation regulations. Our objective is to support customers with reliable fuel logistics arrangements that help minimise operational interruptions.',
    ],
    listIntro: 'Our fuel distribution service focuses on:',
    points: [
      'Industrial fuel transportation',
      'Commercial fuel distribution',
      'Fuel movement for retail establishments',
      'Bulk fuel transportation requirements, where authorised',
      'Delivery scheduling and coordination',
      'Safe fuel handling procedures',
      'Regulatory and operational compliance',
      'Reliable fuel supply-chain support',
    ],
    closing:
      'Fuel transportation requires specialised attention to safety, handling procedures and applicable regulatory requirements. We emphasise responsible transportation practices, trained personnel and suitable transportation arrangements to support secure fuel movement.',
    pageCta: 'Enquire About Fuel Distribution',
  },
];

/* -------------------------------------------------------------------------- */
/*  Why choose us (Home)                                                       */
/* -------------------------------------------------------------------------- */

export interface Point {
  title: string;
  copy: string;
}

export const WHY_CHOOSE: Point[] = [
  { title: 'Reliable Service', copy: 'Dependable transportation and distribution support aligned with business requirements.' },
  { title: 'Safety First', copy: 'Careful cargo handling and attention to transportation safety.' },
  { title: 'Timely Deliveries', copy: 'Planning and coordination focused on meeting delivery schedules.' },
  { title: 'Experienced Professionals', copy: 'A team committed to professional service and operational coordination.' },
  { title: 'Customer-Focused Solutions', copy: 'Transportation arrangements designed around individual business requirements.' },
  { title: 'Operational Efficiency', copy: 'A practical approach to supporting smoother logistics and supply-chain operations.' },
  { title: 'Transparent Communication', copy: 'Clear coordination and shipment updates throughout the service process.' },
];

export const INDUSTRIES: string[] = [
  'Manufacturing and industrial businesses',
  'Retail and wholesale distribution',
  'FMCG and consumer goods',
  'Petroleum and fuel-related businesses',
  'Construction and infrastructure',
  'Pharmaceutical and healthcare supply chains',
  'E-commerce and commercial distribution',
];

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export const CORE_VALUES: Point[] = [
  { title: 'Integrity', copy: 'Maintaining honest and transparent business relationships.' },
  { title: 'Reliability', copy: 'Working towards consistent and dependable transportation services.' },
  { title: 'Safety', copy: 'Prioritising responsible transportation and cargo handling.' },
  { title: 'Customer Commitment', copy: 'Understanding customer needs and delivering suitable solutions.' },
  { title: 'Efficiency', copy: 'Improving coordination and logistics operations.' },
  { title: 'Continuous Improvement', copy: 'Adapting to changing transportation and business requirements.' },
];

/* -------------------------------------------------------------------------- */
/*  Services page: dependability points                                       */
/* -------------------------------------------------------------------------- */

export const DEPENDABLE: Point[] = [
  { title: 'Reliable Transportation', copy: 'Consistent transportation coordination and responsible goods movement to support business delivery requirements.' },
  { title: 'Distribution Support', copy: 'Coordination of product movement across multiple destinations to support supply-chain continuity.' },
  { title: 'Shipment Visibility', copy: 'Shipment communication and tracking updates to help customers stay informed.' },
  { title: 'Safe and Secure Cargo Handling', copy: 'Careful handling and suitable safety practices to help protect goods during transportation.' },
  { title: 'Flexible Business Solutions', copy: 'Service arrangements aligned with individual business needs.' },
  { title: 'Transparent Communication', copy: 'Clear communication to help businesses plan and stay informed.' },
];

/* -------------------------------------------------------------------------- */
/*  Fleet — capacities confirmed; unit counts indicative until verified.       */
/* -------------------------------------------------------------------------- */

export interface FleetClass {
  capacityKL: number;
  /** Number of tankers in this class. Leave out if not yet known (shows "—"). */
  units?: number;
  label: string;
}

export const FLEET: FleetClass[] = [
  { capacityKL: 20, units: 4, label: 'Compact bulk runs' },
  { capacityKL: 24, units: 3, label: 'Mid-volume haulage' },
  { capacityKL: 25, units: 6, label: 'Core workhorse class' },
  { capacityKL: 28, units: 2, label: 'High-volume consignments' },
  // TODO: confirm these classes and add their unit counts.
  { capacityKL: 30, label: 'Long-haul bulk' },
  { capacityKL: 32, label: 'Heavy bulk loads' },
  { capacityKL: 35, label: 'Large-volume transfers' },
  { capacityKL: 40, label: 'Maximum-capacity runs' },
];

/* -------------------------------------------------------------------------- */
/*  Process — "How Our Transportation Process Works"                           */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  index: string;
  title: string;
  copy: string;
}

export const PROCESS: ProcessStep[] = [
  { index: '01', title: 'Share Your Requirement', copy: 'Tell us about your transportation needs, pickup and delivery locations, cargo or fuel requirements and expected schedule.' },
  { index: '02', title: 'Requirement Assessment', copy: 'Our team reviews the details and understands the type of transportation or distribution support required.' },
  { index: '03', title: 'Quotation and Planning', copy: 'We discuss the suitable service arrangement, pricing and delivery coordination.' },
  { index: '04', title: 'Transportation Coordination', copy: 'Once the arrangement is confirmed, transportation activities are coordinated according to the agreed requirements.' },
  { index: '05', title: 'Delivery and Communication', copy: 'We focus on safe delivery, timely coordination and communication with the customer.' },
];

/* -------------------------------------------------------------------------- */
/*  Clients — supplied by the owner (shown on their live site too).            */
/* -------------------------------------------------------------------------- */

import nayara from '../assets/clients/nayara.png';
import bharatPetroleum from '../assets/clients/bharat-petroleum.png';
import indianOil from '../assets/clients/indian-oil.png';
import reliance from '../assets/clients/reliance.png';
import vsl from '../assets/clients/vsl.png';
import shreeRenuka from '../assets/clients/shree-renuka.png';
import mahaCement from '../assets/clients/maha-cement.png';
import shell from '../assets/clients/shell.png';
import ongc from '../assets/clients/ongc.png';

export interface Client {
  name: string;
  logoSrc: string;
  /** true = render on a dark chip (for reversed/white logos). */
  dark?: boolean;
}

export const CLIENTS: Client[] = [
  { name: 'Nayara Energy', logoSrc: nayara },
  { name: 'Bharat Petroleum', logoSrc: bharatPetroleum },
  { name: 'Indian Oil', logoSrc: indianOil },
  { name: 'Reliance Industries', logoSrc: reliance, dark: true },
  { name: 'Vishwaraj Sugar Industries', logoSrc: vsl },
  { name: 'Shree Renuka Sugars', logoSrc: shreeRenuka },
  { name: 'Maha Cement', logoSrc: mahaCement },
  { name: 'Shell', logoSrc: shell },
  { name: 'ONGC', logoSrc: ongc },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What transportation services does VIP Transports provide?',
    a: 'VIP Transports provides business transportation, goods distribution and fuel logistics support. Contact our team with your pickup, delivery and service requirements so we can discuss a suitable arrangement.',
  },
  {
    q: 'Does VIP Transports provide local and long-distance transportation?',
    a: 'We provide transportation support for local deliveries and long-distance movement. Share your route and shipment details to confirm availability and the appropriate service.',
  },
  {
    q: 'Can VIP Transports support distribution across multiple locations?',
    a: 'VIP Transports offers distribution support for businesses that need goods moved across multiple destinations. Requirements can be discussed based on delivery locations, schedules and shipment details.',
  },
  {
    q: 'Does VIP Transports provide fuel distribution services?',
    a: 'Yes. We provide fuel distribution and transportation services for industrial, commercial and retail requirements. All fuel movements are subject to applicable permissions, safety standards and operational availability.',
  },
  {
    q: 'How can I request a transportation quotation?',
    a: 'Call us, send an email or submit the enquiry form. Include your service type, pickup and delivery locations, cargo details and expected schedule to help our team assess your request.',
  },
  {
    q: 'How can I contact VIP Transports?',
    a: 'Call +91 9916060602 or +91 9966696246, email Office@viptransports.in or We@viptransports.in, or visit our Bengaluru office at #213, 6th Cross, 2nd Stage, Arekere Mico Layout, BG Road, Bengaluru - 560076.',
  },
  {
    q: 'Does VIP Transports provide shipment tracking?',
    a: 'We share shipment updates throughout the service process. Ask our team how updates are provided for your specific consignment.',
  },
  {
    q: 'Which industries does VIP Transports serve?',
    a: 'We support manufacturing, retail, FMCG, petroleum, construction, pharmaceuticals, e-commerce and other commercial sectors.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
] as const;

/* -------------------------------------------------------------------------- */
/*  Quote form                                                                 */
/* -------------------------------------------------------------------------- */

export const REQUIREMENT_TYPES = [
  'Transportation Solutions',
  'Distribution Services',
  'Fuel Distribution Services',
  'Other Requirements',
] as const;

/* -------------------------------------------------------------------------- */
/*  Website credit (footer)                                                    */
/* -------------------------------------------------------------------------- */

export const DEVELOPER = {
  name: '4Lancers',
  // TODO: replace with the real 4Lancers website address.
  url: 'https://4lancers.com',
};
