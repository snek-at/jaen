const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Jason’s Blog Theme — It’s SICK',
    description: `
      This is a blog theme. The description will be showed in SEO results on pages
      without their own descriptions.
    `,
    siteUrl: 'https://example.com',
    image: 'https://lengstorf.com/images/jason-lengstorf.jpg',
    author: {
      name: 'Your Name',
      minibio: `
        This bio is shown at the bottom of each blog post. It supports
        <strong>custom HTML</strong> if you’re into that sort of thing.
      `
    },
    organization: {
      name: 'Example, Inc.',
      url: 'https://example.com',
      logo: 'https://lengstorf.com/android-chrome-512x512.png'
    },
    social: {
      twitter: '@jlengstorf',
      fbAppID: ''
    },
    categories: [
      {
        slug: 'test',
        name: 'Test Category'
      }
    ]
  },
  plugins: [
    '@snek-at/jaen',
    {
      resolve: '@snek-at/jaen-pages',
      options: {
        templates: {
          SamplePage: path.resolve('src/templates/SamplePage.tsx')
        }
      }
    }
  ]
}
