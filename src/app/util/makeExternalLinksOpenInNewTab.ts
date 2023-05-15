export const makeExternalLinksOpenInNewTab = (html: string) => {
  html = html.replace(/ href="https/g, ` target="_blank" href="https`);
  return html;
};
