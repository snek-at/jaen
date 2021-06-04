import React from 'react'

export type SkeletonPageProps = {typeName: string; slug: string}

export class SkeletonPage extends React.Component<SkeletonPageProps, {}> {
  skeletonProps: SkeletonPageProps

  constructor(props: SkeletonPageProps) {
    super(props)
    const {typeName, slug} = props
    this.skeletonProps = {typeName, slug}
  }
}
