import React from 'react'

export type SkeletonPageProps = {typeName: string; slug: string}

interface ISkeletonPage {
  PageType: string
  ChildPages: SkeletonPageType[]
}

export type SkeletonPageType = React.ComponentType<SkeletonPageProps> &
  ISkeletonPage

export class SkeletonPage extends React.Component<SkeletonPageProps> {
  // static PageType: string // if the class doesn't have that static field code won't compile

  skeletonProps: SkeletonPageProps

  constructor(props: SkeletonPageProps) {
    super(props)
    const {typeName, slug} = props
    this.skeletonProps = {typeName, slug}
  }
}

// const HomePage: SkeletonPageType = class HomePage extends SkeletonPage {
//   static PageType = 'HomePage'
// }
