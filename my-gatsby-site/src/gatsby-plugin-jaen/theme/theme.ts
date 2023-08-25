import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
  baseTheme
} from '@chakra-ui/react'

export const colors = {
  gray: {
    100: '#f6f8fa',
    500: '#E6E6E6',
    700: '#606060'
  },
  red: {
    500: '#E3000F',
    600: '#E3000F'
  },
  jaen: {
    300: '#D737CC',
    500: '#AF23A5'
  },
  black: {
    500: '#333333'
  },
  brand: {
    ...baseTheme.colors.red,
    500: '#E3000F',
    600: '#E3000F'
  }
}

export const fonts = {
  // body: `'Poppins', sans-serif !important`,
  // heading: `'Poppins', sans-serif !important`,
  font_RB: `'Red Buttery', sans-serif !important`,
  font_Pro: `'Proyale', sans-serif !important`
}
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme(
  {
    radii: {
      none: '0 !important',
      sm: '.1875rem !important',
      base: '.3125rem !important',
      md: '.625rem !important',
      lg: '1.25rem !important',
      xl: '1.875rem !important',
      '2xl': '2.5rem !important',
      '3xl': '3.125rem !important',
      full: '625rem !important'
    },

    fontSizes: {
      xs: '0.75rem !important', // 12px
      sm: '0.938rem !important', // 15px
      md: '1.25rem !important', // 20px
      lg: '1.5rem !important', // 24px
      xl: '1.875rem !important', // 30px
      '2xl': '2.5rem !important', // 40px
      '3xl': '3.125rem !important', // 50px
      '4xl': '3.75rem !important', // 60px
      '5xl': '4.375rem !important', // 70px
      '6xl': '5rem !important', // 80px
      '7xl': '5.625rem !important', // 90px
      '8xl': '6.25rem !important', // 100px
      '9xl': '6.875rem !important', // 110px
      '10xl': '7.5rem !important' // 120px
    },

    shadows: {
      lightdown: '0px 4px 6px -4px rgba(0, 0, 0, 0.10) !important',
      light: '0px 4px 10px rgba(0, 0, 0, 0.10) !important',
      dark: '0px 4px 10px rgba(0, 0, 0, 0.25) !important',
      darker: '0px 4px 10px rgba(0, 0, 0, 0.50) !important'
    },
    components: {
      Tag: {
        variants: {
          normal: {
            container: {
              bg: '#FCE5E7',
              color: 'red.500',
              borderRadius: 'full',
              px: {base: '2', md: '4'},
              py: '1',
              fontSize: {base: 'xs', md: 'sm'},
              span: {
                color: 'green'
              }
            }
          },
          white: {
            container: {
              bg: 'white',
              filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25))',
              color: 'red.500',
              borderRadius: '.625rem',
              px: {base: '4', md: '4'},
              py: '1',
              fontSize: {base: 'xs', md: 'sm'},
              span: {
                color: 'green'
              }
            }
          }
        }
      },
      Button: {
        // The styles all button have in common
        baseStyle: {
          borderRadius: 'full',
          fontSize: '1.375rem',
          fontWeight: 'medium'
        },
        // Two sizes: sm and md
        sizes: {
          xs: {
            fontSize: 'sm',
            px: 5,
            py: 4
          },
          sm: {
            fontSize: 'sm',
            px: 5,
            py: 5
          },
          md: {
            fontSize: 'md',
            px: 8,
            py: 6
          },
          lg: {
            fontSize: '1.375rem',
            px: 8,
            py: 4
          }
        },
        // Two variants: outline and solid
        variants: {
          outline: {
            // borderWidth: { base: '2px', md: '3px' },
            outline: 'none',
            border: 'none',
            boxShadow: {
              base: '0px 0px 0px 2px #E3000F inset'
              // md: '0px 0px 0px 3px #E3000F inset',
            }
          }
        }
      },

      Heading: {
        sizes: {
          // Heading
          // Example h5030 =  h = heading, 50px = max-font-size 30px = min-font-size
          h6020: {
            fontSize: {base: 'md', md: 'xl', lg: '2xl', xl: '4xl'}
          },
          h5030: {
            fontSize: {base: 'xl', lg: '2xl', xl: '3xl'}
          },
          h5020: {
            fontSize: {base: 'md', md: 'xl', lg: '2xl', xl: '3xl'}
          },
          h4015: {
            fontSize: {base: 'sm', md: 'lg', lg: 'xl', xl: '2xl'}
          },
          h4020: {
            fontSize: {base: 'md', md: 'lg', lg: 'xl', xl: '2xl'}
          },
          h3015: {
            fontSize: {base: 'sm', md: 'lg', lg: 'xl'}
          },
          h2418: {
            fontSize: {base: '1.125rem', md: 'md', lg: 'lg'}
          },
          h8020: {
            fontSize: {
              base: 'md',
              md: '2xl',
              lg: '4xl',
              xl: '5xl',
              '2xl': '6xl'
            }
          }
        },
        variants: {
          cursive: {
            fontFamily: 'Red Buttery, sans-serif',
            fontWeight: 'normal',
            color: 'red.500'
          },
          light: {
            fontWeight: 'light'
          }
        }
      },

      Text: {
        // The styles all button have in common
        baseStyle: {
          fontSize: 'md'
        },
        // Two sizes: sm and md
        sizes: {
          // Paragraph Text Sizes
          // Example b2015 =  b = body 20px = max-font-size 15px = min-font-size
          b2015: {
            fontSize: {base: 'sm', lg: 'md'}
          },
          b2012: {
            fontSize: {base: 'sm', lg: 'md'}
          },
          b2412: {
            fontSize: {base: 'sm', lg: 'lg'}
          },
          b2415: {
            fontSize: {base: 'sm', lg: 'lg'}
          },

          50: {
            fontSize: {base: 'xl', lg: '2xl', xl: '3xl'}
          },
          60: {
            fontSize: {base: 'xl', lg: '3xl', xl: '4xl'}
          },
          80: {
            fontSize: {
              base: 'xl',
              md: '2xl',
              lg: '4xl',
              xl: '5xl',
              '2xl': '6xl'
            }
          },
          100: {
            fontSize: {base: 'xl', md: '3xl', lg: '7xl', '2xl': '8xl'}
          },
          120: {
            fontSize: {base: 'xl', md: '4xl', lg: '8xl', '2xl': '10xl'},
            lineHeight: {md: '5rem'}
          }
        },

        variants: {
          cursive: {
            fontFamily: 'Red Buttery, sans-serif',
            fontWeight: 'normal',
            color: 'red.500'
          },
          light: {
            fontWeight: 'light'
          }
        }
      },

      Modal: {
        sizes: {
          '2xl': {dialog: {maxWidth: '72rem'}}
        }
      }
    },
    styles: {
      global: {
        'html, body': {
          background: '#f6f8fa !important'
        },
        'i, em': {
          fontFamily: 'Red Buttery, sans-serif',
          fontWeight: 'normal',
          color: 'red.500',
          fontSize: '1.3em'
        }
      }
    },
    config,

    colors,

    fonts
  },
  withDefaultColorScheme({
    colorScheme: 'blue'
  })
)

export default theme
