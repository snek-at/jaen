import {useLocation} from '@reach/router'
import {navigate, PageProps} from 'gatsby'

import {PageConfig, useNotificationsContext} from '@atsnek/jaen'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {FaArrowRight, FaEdit, FaTrash} from 'react-icons/fa'
import {Pages} from '../../../components/cms/Pages/Pages'
import {
  CMSManagement,
  useCMSManagement
} from '../../../connectors/cms-management'
import {set} from 'react-hook-form'

const PagesPage: React.FC = () => {
  const {toast, prompt, confirm} = useNotificationsContext()
  const manager = useCMSManagement()

  const [currentPageId, setCurrentPageId] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0)
  }, [currentPageId])

  const location = useLocation()

  useEffect(() => {
    try {
      const pageId = atob(location.hash.replace('#', ''))

      setCurrentPageId(pageId || undefined)
    } catch (e) {
      setCurrentPageId(undefined)
    }
  }, [location.hash])

  const currentPage = useMemo(() => {
    try {
      return manager.page(currentPageId)
    } catch {
      // Clear location hash if page is not found

      return manager.page()
    }
  }, [currentPageId, manager.page])

  // useEffect(() => {
  //  // check if location is
  // }, [currentPage, location.hash])

  const children = useMemo(() => {
    const pages = manager.pages(currentPage.id)

    return pages.map(p => {
      return {
        id: p.id,
        title: p.jaenPageMetadata.title || 'No title',
        description: p.jaenPageMetadata.description || 'No description',
        createdAt: p.createdAt,
        modifiedAt: p.modifiedAt
        // author: p.jaenPageMetadata.blogPost?.author
      }
    })
  }, [currentPage.id, manager.pages])

  const handleTreeSelect = useCallback(
    (id: string) => {
      setCurrentPageId(id || undefined)

      if (id) {
        navigate(`#${btoa(id)}`)
      } else {
        navigate('#')
      }
    },
    [manager]
  )

  // const parentPages = useMemo(() => {
  //   if (!currentPage.parentPage?.id) return {}

  //   const parentPage = manager.page(currentPage.parentPage.id)

  //   return {
  //     [currentPage.parentPage.id]: {
  //       label: parentPage.jaenPageMetadata?.title || parentPage.slug,
  //       templates: manager
  //         .templatesForPage(currentPage.parentPage.id)
  //         .reduce((acc, template) => {
  //           acc[template.id] = {
  //             label: template.label
  //           }

  //           return acc
  //         }, {} as {[key: string]: {label: string}})
  //     }
  //   }
  // }, [currentPage.parentPage?.id, manager])

  const parentPages = useMemo(() => {
    const pages = manager.pages()

    // use the manager.tree to blacklist all children of current page
    const blacklist: string[] = []

    const recursiveBlacklist = (pageId?: string) => {
      if (!pageId) return

      const page = manager.page(pageId)

      if (!page) return

      for (const child of page.childPages) {
        blacklist.push(child.id)
        recursiveBlacklist(child.id)
      }
    }

    recursiveBlacklist(currentPage.id)

    const _parentPages: {
      [pageId: string]: {
        label: string
        templates: {
          [templateId: string]: {
            label: string
          }
        }
      }
    } = {}

    for (const page of pages) {
      // skip if page is current page
      if (page.id === currentPage.id) {
        continue
      }

      // skip if page is in blacklist
      if (blacklist.includes(page.id)) {
        continue
      }

      const pageTemplates = manager.templatesForPage(page.id)

      if (pageTemplates.length > 0) {
        // skip if pageTemplates do not contain current page template
        if (
          !pageTemplates.find(template => template.id === currentPage.template)
        ) {
          continue
        }

        _parentPages[page.id] = {
          label: page.jaenPageMetadata.title || page.slug,
          templates: pageTemplates.reduce((acc, template) => {
            acc[template.id] = {
              label: template.label
            }

            return acc
          }, {} as {[key: string]: {label: string}})
        }
      }
    }

    return _parentPages
  }, [manager, currentPage])

  return (
    <Pages
      pageId={currentPage.id}
      form={{
        // Always disable slug because the slug can only be changed in the danger zone
        disableSlug: true,
        values: {
          title: currentPage.jaenPageMetadata?.title || 'No title',
          image: {
            src: currentPage.jaenPageMetadata?.image
          },
          slug: currentPage.slug,
          template: currentPage.template,
          description:
            currentPage.jaenPageMetadata.description || 'No description',
          parentPage: currentPage.parentPage?.id,
          isExcludedFromIndex: currentPage.excludedFromIndex,
          blogPost: currentPage.jaenPageMetadata.blogPost
        },
        parentPages,
        onSubmit: data => {
          manager.updatePage(currentPage.id, {
            slug: data.slug,
            template: data.template,
            parentPage: {
              id: data.parentPage
            },
            excludedFromIndex: data.isExcludedFromIndex,
            jaenPageMetadata: {
              title: data.title,
              image: data.image?.src,
              description: data.description,
              blogPost: data.blogPost
            }
          })

          toast({
            title: 'Page updated',
            description: `Page ${data.title} has been updated`,
            status: 'success'
          })
        },
        path: manager.pagePath(currentPage.id),
        jaenTemplates: manager.templates
      }}
      children={children}
      tree={manager.tree}
      onTreeSelect={handleTreeSelect}
      disableNewButton={manager.templatesForPage(currentPage.id).length === 0}
      dangerZoneActions={[
        {
          title: 'Move page',
          description: 'This will move the page and all its subpages.',
          buttonText: 'Move page',
          icon: FaArrowRight,
          onClick: async () => {
            const options = Object.entries(parentPages).map(
              ([pageId, page]) => {
                return {
                  id: pageId,
                  label: page.label
                }
              }
            )

            const parentPageId = await prompt(
              {
                title: 'Move page',
                message: 'Please select a new parent page.',
                confirmText: 'Move',
                cancelText: 'Cancel',
                options
              },
              currentPage.parentPage?.id
            )

            if (parentPageId) {
              manager.updatePage(currentPage.id, {
                parentPage: {
                  id: parentPageId
                }
              })

              toast({
                title: 'Page moved',
                description: `Page ${currentPage.slug} has been moved`,
                status: 'success'
              })
            }
          },
          isDisabled: !currentPage.template
        },
        {
          title: 'Update slug',
          description:
            'This will rename the slug and thus affects the path of the page and all its subpages.',
          buttonText: 'Rename slug',
          icon: FaEdit,
          onClick: async () => {
            const slug = await prompt({
              title: 'Rename slug',
              message: 'Please enter a new slug. This will affect the path.',
              confirmText: 'Rename',
              cancelText: 'Cancel',
              placeholder: currentPage.slug
            })

            if (slug) {
              manager.updatePage(currentPage.id, {
                slug
              })

              toast({
                title: 'Slug updated',
                description: `Slug has been updated to ${slug}`,
                status: 'success'
              })
            }
          },
          isDisabled: !currentPage.template
        },
        {
          title: 'Delete this page',
          description: 'This will delete the page and all its subpages.',
          buttonText: 'Delete page',
          icon: FaTrash,
          onClick: async () => {
            const ok = await confirm({
              title: 'Delete page',
              message:
                'Are you sure you want to delete this page and all its subpages?'
            })

            if (ok) {
              manager.removePage(currentPage.id)

              toast({
                title: 'Page deleted',
                description: `Page ${currentPage.slug} has been deleted`,
                status: 'success'
              })
            }

            setCurrentPageId(currentPage.parentPage?.id)
          },
          isDisabled: !currentPage.template
        }
      ]}
    />
  )
}

const Page: React.FC<PageProps> = () => {
  return (
    <CMSManagement>
      <PagesPage />
    </CMSManagement>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Jaen CMS | Pages',
  icon: 'FaSitemap',

  menu: {
    label: 'Pages',
    type: 'app',
    group: 'cms',
    order: 200
  },
  breadcrumbs: [
    {
      label: 'CMS',
      path: '/cms/'
    },
    {
      label: 'Pages',
      path: '/cms/pages/'
    }
  ],
  withoutJaenFrameStickyHeader: true,
  auth: {
    isAdminRequired: true
  },
  layout: {
    name: 'jaen'
  }
}

export {Head} from '@atsnek/jaen'
