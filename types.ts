export type SectionType = "h1" | "h2" | "p" | "callout" | "divider";

// supported store views
export type StoreView = "GlassesUSA" | "Ottica" | "UHC" | "UVP";

export interface StoreConfig {
  uploadUrl: string;
  shopUrl: string;
  logoSrc: string;
  logoAlt: string;
  disclaimerText: string;
  footerHtml: string;
  // Theme Variables
  textColor: string;
  calloutBorderColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
}

export const STORE_VIEWS: Record<StoreView, StoreConfig> = {
  GlassesUSA: {
    uploadUrl: "https://www.glassesusa.com/upload",
    shopUrl: "https://www.glassesusa.com/shop",
    logoSrc:
      "https://optimaxweb.glassesusa.com/image/upload/v1770291950/media/wysiwyg/glasseslogemail.png",
    logoAlt: "GlassesUSA",
    disclaimerText:
      "*The online vision exam provided by Visibly, which is an independent third party, is not a comprehensive eye health exam and it is not meant to replace visits to your eye doctor or to replace any other in-person or remotely delivered medical care. You should seek follow-up care when recommended by an eye doctor or when otherwise needed, and you should continue to consult with your primary care physician and other healthcare professionals. Only eye care professionals can make decisions on medical treatment, diagnosis, or prescription. This Exam is not designed to be used as a tool for the diagnosis of an illness or other medical condition, nor for the treatment, mitigation, or prevention of illness. Visibly is solely responsible for the services provided to you. Accordingly, GlassesUSA.com is merely facilitating access to the Visibly online vision exam but takes no responsibility for it or the exam results resulting therefrom. By taking this online vision exam provided by Visibly, you acknowledge and agree that GlassesUSA.com is not providing optometric or medical advice, diagnosis, or any kind of treatment. Visibly, rather than GlassesUSA.com, assumes all responsibility, supervision, and control for the exam and any prescriptions resulting therefrom, and any claims related to the foregoing shall only be asserted against Visibly. In order for GlassesUSA.com to process the prescription arising from the Visibly online vision exam and effectuate an order, you expressly permit Visibly to share your exam results and digital prescription with GlassesUSA.com. Eligibility to use the Visibly exam is based on certain criteria, including, but not limited to, age and state where such services are available.",
    footerHtml: `
      <tr>
                <td>
                    <table class="trans-txt-d-bc" style="background: #020621; color:#fff; text-align: center; margin: auto;" width="100%" align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr><td height="24"></td></tr>
                            <tr class="trans-txt-d-b" style="font-style: normal; font-weight: normal; font-size:20px !important; line-height: 28px;">
                                <td>
                                    <b class="trans-txt-d-inline" style="display: block;"> Need help with your order? </b>   &nbsp;
                                    <span style="font-size: 18px;" class="trans-txt-d-normal"> We are here for you 24/7!</span>
                                </td>
                            </tr>
                            <tr><td class="trans-txt-d-b-top" height="24"></td></tr>

                            <tr style="display: table; margin: auto;" align="center">
                                <td><a href="https://www.glassesusa.com/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" class="colored" style="display: none;" alt="chat"></a></td>
                                <td width="8"></td>
                                <td>
                                    <a href="tel:+1-844-244-1186">
                                        <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" class="colored" style="display: none;" alt="call us">
                                    </a>
                                </td>
                                <td width="8"></td>
                                <td>
                                    <a href="https://support.glassesusa.com/hc/en-us">
                                        <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" class="colored" style="display: none;" alt="help center">
                                    </a>
                                </td>
                            </tr>

                            <tr style="display: table; margin: auto;" align="center">
                                <td><img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/lc-n.png" alt="chat"></td>
                                <td width="8"></td>
                                <td>
                                    <a href="tel:+1-844-244-1186">
                                        <img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/cu-n.png" alt="call us">
                                    </a>
                                </td>
                                <td width="8"></td>
                                <td>
                                    <a href="https://www.glassesusa.com/help-center">
                                        <img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/hc-n.png" alt="help center">
                                    </a>
                                </td>
                            </tr>

                            <tr><td height="38"></td></tr>
                            <tr style="display: table; margin: auto;" align="center">
                                <td><a href="https://www.facebook.com/GlassesUSA/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="facebook"></a></td>
                                <td width="36"></td>
                                <td><a href='https://www.instagram.com/glassesusa/'><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="instagram"></a></td>
                                <td width="36"></td>
                                <td><a href='https://www.tiktok.com/@glassesusa'><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tiktok"></a></td>
                                <td width="36"></td>
                                <td><a href= 'https://twitter.com/GlassesUSA'><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp26/x.png" alt="Twitter"></a></td>
                                <td width="36"></td>
                                <td><a href='https://www.youtube.com/user/GlassesUSA'><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="youtube"></a></td>
                                <td width="36"></td>
                                <td><a href='https://www.pinterest.com/glassesusa/'><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="pinterest"></a></td>
                            </tr>

                            <tr><td height="24"></td></tr>
                            <tr>
                                <td style="font-family: Roboto, sans-serif; font-size: 12px; line-height: 25px; text-align: center; color: #B0BDC5;">
                                    © 2006-2026 Glassesusa.com All Rights Reserved
                                </td>
                            </tr>
                            <tr><td height="24"></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
    `,
    textColor: "#0F0F0F",
    calloutBorderColor: "#277BDA",
    buttonBgColor: "#020621",
    buttonTextColor: "#ffffff",
  },
  Ottica: {
    uploadUrl: "https://www.glassesusa.com/upload",
    shopUrl: "https://www.glassesusa.com/shop",
    logoSrc:
      "https://optimaxweb.glassesusa.com/image/upload/v1778078741/media/wysiwyg/lp26/ottica-email-logo.png",
    logoAlt: "Ottica",
    disclaimerText:
      "*The online vision exam provided by Visibly, which is an independent third party, is not a comprehensive eye health exam and it is not meant to replace visits to your eye doctor or to replace any other in-person or remotely delivered medical care. You should seek follow-up care when recommended by an eye doctor or when otherwise needed, and you should continue to consult with your primary care physician and other healthcare professionals. Only eye care professionals can make decisions on medical treatment, diagnosis, or prescription. This Exam is not designed to be used as a tool for the diagnosis of an illness or other medical condition, nor for the treatment, mitigation, or prevention of illness. Visibly is solely responsible for the services provided to you. Accordingly, GlassesUSA.com is merely facilitating access to the Visibly online vision exam but takes no responsibility for it or the exam results resulting therefrom. By taking this online vision exam provided by Visibly, you acknowledge and agree that GlassesUSA.com is not providing optometric or medical advice, diagnosis, or any kind of treatment. Visibly, rather than GlassesUSA.com, assumes all responsibility, supervision, and control for the exam and any prescriptions resulting therefrom, and any claims related to the foregoing shall only be asserted against Visibly. In order for GlassesUSA.com to process the prescription arising from the Visibly online vision exam and effectuate an order, you expressly permit Visibly to share your exam results and digital prescription with GlassesUSA.com. Eligibility to use the Visibly exam is based on certain criteria, including, but not limited to, age and state where such services are available.",
    footerHtml: `
    <style>
    td.text-row {
        display: block;
        width: 100%;
        text-align: center;
    }

    @media only screen and (min-width:600px) {
        td.text-row {
            display: inline-block !important;
            width: auto !important;
        }
    }
</style>
  <center>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">

                    <table width="600" border="0" cellspacing="0" cellpadding="0"
                        style="background:#000000; color:#ffffff; font-family: Arial, sans-serif; width:100%; max-width:600px;">

                        <tr>
                            <td style="padding:24px 20px; text-align:center;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>

                                        <td class="text-row" align="right" style="padding-right:6px;">
                                            <p
                                                style="margin:0; font-size:16px; font-weight:bold; line-height:28px; white-space:nowrap;">
                                                Need help with your order?
                                            </p>
                                        </td>

                                        <td class="text-row" align="left" style="padding-left:6px;">
                                            <p style="margin:0; font-size:16px; font-weight:300; white-space:nowrap;">
                                                We are here for you 24/7!
                                            </p>
                                        </td>

                                    </tr>
                                </table>

                                <!-- Buttons -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    style="margin-top:16px; margin-bottom:32px;">
                                    <tr>

                                        <!-- Call Us -->
                                        <td align="center" width="50%" style="padding:4px;">
                                            <a href="tel:1-844-244-1186"
                                                style="display:block; background:#1A1A1A; color:#ffffff; text-decoration:none; padding:16px 12px; font-size:16px;">

                                                <table border="0" cellspacing="0" cellpadding="0" align="center">
                                                    <tr>
                                                        <td style="vertical-align:middle;">
                                                            <img src="https://optimaxweb.glassesusa.com/image/upload/v1777909363/media/wysiwyg/lp26/call.png"
                                                                width="18" height="18"
                                                                style="display:block; margin-right:10px;">
                                                        </td>
                                                        <td
                                                            style="vertical-align:middle; color:#ffffff; font-size:16px;">
                                                            Call Us
                                                        </td>
                                                    </tr>
                                                </table>

                                            </a>
                                        </td>

                                        <!-- Help Center -->
                                        <td align="center" width="50%" style="padding:4px;">
                                            <a href="https://support.ottica.com/hc/en-us"
                                                style="display:block; background:#1A1A1A; color:#ffffff; text-decoration:none; padding:16px 12px; font-size:16px;">

                                                <table border="0" cellspacing="0" cellpadding="0" align="center">
                                                    <tr>
                                                        <td style="vertical-align:middle;">
                                                            <img src="https://optimaxweb.glassesusa.com/image/upload/v1777909364/media/wysiwyg/lp26/help.png"
                                                                width="18" height="18"
                                                                style="display:block; margin-right:10px;">
                                                        </td>
                                                        <td
                                                            style="vertical-align:middle; color:#ffffff; font-size:16px;">
                                                            Help Center
                                                        </td>
                                                    </tr>
                                                </table>

                                            </a>
                                        </td>

                                    </tr>
                                </table>

                                <!-- Info text -->
                                <p style="margin:0; color:#898989; font-size:14px; line-height:21px;">
                                    For any insurance claims, please note that the Ottica.com federal tax identification
                                    is 981385007.
                                </p>

                                <!-- Divider -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:20px 0;">
                                    <tr>
                                        <td style="border-top:1px solid rgba(255,255,255,0.2);"></td>
                                    </tr>
                                </table>

                                <!-- Footer -->
                                <p style="margin:0; color:#898989; font-size:12px; line-height:24px;">
                                    © 2006-2025 Ottica.com. All Rights Reserved.
                                </p>

                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </center>
    `,
    textColor: "#0F0F0F",
    calloutBorderColor: "#0F0F0F",
    buttonBgColor: "#0F0F0F",
    buttonTextColor: "#ffffff",
  },
  UHC: {
    uploadUrl: "https://www.uhcglasses.com/",
    shopUrl: "https://www.uhcglasses.com/",
    logoSrc:
      "https://optimaxweb.glassesusa.com/image/upload/v1778159387/media/wysiwyg/lp26/UHC-email-logo.png",
    logoAlt: "UHC",
    disclaimerText:
      "*The online vision exam provided by Visibly, which is an independent third party, is not a comprehensive eye health exam and it is not meant to replace visits to your eye doctor or to replace any other in-person or remotely delivered medical care.  You should seek follow-up care when recommended by an eye doctor or when otherwise needed, and you should continue to consult with your primary care physician and other healthcare professionals.  Only eye care professionals can make decisions on medical treatment, diagnosis, or prescription. This Exam is not designed to be used as a tool for the diagnosis of an illness or other medical condition, nor for the treatment, mitigation, or prevention of illness. Visibly is solely responsible for the services provided to you. Accordingly, GlassesUSA.com is merely facilitating access to the Visibly online vision exam but takes no responsibility for it or the exam results resulting therefrom.  By taking this online vision exam provided by Visibly, you acknowledge and agree that GlassesUSA.com is not providing optometric or medical advice, diagnosis, or any kind of treatment.  Visibly, rather than GlassesUSA.com, assumes all responsibility, supervision, and control for the exam and any prescriptions resulting therefrom, and any claims related to the foregoing shall only be asserted against Visibly.  In order for GlassesUSA.com to process the prescription arising from the Visibly online vision exam and effectuate an order, you expressly permit Visibly to share your exam results and digital prescription with GlassesUSA.com. Eligibility to use the Visibly exam is based on certain criteria, including, but not limited to, age and state where such services are available.",
    footerHtml: `
  <style>
    .text-row td {
      display: block;
      width: 100%;
      text-align: center;
    }
  </style>
    <center>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table
              width="600"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="background: #032677; color: #ffffff; font-family: Arial, sans-serif; width: 100%; max-width: 600px;"
            >
              <tr>
                <td style="padding: 24px 20px; text-align: center">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr class="text-row">
                      <td align="right" style="padding-right: 6px">
                        <p
                          style="margin: 0;padding-bottom: 8px; font-size: 16px; white-space: nowrap; font-family: Helvetica; font-style: normal; font-weight: 700; line-height: 24px;"
                        >
                          Have a question?
                        </p>
                      </td>

                      <td align="left" style="padding-left: 6px">
                        <p
                          style="margin: 0;text-align: center;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: 400;line-height: 24px; "
                        >
                          Contact us - 1-844-244-1179
                        </p>
                      </td>
                    </tr>
                  </table>
                  <!-- Divider -->
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    style="margin:20px 0;"
                  >
                    <tr>
                      <td
                        style="border-top:1px solid rgba(255,255,255,0.2);"
                      ></td>
                    </tr>
                  </table>

                  <!-- Footer Links Row -->
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <!-- Left link -->
                      <td width="50%" align="center" style="padding:0;">
                        <a
                          href="https://www.uhcglasses.com/pages/policy"
                          style="color:#ffffff; font-size:16px; font-style:normal; font-weight:400; line-height:24px; text-decoration:underline;"
                        >
                          Privacy Policy
                        </a>
                      </td>

                      <!-- Right link -->
                      <td width="50%" align="center" style="padding:0;">
                        <a
                          href="https://www.uhcglasses.com/pages/terms-of-use"
                          style="color:#ffffff; font-size:16px; font-style:normal; font-weight:400; line-height:24px; text-decoration:underline;"
                        >
                          Terms & Conditions
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
    `,
    textColor: "#333",
    calloutBorderColor: "#032677",
    buttonBgColor: "#032677",
    buttonTextColor: "#ffffff",
  },
  UVP: {
    uploadUrl: "https://www.unitedvisionplan.com",
    shopUrl: "https://www.unitedvisionplan.com",
    logoSrc:
      "https://optimaxweb.glassesusa.com/image/upload/v1778159387/media/wysiwyg/lp26/UVP-email-logo.png",
    logoAlt: "UVP",
    disclaimerText:
      "*The online vision exam provided by Visibly, which is an independent third party, is not a comprehensive eye health exam and it is not meant to replace visits to your eye doctor or to replace any other in-person or remotely delivered medical care.  You should seek follow-up care when recommended by an eye doctor or when otherwise needed, and you should continue to consult with your primary care physician and other healthcare professionals.  Only eye care professionals can make decisions on medical treatment, diagnosis, or prescription. This Exam is not designed to be used as a tool for the diagnosis of an illness or other medical condition, nor for the treatment, mitigation, or prevention of illness. Visibly is solely responsible for the services provided to you. Accordingly, GlassesUSA.com is merely facilitating access to the Visibly online vision exam but takes no responsibility for it or the exam results resulting therefrom.  By taking this online vision exam provided by Visibly, you acknowledge and agree that GlassesUSA.com is not providing optometric or medical advice, diagnosis, or any kind of treatment.  Visibly, rather than GlassesUSA.com, assumes all responsibility, supervision, and control for the exam and any prescriptions resulting therefrom, and any claims related to the foregoing shall only be asserted against Visibly.  In order for GlassesUSA.com to process the prescription arising from the Visibly online vision exam and effectuate an order, you expressly permit Visibly to share your exam results and digital prescription with GlassesUSA.com. Eligibility to use the Visibly exam is based on certain criteria, including, but not limited to, age and state where such services are available.",
    footerHtml: `
  <style>
    .text-row td {
      display: block;
      width: 100%;
      text-align: center;
    }
  </style>
    <center>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table
              width="600"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="background: #2F1A6C; color: #ffffff; font-family: Arial, sans-serif; width: 100%; max-width: 600px;"
            >
              <tr>
                <td style="padding: 24px 20px; text-align: center">
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr class="text-row">
                      <td align="right" style="padding-right: 6px">
                        <p
                          style="margin: 0;padding-bottom: 8px; font-size: 16px; white-space: nowrap; font-family: Helvetica; font-style: normal; font-weight: 700; line-height: 24px;"
                        >
                          Have a question?
                        </p>
                      </td>

                      <td align="left" style="padding-left: 6px">
                        <p
                          style="margin: 0;text-align: center;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: 400;line-height: 24px; "
                        >
                          Contact us - 1-844-244-1184
                        </p>
                      </td>
                    </tr>
                  </table>
                  <!-- Divider -->
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    style="margin:20px 0;"
                  >
                    <tr>
                      <td
                        style="border-top:1px solid rgba(255,255,255,0.2);"
                      ></td>
                    </tr>
                  </table>

                  <!-- Footer Links Row -->
                  <table
                    width="100%"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                  >
                    <tr>
                      <!-- Left link -->
                      <td width="50%" align="center" style="padding:0;">
                        <a
                          href="https://www.unitedvisionplan.com/pages/policy"
                          style="color:#ffffff; font-size:16px; font-style:normal; font-weight:400; line-height:24px; text-decoration:underline;"
                        >
                          Privacy Policy
                        </a>
                      </td>

                      <!-- Right link -->
                      <td width="50%" align="center" style="padding:0;">
                        <a
                          href="https://www.unitedvisionplan.com/pages/terms-of-use"
                          style="color:#ffffff; font-size:16px; font-style:normal; font-weight:400; line-height:24px; text-decoration:underline;"
                        >
                          Terms & Conditions
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
    `,
    textColor: "#333",
    calloutBorderColor: "#2F1A6C",
    buttonBgColor: "#2F1A6C",
    buttonTextColor: "#ffffff",
  },
};

