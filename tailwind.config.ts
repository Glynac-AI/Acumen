// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Segoe UI', 'Inter', 'sans-serif'],
				mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					border: "hsl(var(--sidebar-border))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					ring: "hsl(var(--sidebar-ring))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Original color definitions - maintain for backward compatibility
				ph: {
					DEFAULT: "#4F6BFF", // Updated to match our new blue
					light: "#EBF5FF",
					dark: "#3D5BF6",
				},
				// New refined color palette 
				acumen: {
					dark: "#0A2540",       // Deep blue - primary background
					medium: "#0c2d4d",     // Medium blue - secondary background
					accent: "#4F6BFF",     // Vibrant blue - accent color
					light: "#F0F4F9",      // Light blue-gray - text on dark backgrounds
					secondary: "#6B7280",  // Neutral gray - secondary text
					success: "#10B981",    // Green - success elements
					warning: "#F59E0B",    // Amber - warning elements
					error: "#EF4444",      // Red - error elements
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				"fade-up": {
					from: { opacity: 0, transform: "translateY(20px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				"fade-down": {
					from: { opacity: 0, transform: "translateY(-20px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				"fade-in": {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-light": {
					"0%, 100%": { opacity: 0.6 },
					"50%": { opacity: 0.8 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-up": "fade-up 0.6s ease-out forwards",
				"fade-down": "fade-down 0.6s ease-out forwards",
				"fade-in": "fade-in 0.6s ease-out forwards",
				"float": "float 3s ease-in-out infinite",
				"pulse-light": "pulse-light 4s ease-in-out infinite",
			},
			boxShadow: {
				'soft-xl': '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
				'soft-2xl': '0 20px 30px 0 rgba(0, 0, 0, 0.08)',
				'accent': '0 0 15px 2px rgba(79, 107, 255, 0.25)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'inherit',
						a: {
							color: '#4F6BFF',
							textDecoration: 'none',
							fontWeight: '500',
							'&:hover': {
								color: '#3D5BF6',
							},
						},
						h1: {
							fontWeight: '300',
							letterSpacing: '-0.025em',
							color: 'inherit',
						},
						h2: {
							fontWeight: '400',
							letterSpacing: '-0.025em',
							color: 'inherit',
						},
						h3: {
							fontWeight: '500',
							color: 'inherit',
						},
						h4: {
							fontWeight: '500',
							color: 'inherit',
						},
						p: {
							lineHeight: '1.75',
						},
						code: {
							fontWeight: '500',
							color: '#4F6BFF',
						},
					},
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}