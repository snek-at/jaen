import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button
} from '@chakra-ui/react'
import React from 'react'

export const ErrorFallback: React.FC<{
  error: Error
  resetErrorBoundary: () => void
}> = ({error, resetErrorBoundary}) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        <pre>{error.message}</pre>

        <Button onClick={resetErrorBoundary}>Try again</Button>
      </AlertDescription>
    </Alert>
  )
}
