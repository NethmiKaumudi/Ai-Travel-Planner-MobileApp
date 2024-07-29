const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const greenLight = '#4CAF50'; // Light green
const greenDark = '#2C6B2F';  // Dark green

export const Colors = {
  white: '#fff',
  primary: greenLight, // Default primary color for green theme
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    greenTint: greenLight, // Add green theme for light mode
    primary: greenLight, // Ensure primary is correctly set
    secondary: '#F1F1F1', // Light grey for background
    highlight: '#E0E0E0', // Highlight color
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    greenTint: greenDark, // Add green theme for dark mode
    primary: greenDark, // Ensure primary is correctly set
    secondary: '#2C2C2C', // Dark grey for background
    highlight: '#3A3A3A', // Highlight color
  },
};
