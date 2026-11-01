import type { Config } from 'tailwindcss';
const config:Config={content:['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],theme:{extend:{colors:{saffron:'#F58220',green:'#1B7F3B',blue:'#1E88E5',ink:'#1F2937'},fontFamily:{sans:['var(--font-body)'],display:['var(--font-display)']}}},plugins:[]};export default config;