export interface Section {
  id: string;
  type: SectionType;
  text: string;
  buttonText?: string;
  showButton?: boolean;
  url?: string;
}

export interface Config {
  storeView: StoreView;
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
  storeView: "GlassesUSA",
  uploadUrl: "https://www.glassesusa.com/upload",
  shopUrl: "https://www.glassesusa.com/shop",
  showLogo: true,
  showSignature: true,
  signatureBest: "Best,",
  signatureName: "Customer Care Team",
  showDisclaimer: true,
  disclaimerText:
    "*The online vision exam provided by Visibly, which is an independent third party, is not a comprehensive eye health exam and it is not meant to replace visits to your eye doctor or to replace any other in-person or remotely delivered medical care.  You should seek follow-up care when recommended by an eye doctor or when otherwise needed, and you should continue to consult with your primary care physician and other healthcare professionals.  Only eye care professionals can make decisions on medical treatment, diagnosis, or prescription. This Exam is not designed to be used as a tool for the diagnosis of an illness or other medical condition, nor for the treatment, mitigation, or prevention of illness. Visibly is solely responsible for the services provided to you. Accordingly, GlassesUSA.com is merely facilitating access to the Visibly online vision exam but takes no responsibility for it or the exam results resulting therefrom.  By taking this online vision exam provided by Visibly, you acknowledge and agree that GlassesUSA.com is not providing optometric or medical advice, diagnosis, or any kind of treatment.  Visibly, rather than GlassesUSA.com, assumes all responsibility, supervision, and control for the exam and any prescriptions resulting therefrom, and any claims related to the foregoing shall only be asserted against Visibly.  In order for GlassesUSA.com to process the prescription arising from the Visibly online vision exam and effectuate an order, you expressly permit Visibly to share your exam results and digital prescription with GlassesUSA.com. Eligibility to use the Visibly exam is based on certain criteria, including, but not limited to, age and state where such services are available.",
  showFooter: true,
  brandColor: "#0066cc",
  sections: [
    {
      id: "1",
      type: "h1",
      text: "",
    },
  ],
};
