export type SectionType = 'h1' | 'h2' | 'p' | 'callout' | 'divider';

export interface Section {
  id: string;
  type: SectionType;
  text: string;
  buttonText?: string;
  showButton?: boolean;
  url?: string;
}

export interface Config {
  storeView: string;
  uploadUrl: string;
  shopUrl: string;
  showLogo: boolean;
  showSignature: boolean;
  signatureBest: string;
  signatureName: string;
  showDisclaimer: boolean;
  disclaimerText: string;
  showFooter: boolean;
  brandColor: string;
  sections: Section[];
}

export const DEFAULT_CONFIG: Config = {
  storeView: 'GlassesUSA',
  uploadUrl: 'https://www.glassesusa.com/upload',
  shopUrl: 'https://www.glassesusa.com/shop',
  showLogo: true,
  showSignature: true,
  signatureBest: 'Best,',
  signatureName: 'Customer Care Team',
  showDisclaimer: true,
  disclaimerText: "*The online vision exam provided by Visibly, which is an independent third party, is not a comprehensive eye health exam and it is not meant to replace visits to your eye doctor or to replace any other in-person or remotely delivered medical care.  You should seek follow-up care when recommended by an eye doctor or when otherwise needed, and you should continue to consult with your primary care physician and other healthcare professionals.  Only eye care professionals can make decisions on medical treatment, diagnosis, or prescription. This Exam is not designed to be used as a tool for the diagnosis of an illness or other medical condition, nor for the treatment, mitigation, or prevention of illness. Visibly is solely responsible for the services provided to you. Accordingly, GlassesUSA.com is merely facilitating access to the Visibly online vision exam but takes no responsibility for it or the exam results resulting therefrom.  By taking this online vision exam provided by Visibly, you acknowledge and agree that GlassesUSA.com is not providing optometric or medical advice, diagnosis, or any kind of treatment.  Visibly, rather than GlassesUSA.com, assumes all responsibility, supervision, and control for the exam and any prescriptions resulting therefrom, and any claims related to the foregoing shall only be asserted against Visibly.  In order for GlassesUSA.com to process the prescription arising from the Visibly online vision exam and effectuate an order, you expressly permit Visibly to share your exam results and digital prescription with GlassesUSA.com. Eligibility to use the Visibly exam is based on certain criteria, including, but not limited to, age and state where such services are available.",
  showFooter: true,
  brandColor: '#0066cc',
  sections: [
    {
      id: '1',
      type: 'h1',
      text: '',
    }
  ]
};