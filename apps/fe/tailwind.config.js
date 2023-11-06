const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app,modules}/**/*!(*.stories|*.spec).{ts,tsx,html,jsx}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    animation: {
      spin: 'spin 1s linear infinite',
      expandRow: 'expandRow 0.3s ease-in-out',
      collapseRow: 'collapseRow 0.3s ease-in-out',
      customExpandRow: 'customExpandRow 0.3s ease-in-out',
      customCollapseRow: 'customCollapseRow 0.3s ease-in-out',
      shine: 'shine 2s ease-in-out infinite',
      hide: 'hide 100ms ease-in',
      slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      swipeOut: 'swipeOut 100ms ease-out',
      slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      slideRightAndFade:
        'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      fadeIn: 'fadeIn 400ms ease-in',
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: 'rgba(33, 33, 33, 1)',
          secondary: 'rgba(64, 64, 64, 1)',
          placeholder: 'rgba(148, 148, 148, 1)',
        },
        light: {
          DEFAULT: 'rgba(255, 255, 255, 1)',
          secondary: 'rgba(255, 255, 255, 0.75)',
          placeholder: 'rgba(255, 255, 255, 0.4)',
        },
        icon: {
          dark: {
            DEFAULT: 'rgba(33, 33, 33, 1)',
            descriptive: 'rgba(148, 148, 148, 1)',
          },
          light: {
            DEFAULT: 'rgba(255, 255, 255, 1)',
            descriptive: 'rgba(255, 255, 255, 0.4)',
          },
        },
        btn: {
          dark: {
            DEFAULT: 'rgba(12, 12, 12, 1)',
            hover: 'rgba(12, 12, 12, 0.85)',
          },
          light: {
            DEFAULT: 'rgba(255, 255, 255, 1)',
            hover: 'rgba(255, 255, 255, 0.9)',
          },
          accent: {
            DEFAULT: 'rgba(216, 33, 55, 1)',
            hover: 'rgba(216, 33, 55, 0.85)',
          },
        },
        dropdown: {
          border: {
            DEFAULT: 'rgba(30, 30, 30, 0.08)',
            active: 'rgba(165, 165, 165, 1)',
            disabled: 'rgba(30, 30, 30, 1)',
          },
          'background-disabled': 'rgba(249, 249, 249, 1)',
        },
        input: {
          border: {
            DEFAULT: 'rgba(30, 30, 30, 0.08)',
            active: 'rgba(165, 165, 165, 1)',
            disabled: 'rgba(30, 30, 30, 1)',
          },
          'background-disabled': 'rgba(249, 249, 249, 1)',
        },
        checkbox: {
          border: 'rgba(148, 148, 148, 1)',
          background: 'rgba(243, 243, 245, 1)',
          hover: 'rgba(33, 33, 33, 1)',
        },
        background: {
          background: 'rgba(12, 12, 12, 1)',
          light: 'rgba(255, 255, 255, 1)',
          'light-gray': 'rgba(243, 243, 243, 1)',
          skeleton: 'rgba(240, 240, 240, 1)',
        },
        separator: {
          dark: 'rgba(30, 30, 30, 0.08)',
          light: 'rgba(255, 255, 255, 0.2)',
        },
        primary: {
          red: {
            DEFAULT: 'rgba(216, 33, 55, 1)',
          },
          black: {
            DEFAULT: 'rgba(12, 12, 12, 1)',
          },
          white: {
            DEFAULT: 'rgba(255, 255, 255, 1)',
          },
        },
        'header-border': 'rgba(0, 0, 0, 0.05)',
        switch: 'rgba(21, 7, 75, 0.08)',
        'sticky-background': '#fafafa',
        overlay: 'rgba(0, 0, 0, 0.5)',
        avatar: 'rgb(196, 196, 196)',
        focused: 'rgba(216, 33, 55, 0.35)',
        accent: 'rgba(216, 33, 55, 1)',
        scrim: 'rgba(12, 12, 12, 0.3)',
        error: {
          DEFAULT: 'rgba(235, 0, 0, 1)',
          light: 'rgba(252, 218, 221, 1)',
        },
        success: {
          DEFAULT: 'rgba(80, 194, 0, 1)',
          light: 'rgba(221, 238, 206, 1)',
        },
        info: {
          DEFAULT: 'rgba(0, 134, 209, 1)',
          light: 'rgba(207, 230, 245, 1)',
        },
        warning: {
          DEFAULT: 'rgba(255, 176, 103, 1)',
          light: 'rgba(254, 239, 226, 1)',
        },
      },
      fontFamily: {
        'display-bold': 'var(--font-display-bold)',
        'display-medium': 'var(--font-display-medium)',
        'text-roman': 'var(--font-text-roman)',
        'text-bold': 'var(--font-text-bold)',
        'text-medium': 'var(--font-text-medium)',
      },
      typography: ({ theme }) => ({
        'heading-h0': {
          css: {
            fontWeight: 700,
            lineHeight: '50px',
            fontSize: '50px',
          },
        },
        'heading-h1': {
          css: {
            fontWeight: 500,
            lineHeight: '44px',
            fontSize: '40px',
          },
        },
        'heading-h2': {
          css: {
            fontWeight: 500,
            lineHeight: 'normal',
            fontSize: '32px',
          },
        },
        'heading-h3': {
          css: {
            fontWeight: 500,
            lineHeight: '32px',
            fontSize: '24px',
          },
        },
        'heading-h4': {
          css: {
            fontWeight: 500,
            lineHeight: '20px',
            fontSize: '16px',
          },
        },
        'heading-h5': {
          css: {
            fontWeight: 500,
            lineHeight: 'normal',
            fontSize: '14px',
          },
        },
        'heading-h6': {
          css: {
            fontWeight: 700,
            lineHeight: 'normal',
            letterSpacing: '0.6px',
            fontSize: '10px',
          },
        },
        'p-lead': {
          css: {
            fontWeight: 400,
            lineHeight: '36px',
            fontSize: '22px',
          },
        },
        'p-lead-medium': {
          css: {
            fontWeight: 500,
            lineHeight: '32px',
            fontSize: '22px',
          },
        },
        'p-lead-bold': {
          css: {
            fontWeight: 700,
            lineHeight: '32px',
            fontSize: '22px',
          },
        },
        p: {
          css: {
            fontWeight: 400,
            lineHeight: '24px',
            fontSize: '16px',
          },
        },
        'p-bold': {
          css: {
            fontWeight: 700,
            lineHeight: '24px',
            fontSize: '16px',
          },
        },
        'p-underline': {
          css: {
            fontWeight: 400,
            lineHeight: '24px',
            fontSize: '16px',
            textDecoration: 'underline',
          },
        },
        'p-small': {
          css: {
            fontWeight: 400,
            lineHeight: '20px',
            fontSize: '14px',
          },
        },
        'p-small-bold': {
          css: {
            fontWeight: 700,
            lineHeight: '20px',
            fontSize: '14px',
          },
        },
        'p-smallest': {
          css: {
            fontWeight: 400,
            lineHeight: '18px',
            fontSize: '12px',
          },
        },
        'b-default': {
          css: {
            fontWeight: 500,
            lineHeight: '24px',
            fontSize: '16px',
          },
        },
        'b-default-underlined': {
          css: {
            fontWeight: 500,
            lineHeight: '24px',
            fontSize: '16px',
            textDecoration: 'underline',
          },
        },
        'b-small': {
          css: {
            fontWeight: 500,
            lineHeight: '24px',
            fontSize: '14px',
          },
        },
        'b-small-underlined': {
          css: {
            fontWeight: 400,
            lineHeight: '24px',
            fontSize: '14px',
            textDecoration: 'underline',
          },
        },
      }),
      gridTemplateColumns: {
        '1-fixed': 'repeat(1, 1fr)',
        '2-fixed': 'repeat(2, 1fr)',
        '3-fixed': 'repeat(3, 1fr)',
        '4-fixed': 'repeat(4, 1fr)',
        '5-fixed': 'repeat(5, 1fr)',
        '6-fixed': 'repeat(6, 1fr)',
        '7-fixed': 'repeat(7, 1fr)',
        '8-fixed': 'repeat(8, 1fr)',
        '9-fixed': 'repeat(9, 1fr)',
        '10-fixed': 'repeat(10, 1fr)',
        '11-fixed': 'repeat(11, 1fr)',
        '12-fixed': 'repeat(12, 1fr)',
        '13-fixed': 'repeat(13, 1fr)',
      },
      boxShadow: {
        'btn-focused': '0 0 0 3px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        tny: '360px',
        sml: '568px',
        med: '768px',
        lrg: '992px',
        xl: '1200px',
        huge: '1359px',
        xhuge: '2000px',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        expandRow: {
          '0%': { gridTemplateRows: '0' },
          '100%': { gridTemplateRows: '1fr' },
        },
        collapseRow: {
          '0%': { gridTemplateRows: '1fr' },
          '100%': { gridTemplateRows: '0' },
        },
        shine: {
          to: { backgroundPosition: '100% center' },
        },
        customExpandRow: {
          from: {
            height: 0,
          },
          to: {
            height: 'var(--radix-collapsible-content-height)',
          },
        },
        customCollapseRow: {
          from: {
            height: 'var(--radix-collapsible-content-height)',
          },
          to: {
            height: 0,
          },
        },
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        pulse: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'typo',
    }),
  ],
};
