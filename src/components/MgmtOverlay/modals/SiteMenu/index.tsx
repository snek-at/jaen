/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {useDispatch, useSelector} from 'react-redux'
import {useCMSContext} from '~/contexts/context'
import {AppDispatch} from '~/store'

import Explorer from '~/components/Explorer'
import CleanModal from '~/components/modals/Clean'

import {registerPage, unregisterPage} from '~/store/actions/cms'
import {pageTreeSelector} from '~/store/selectors/cms'

const SiteMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {registeredPages, pagesDetails, rootPageSlug} = useCMSContext()

  const {treeData, indexKeyRefs, childPageTypeNamesKeyRefs} = useSelector(
    pageTreeSelector(registeredPages)
  )

  return (
    <CleanModal>
      {treeData && indexKeyRefs && (
        <Explorer
          onNodeSave={node => {
            const {isDraft, slug} = node
            if (isDraft && slug) {
              const page = pagesDetails[slug]
              if (page && !page.deleted) {
                return false
              }
            }
            dispatch(registerPage({page: node, rootPageSlug, pagesDetails}))
            return true
          }}
          onNodeDelete={node =>
            dispatch(unregisterPage({page: node, rootPageSlug, pagesDetails}))
          }
          indexTree={treeData}
          indexKeyRefs={indexKeyRefs}
          childPageTypeNamesKeyRefs={childPageTypeNamesKeyRefs}
        />
      )}
    </CleanModal>
  )
}

export default SiteMenu
