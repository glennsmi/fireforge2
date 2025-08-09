import React from 'react';
import Logo from '../components/Logo';
import TriangleIcon from '../components/TriangleIcon';

const DesignReference = ({ darkMode }) => {
  const colorPalettes = [
    {
      name: 'Primary - Flame',
      description: 'Main brand color representing fire and energy',
      colors: [
        { name: '50', value: '#FFECE5', class: 'bg-primary-50' },
        { name: '100', value: '#FFD0BF', class: 'bg-primary-100' },
        { name: '200', value: '#FFAB8C', class: 'bg-primary-200' },
        { name: '300', value: '#FF8659', class: 'bg-primary-300' },
        { name: '400', value: '#FF6126', class: 'bg-primary-400' },
        { name: '500', value: '#FF4500', class: 'bg-primary-500' },
        { name: '600', value: '#E63E00', class: 'bg-primary-600' },
        { name: '700', value: '#BF3400', class: 'bg-primary-700' },
        { name: '800', value: '#992900', class: 'bg-primary-800' },
        { name: '900', value: '#731F00', class: 'bg-primary-900' },
        { name: '950', value: '#4D1500', class: 'bg-primary-950' },
      ]
    },
    {
      name: 'Secondary - Alloy Steel',
      description: 'Professional and modern neutral tones',
      colors: [
        { name: '50', value: '#F4F4F6', class: 'bg-secondary-50' },
        { name: '100', value: '#E3E5E9', class: 'bg-secondary-100' },
        { name: '200', value: '#CDD0D7', class: 'bg-secondary-200' },
        { name: '300', value: '#B7BBC6', class: 'bg-secondary-300' },
        { name: '400', value: '#A1A6B4', class: 'bg-secondary-400' },
        { name: '500', value: '#9096A7', class: 'bg-secondary-500' },
        { name: '600', value: '#7F8699', class: 'bg-secondary-600' },
        { name: '700', value: '#676E82', class: 'bg-secondary-700' },
        { name: '800', value: '#535868', class: 'bg-secondary-800' },
        { name: '900', value: '#3E424E', class: 'bg-secondary-900' },
        { name: '950', value: '#292C34', class: 'bg-secondary-950' },
      ]
    },
    {
      name: 'Tertiary - Forge Crimson',
      description: 'Accent color for highlights and calls-to-action',
      colors: [
        { name: '50', value: '#FBE9EB', class: 'bg-tertiary-50' },
        { name: '100', value: '#F5C8CD', class: 'bg-tertiary-100' },
        { name: '200', value: '#EE9DA5', class: 'bg-tertiary-200' },
        { name: '300', value: '#E6717D', class: 'bg-tertiary-300' },
        { name: '400', value: '#DE4555', class: 'bg-tertiary-400' },
        { name: '500', value: '#D72638', class: 'bg-tertiary-500' },
        { name: '600', value: '#C22232', class: 'bg-tertiary-600' },
        { name: '700', value: '#A11D2A', class: 'bg-tertiary-700' },
        { name: '800', value: '#811722', class: 'bg-tertiary-800' },
        { name: '900', value: '#611119', class: 'bg-tertiary-900' },
        { name: '950', value: '#410B11', class: 'bg-tertiary-950' },
      ]
    },
    {
      name: 'Gunmetal Gray',
      description: 'Dark neutral for text and backgrounds',
      colors: [
        { name: '50', value: '#ECEDEF', class: 'bg-gunmetal-50' },
        { name: '100', value: '#D0D2D7', class: 'bg-gunmetal-100' },
        { name: '200', value: '#ABAEB6', class: 'bg-gunmetal-200' },
        { name: '300', value: '#868A96', class: 'bg-gunmetal-300' },
        { name: '400', value: '#636773', class: 'bg-gunmetal-400' },
        { name: '500', value: '#4B4E57', class: 'bg-gunmetal-500' },
        { name: '600', value: '#43464E', class: 'bg-gunmetal-600' },
        { name: '700', value: '#383A41', class: 'bg-gunmetal-700' },
        { name: '800', value: '#2D2F34', class: 'bg-gunmetal-800' },
        { name: '900', value: '#222327', class: 'bg-gunmetal-900' },
        { name: '950', value: '#16171A', class: 'bg-gunmetal-950' },
      ]
    },
    {
      name: 'Molten Orange Accent',
      description: 'Vibrant accent for energy and warmth',
      colors: [
        { name: '50', value: '#FFEEE5', class: 'bg-orange-50' },
        { name: '100', value: '#FFD5BF', class: 'bg-orange-100' },
        { name: '200', value: '#FFB48C', class: 'bg-orange-200' },
        { name: '300', value: '#FF9259', class: 'bg-orange-300' },
        { name: '400', value: '#FF7126', class: 'bg-orange-400' },
        { name: '500', value: '#FF5800', class: 'bg-orange-500' },
        { name: '600', value: '#E64F00', class: 'bg-orange-600' },
        { name: '700', value: '#BF4200', class: 'bg-orange-700' },
        { name: '800', value: '#993500', class: 'bg-orange-800' },
        { name: '900', value: '#732800', class: 'bg-orange-900' },
        { name: '950', value: '#4D1A00', class: 'bg-orange-950' },
      ]
    }
  ];

  const typographyExamples = [
    { size: 'text-6xl', label: '6xl', example: 'Hero Headlines' },
    { size: 'text-5xl', label: '5xl', example: 'Page Titles' },
    { size: 'text-4xl', label: '4xl', example: 'Section Headers' },
    { size: 'text-3xl', label: '3xl', example: 'Large Headings' },
    { size: 'text-2xl', label: '2xl', example: 'Medium Headings' },
    { size: 'text-xl', label: 'xl', example: 'Small Headings' },
    { size: 'text-lg', label: 'lg', example: 'Large Body Text' },
    { size: 'text-base', label: 'base', example: 'Regular Body Text' },
    { size: 'text-sm', label: 'sm', example: 'Small Text' },
    { size: 'text-xs', label: 'xs', example: 'Caption Text' },
  ];

  const componentExamples = [
    {
      name: 'Primary Button',
      component: (
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Get Started
        </button>
      )
    },
    {
      name: 'Secondary Button',
      component: (
        <button className="bg-secondary-200 hover:bg-secondary-300 text-gunmetal-800 px-6 py-3 rounded-lg font-semibold transition-colors">
          Learn More
        </button>
      )
    },
    {
      name: 'Tertiary Button',
      component: (
        <button className="bg-tertiary-500 hover:bg-tertiary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Contact Us
        </button>
      )
    },
    {
      name: 'Outline Button',
      component: (
        <button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Outline Style
        </button>
      )
    }
  ];

  const cardExamples = [
    {
      name: 'Light Card',
      component: (
        <div className="bg-white border border-secondary-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gunmetal-800 mb-2">Card Title</h3>
          <p className="text-secondary-600">This is a light card with subtle shadows and borders.</p>
        </div>
      )
    },
    {
      name: 'Dark Card',
      component: (
        <div className="bg-gunmetal-800 border border-gunmetal-700 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Dark Card</h3>
          <p className="text-secondary-300">This is a dark card for contrast and modern appeal.</p>
        </div>
      )
    },
    {
      name: 'Accent Card',
      component: (
        <div className="bg-gradient-to-br from-primary-500 to-tertiary-500 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Gradient Card</h3>
          <p className="text-primary-50">This card uses the brand gradient for emphasis.</p>
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gunmetal-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>
            FireForge Design System Reference
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>
            A comprehensive guide to colors, typography, and components for the FireForge brand.
            Use this reference to maintain consistency across all design decisions.
          </p>
        </div>

        {/* Logo Assets */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Logo Assets</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Full Logos */}
            <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Full Logos</h3>
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gunmetal-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-4">
                    <Logo darkMode={false} variant="full" size="large" />
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Light Mode</div>
                      <div className={`text-sm ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>Use on light backgrounds</div>
                    </div>
                  </div>
                  <span className={`text-xs font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>FireForge Logo on transparent.svg</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gunmetal-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Logo darkMode={true} variant="full" size="large" />
                    <div>
                      <div className="font-medium text-white">Dark Mode</div>
                      <div className="text-sm text-secondary-300">Use on dark backgrounds</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-secondary-300">FireForge Logo orange on transparent.svg</span>
                </div>
              </div>
            </div>

            {/* Symbol & Icons */}
            <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Symbol & Icons</h3>
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gunmetal-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-4">
                    <Logo darkMode={darkMode} variant="symbol" size="large" />
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Symbol Logo</div>
                      <div className={`text-sm ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>Works on any background</div>
                    </div>
                  </div>
                  <span className={`text-xs font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>Symbol transparent.svg</span>
                </div>
                <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gunmetal-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-4">
                    <TriangleIcon size="large" />
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Triangle Icon</div>
                      <div className={`text-sm ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>Fire element, decorative use</div>
                    </div>
                  </div>
                  <span className={`text-xs font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>Triangle transparent.svg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className={`mt-8 rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Logo Usage Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Do's</h4>
                <ul className={`space-y-2 ${darkMode ? 'text-gunmetal-300' : 'text-secondary-700'}`}>
                  <li>• Use the appropriate logo variant for light/dark backgrounds</li>
                  <li>• Maintain clear space around the logo (minimum 1x logo height)</li>
                  <li>• Use the symbol logo for small sizes or square formats</li>
                  <li>• Use the triangle icon for decorative fire elements</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Don'ts</h4>
                <ul className={`space-y-2 ${darkMode ? 'text-gunmetal-300' : 'text-secondary-700'}`}>
                  <li>• Don't stretch or distort the logo proportions</li>
                  <li>• Don't use low contrast combinations</li>
                  <li>• Don't add effects, shadows, or outlines</li>
                  <li>• Don't use emoji fire icons instead of the triangle</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palettes */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Color Palettes</h2>
          <div className="space-y-12">
            {colorPalettes.map((palette) => (
              <div key={palette.name} className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
                <div className="mb-6">
                  <h3 className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>{palette.name}</h3>
                  <p className={`${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>{palette.description}</p>
                </div>
                <div className="grid grid-cols-11 gap-2">
                  {palette.colors.map((color) => (
                    <div key={color.name} className="text-center">
                      <div className={`${color.class} h-16 w-full rounded-lg border mb-2 ${darkMode ? 'border-gunmetal-600' : 'border-gray-200'}`}></div>
                      <div className={`text-xs font-medium ${darkMode ? 'text-gunmetal-300' : 'text-gunmetal-700'}`}>{color.name}</div>
                      <div className={`text-xs font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>{color.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Typography Scale</h2>
          <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
            <div className="space-y-6">
              {typographyExamples.map((type) => (
                <div key={type.label} className={`flex items-center justify-between border-b pb-4 ${darkMode ? 'border-gunmetal-700' : 'border-secondary-100'}`}>
                  <div className="flex items-center space-x-8">
                    <span className={`text-sm font-mono w-12 ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>{type.label}</span>
                    <span className={`${type.size} font-semibold ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>{type.example}</span>
                  </div>
                  <span className={`text-sm font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>{type.size}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Font Weights</h2>
          <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-light mb-2 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Light</div>
                <div className={`text-sm font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>font-light</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-normal mb-2 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Normal</div>
                <div className={`text-sm font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>font-normal</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Semibold</div>
                <div className={`text-sm font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>font-semibold</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Bold</div>
                <div className={`text-sm font-mono ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>font-bold</div>
              </div>
            </div>
          </div>
        </section>

        {/* Button Components */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Button Styles</h2>
          <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {componentExamples.map((example) => (
                <div key={example.name} className="text-center">
                  <div className="mb-4">{example.component}</div>
                  <div className={`text-sm ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>{example.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Card Components */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Card Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardExamples.map((example) => (
              <div key={example.name}>
                {example.component}
                <div className="text-center mt-4">
                  <div className={`text-sm ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>{example.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Usage Guidelines</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Color Usage</h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gunmetal-300' : 'text-secondary-700'}`}>
                <li><strong>Primary (Flame):</strong> Main CTAs, brand elements, navigation highlights</li>
                <li><strong>Secondary (Alloy Steel):</strong> Text, subtle backgrounds, form elements</li>
                <li><strong>Tertiary (Forge Crimson):</strong> Accent elements, warnings, secondary CTAs</li>
                <li><strong>Gunmetal Gray:</strong> Primary text, dark backgrounds, professional elements</li>
                <li><strong>Molten Orange:</strong> Energy elements, hover states, vibrant accents</li>
              </ul>
            </div>
            <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Typography Guidelines</h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gunmetal-300' : 'text-secondary-700'}`}>
                <li><strong>Headlines:</strong> Use 4xl-6xl for hero sections and main titles</li>
                <li><strong>Headings:</strong> Use 2xl-3xl for section headers and subheadings</li>
                <li><strong>Body Text:</strong> Use base-lg for readable content</li>
                <li><strong>Captions:</strong> Use sm-xs for metadata and fine print</li>
                <li><strong>Emphasis:</strong> Use semibold for important text, bold sparingly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Spacing and Layout */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gunmetal-800'}`}>Spacing Scale</h2>
          <div className={`rounded-lg p-8 shadow-sm border ${darkMode ? 'bg-gunmetal-900 border-gunmetal-700' : 'bg-white border-secondary-200'}`}>
            <div className="space-y-4">
              {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32].map((size) => (
                <div key={size} className="flex items-center space-x-4">
                  <span className={`text-sm font-mono w-12 ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>{size}</span>
                  <div className={`bg-primary-500 h-4`} style={{ width: `${size * 4}px` }}></div>
                  <span className={`text-sm ${darkMode ? 'text-gunmetal-300' : 'text-secondary-600'}`}>{size * 4}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className={`text-center text-sm ${darkMode ? 'text-gunmetal-400' : 'text-secondary-500'}`}>
          <p>FireForge Design System • Use this reference to maintain brand consistency</p>
        </div>
      </div>
    </div>
  );
};

export default DesignReference; 