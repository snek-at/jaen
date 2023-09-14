import {snekResourceId, useNotificationsContext} from '@atsnek/jaen'
import {sq} from '@snek-functions/origin'

import React, {useCallback, useEffect, useState} from 'react'

import {Mutation} from '@snek-functions/origin/dist/schema.generated'

type UserCreate = Parameters<Mutation['userRegister']>[0]
type UserUpdate = Parameters<Mutation['userUpdate']>[0]

export const useUser = (userId: string) => {
  const {toast} = useNotificationsContext()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = React.useState<{
    id: string
    primaryEmailAddress: string
    username: string
    createdAt: string
    details?: {
      firstName?: string
      lastName?: string
    }
    isActive: boolean
    isAdmin: boolean
  }>()

  const checkErrors = (errors: Array<{message: string}>) => {
    if (errors?.length > 0) {
      toast({
        title: 'Error',
        description: errors[0]?.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }

    return !errors || errors.length === 0
  }

  const fetchUser = useCallback(async () => {
    const [user, errors] = await sq.query(Query => {
      const user = Query.user({id: userId})

      return {
        id: user.id,
        primaryEmailAddress: user.primaryEmailAddress,
        username: user.username,
        createdAt: user.createdAt,
        details: {
          firstName: user.details?.firstName || undefined,
          lastName: user.details?.lastName || undefined
        },
        isActive: user.isActive,
        isAdmin: user.isAdmin
      }
    })

    const ok = checkErrors(errors)

    setUser(user)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchUser()
  }, [])

  return {
    user,
    isLoading
  }
}

export const useUsers = () => {
  const {toast} = useNotificationsContext()
  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = React.useState<
    {
      id: string
      primaryEmailAddress: string
      username: string
      createdAt: string
      details?: {
        firstName?: string
        lastName?: string
      }
      isActive: boolean
      isAdmin: boolean
    }[]
  >([])

  const checkErrors = (errors: Array<{message: string}>) => {
    if (errors?.length > 0) {
      toast({
        title: 'Error',
        description: errors[0]?.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }

    return !errors || errors.length === 0
  }

  const fetchUsers = useCallback(async () => {
    const [users, errors] = await sq.query(Query =>
      Query.allUser({resourceId: snekResourceId}).map(user => ({
        id: user?.id,
        primaryEmailAddress: user?.primaryEmailAddress,
        username: user?.username,
        createdAt: user?.createdAt,
        details: {
          firstName: user?.details?.firstName || undefined,
          lastName: user?.details?.lastName || undefined
        },
        isActive: user?.isActive,
        isAdmin: user?.isAdmin
      }))
    )

    const ok = checkErrors(errors)

    setUsers(users as any)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async (values: UserCreate['values']) => {
    const [newUser, errors] = await sq.mutate(Mutation => {
      const user = Mutation.userRegister({
        resourceId: snekResourceId,
        values,
        skipEmailVerification: true
      })?.user

      return {
        id: user?.id,
        primaryEmailAddress: user?.primaryEmailAddress,
        username: user?.username,
        createdAt: user?.createdAt,
        details: {
          firstName: user?.details?.firstName || undefined,
          lastName: user?.details?.lastName || undefined
        },
        isActive: user?.isActive,
        isAdmin: user?.isAdmin
      }
    })

    const ok = checkErrors(errors)

    if (ok) {
      setUsers([...users, newUser] as any)

      toast({
        title: 'Success',
        description: 'User created',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }

    return ok
  }

  const updateUser = async (
    id: UserUpdate['id'],
    values: UserUpdate['values']
  ) => {
    const [updatedUser, errors] = await sq.mutate(Mutation => {
      const user = Mutation.userUpdate({
        id,
        values
      })

      return {
        id: user?.id,
        primaryEmailAddress: user?.primaryEmailAddress,
        username: user?.username,
        createdAt: user?.createdAt,
        details: {
          firstName: user?.details?.firstName || undefined,
          lastName: user?.details?.lastName || undefined
        },
        isActive: user?.isActive,
        isAdmin: user?.isAdmin
      }
    })

    const ok = checkErrors(errors)

    if (ok) {
      setUsers(users.map(u => (u.id === id ? updatedUser : u)) as any)
    }

    return ok
  }

  const deleteUser = async (userId: string) => {
    const [deletedUser, errors] = await sq.mutate(Mutation =>
      Mutation.userDelete({id: userId})
    )

    const ok = checkErrors(errors)

    if (ok) {
      setUsers(users.filter(u => u.id !== userId))
    }

    return ok
  }

  return {
    users,
    addUser,
    updateUser,
    deleteUser,

    isLoading
  }
}
