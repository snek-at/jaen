const readTemplate = (template: any, data: any = {items: {}}) => {
  for (const [key, value] of Object.entries(template)) {
    // eslint-disable-next-line no-param-reassign
    data.items[key] = {
      index: key,
      canMove: true,
      isFolder: value !== null,
      children:
        value !== null
          ? Object.keys(value as Record<string, unknown>)
          : undefined,
      data: key,
      canRename: true
    }

    if (value !== null) {
      readTemplate(value, data)
    }
  }
  return data
}

const cmsPages = {
  root: {
    home: {
      'about-us': null,
      contact: null,
      services: {
        'web-development': null,
        'mobile-development': null,
        design: null,
        marketing: null
      },
      blog: {
        'blog-post-1': null,
        'blog-post-2': null,
        'blog-post-3': null,
        'blog-post-4': null,
        'blog-post-5': null,
        'blog-post-6': null,
        'blog-post-7': null,
        'blog-post-8': null,
        'blog-post-9': null,
        'blog-post-10': null,
        'blog-post-11': null,
        'blog-post-12': null,
        'blog-post-13': null,
        'blog-post-14': null,
        'blog-post-15': null,
        'blog-post-16': null,
        'blog-post-17': null,
        'blog-post-18': null,
        'blog-post-19': null,
        'blog-post-20': null
      },
      faq: null,
      'terms-and-conditions': null,
      'privacy-policy': null
    }
  }
}

export const cmsTree = readTemplate(cmsPages)
