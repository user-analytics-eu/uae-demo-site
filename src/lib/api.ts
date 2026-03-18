const trackEvent = (eventName: string, properties: any = {}) => {
  console.log(`[Analytics] Event: ${eventName}`, properties);
  // This is where you would call your real analytics API
};

export { trackEvent };