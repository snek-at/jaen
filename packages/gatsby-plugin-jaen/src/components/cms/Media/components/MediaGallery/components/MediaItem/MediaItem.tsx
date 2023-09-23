import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Skeleton,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import {MediaNode} from '@atsnek/jaen'
import {
  MouseEventHandler,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

export interface MediaItemProps {
  node: MediaNode

  isLast: boolean

  isSelected?: boolean
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  onDoubleClick?: MouseEventHandler<HTMLDivElement> | undefined
  onUpdateDescription?: (description: string) => void
}

export const MediaItem: React.FC<MediaItemProps> = ({
  node,
  isLast,
  isSelected,
  onClick,
  onDoubleClick,
  onUpdateDescription
}) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    // when the image is in viewport for at least 500ms, we load the full image
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => {
              imageRef.current?.setAttribute('src', node.url)
              // set loading state to false when image is loaded
              imageRef.current?.addEventListener('load', () => {
                setIsLoaded(true)
              })
            }, 500)
          } else {
            clearTimeout(timeoutId)
          }
        })
      },
      {threshold: 1}
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [imageRef])

  return (
    <Stack key={node.id} id={node.id} justifyContent="center" onClick={onClick}>
      <AspectRatio
        ratio={node.width / node.height}
        onDoubleClick={onDoubleClick}
        objectFit="contain"
        borderColor="border.emphasized"
        borderWidth="1px"
        {...(isSelected && {
          outline: '2px solid',
          outlineColor: 'brand.500',
          outlineOffset: '3px',
          borderRadius: 'lg'
        })}>
        <Image
          ref={imageRef}
          src={node.preview?.url}
          alt={node.description}
          id={isLast ? 'last-media-item' : undefined}
        />
      </AspectRatio>

      <InputGroup size="xs">
        {!isLoaded && (
          <InputLeftAddon pointerEvents="none">
            <Spinner size="xs" />
          </InputLeftAddon>
        )}

        <Input
          key={node?.description}
          textAlign="center"
          fontSize="xs"
          fontWeight="bold"
          defaultValue={node.description}
          onBlur={e => {
            onUpdateDescription?.(e.target.value)
          }}
        />
        <InputRightAddon w="4.5trem">
          <Text fontSize="xs" fontWeight="bold">
            {node.width}x{node.height}
          </Text>
        </InputRightAddon>
      </InputGroup>
    </Stack>
  )
}
