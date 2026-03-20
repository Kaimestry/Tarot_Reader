export const CardDeckConfig = {
  originalWidth: 300, // original portrait width
  originalHeight: 527, // original portrait height
  stackOffset: 3, // pixels between stacked cards
  borderRadius: "5px", // card corner radius
  previewMaxWidth: 120, // max width for small deck preview
  previewMaxHeight: 220, // max height for small deck preview
  hoverFloat: 4, // px the top card floats on hover/click

  rules: {
    defaultMaxSelection: 3,
    quickReadingMax: 1,
    celticCrossMax: 10,
  },
};

export const LibraryConfig = {
  mobileScale: 0.25, // Adjusted slightly up from 0.18 for better visibility in a list
  desktopScale: 0.45, // Adjusted slightly up from 0.35 for a "Gallery" feel
  itemsPerPage: 12,
  breakpoint: 768, // px for mobile vs desktop switch
};
