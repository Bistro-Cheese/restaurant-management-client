/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            },
            fontFamily: {
                default: ['Nunito', 'sans-serif'],
                primary: ['"Playfair Display"', 'serif']
            },
            backgroundSize: {
                'size-200': 'var(--size-200)'
            },
            backgroundPosition: {
                'pos-0': 'var(--pos-0)',
                'pos-100': 'var(--pos-100)'
            },
            backgroundImage: {
                'gradient-background':
                    'linear-gradient(180deg, rgba(245,244,227,1) 20%, rgba(239,235,119,1) 75%)',
                'gradient-primary':
                    'linear-gradient(135deg, rgba(255,220,46,1) 60%, rgba(249,192,20,1) 85%, rgba(246,175,4,1) 100%)',
                'gradient-destructive':
                    'linear-gradient(135deg, rgba(255,65,34,1) 60%, rgba(237,53,26,1) 85%, rgba(198,26,9,1) 100%)'
            },
            dropShadow: {
                primary: [
                    '0 25px 25px rgba(255, 255, 255, 0.45)',
                    '0 45px 45px rgba(255, 255, 255, 0.25)'
                ]
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
};
