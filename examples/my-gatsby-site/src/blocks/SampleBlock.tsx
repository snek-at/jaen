import {Badge, HStack, VStack} from '@chakra-ui/layout'
import {Box} from '@chakra-ui/react'
import {fields} from '@snek-at/jaen-pages'
import type {JaenBlock} from '@snek-at/jaen-pages'

const SampleBlock: JaenBlock = () => {
  //   return <fields.TextField fieldName="sample" initValue="<p>test</p>" />

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="whitesmoke">
      {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
      <fields.ImageField
        fieldName="image1"
        initValue={{src: 'https://via.placeholder.com/150', alt: '', title: ''}}
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2">
            <HStack spacing="24px">
              <Box w="100px">
                <fields.TextField fieldName="beds" initValue="<p>1 bed</p>" />
              </Box>
              <Box>&bull;</Box>
              <Box w="100px">
                <fields.TextField fieldName="baths" initValue="<p>1 bath</p>" />
              </Box>
            </HStack>
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {/* {property.title} */}
          <fields.TextField
            fieldName="title"
            initValue="<p>Modern home in city center in the heart of historic Los Angeles</p>"
          />
        </Box>

        <Box>
          {/* {property.formattedPrice} */}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {/* {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))} */}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {/* {property.reviewCount} reviews */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

SampleBlock.BlockName = 'SampleBlock'
SampleBlock.BlockDisplayName = 'SampleBlock'

export default SampleBlock
