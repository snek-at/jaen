// import {StarIcon} from '@chakra-ui/icons'
// import {Box, Image, Badge} from '@chakra-ui/react'
import {blocks, fields} from '@snek-at/jaen-pages'

// import * as React from 'react'

// type AirbnbBlockType = {
//   beds: number
//   baths: number
//   title: string
//   formattedPrice: string
//   reviewCount: number
// }

// export const AirbnbBlock: blocks.BC<AirbnbBlockType> = ({
//   values,
//   streamFieldWidth
// }) => {
//   return (
//     <Box maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
//       <Image
//         src={'https://bit.ly/2Z4KKcF'}
//         alt={'Rear view of modern home with pool'}
//       />

//       <Box p="6">
//         <Box d="flex" alignItems="baseline">
//           <Badge borderRadius="full" px="2" colorScheme="teal">
//             New
//           </Badge>
//           <Box
//             color="gray.500"
//             fontWeight="semibold"
//             letterSpacing="wide"
//             fontSize="xs"
//             textTransform="uppercase"
//             ml="2">
//             {values.beds} beds &bull; {values.baths} baths
//           </Box>
//         </Box>

//         <Box
//           mt="1"
//           fontWeight="semibold"
//           as="h4"
//           lineHeight="tight"
//           isTruncated>
//           {values.title}
//         </Box>

//         <Box>
//           {values.formattedPrice}
//           <Box as="span" color="gray.600" fontSize="sm">
//             / wk
//           </Box>
//         </Box>

//         <Box d="flex" mt="2" alignItems="center">
//           {Array(5)
//             .fill('')
//             .map((_, i) => (
//               <StarIcon key={i} color={i < 4 ? 'teal.500' : 'gray.300'} />
//             ))}
//           <Box as="span" ml="2" color="gray.600" fontSize="sm">
//             {values.reviewCount} reviews
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// AirbnbBlock.BlockType = 'AirbnbBlock'
// AirbnbBlock.BlockFields = {
//   beds: fields.TextField,
//   baths: fields.TextField,
//   title: fields.TextField,
//   formattedPrice: fields.TextField,
//   reviewCount: fields.TextField
// }
// AirbnbBlock.defaultValues = {
//   beds: 3,
//   baths: 2,
//   title: 'Modern home in city center in the heart of historic Los Angeles',
//   formattedPrice: '$1,900.00',
//   reviewCount: 34
// }

// export default AirbnbBlock
