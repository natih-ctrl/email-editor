let oldVersionTest = `<tr><td style="padding: 0 20px 16px 20px;">
          {% if exam %}
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px; background-color: #ffffff; border-collapse: separate;">
          <tr>
          <td width="4" style="background-color: ${store.calloutBorderColor}; border-radius: 4px 0 0 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          <td style="padding: 16px;">
          <div style="font-size: 16px; font-weight: 400; line-height: 24px; color: ${store.textColor};">
          ${section.text || ""}
          </div>
                  <div style="padding-top: 16px;">
                    <a href={{ exam.link }} style="background-color: ${store.buttonBgColor}; color: ${store.buttonTextColor}; padding: 0px 20px;height:32px; line-height:32px; text-align: center; border-radius: 20px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">Start Test  </a>
                  </div>
                  </td>
                  </tr>
                  </table>
                  {% endif %}
          </td></tr>`;
