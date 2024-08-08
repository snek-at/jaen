import {PageConfig} from '@atsnek/jaen'
import {graphql} from 'gatsby'
import React, {useMemo} from 'react'
import {useForm} from 'react-hook-form'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Underline as UnderlineIcon,
  Unlink
} from 'lucide-react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../components/ui/form'

import {CalendarIcon} from '@radix-ui/react-icons'
import {format} from 'date-fns'
import {z} from 'zod'
import {Button} from '../../../components/ui/button'
import {Calendar} from '../../../components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card'
import {Checkbox} from '../../../components/ui/checkbox'
import {Input} from '../../../components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../components/ui/popover'
import {toast} from '../../../components/ui/use-toast'
import {cn} from '../../../lib/utils'

import {Toggle} from '../../../components/ui/toggle'
import {useNotificationPopupWidget} from '../../../hooks/use-notification-popup-widget'

const extensions = [StarterKit, Link, Underline]

const NotificationPopupSchema = z.object({
  isEnabled: z.boolean(),
  title: z.string(),
  message: z.string(),
  from: z.string(),
  to: z.string()
})

const Page: React.FC = () => {
  const [{data}, write] = useNotificationPopupWidget()

  const id = useMemo(() => {
    // data.id or random id
    return data?.id ?? Math.random().toString(36).substring(7)
  }, [data])

  const form = useForm<z.infer<typeof NotificationPopupSchema>>({
    defaultValues: {
      isEnabled: data?.isEnabled,
      title: data?.title,
      message: data?.message,
      from: data?.from,
      to: data?.to
    }
  })

  const onSubmit = (values: z.infer<typeof NotificationPopupSchema>) => {
    write({
      id: id,
      isEnabled: values.isEnabled,
      title: values.title,
      message: values.message,
      from: values.from,
      to: values.to
    })

    toast({
      title: 'Notification updated',
      description: 'The notification has been updated'
    })
  }

  const editor = useEditor({
    extensions,
    content: form.getValues().message ?? '<p>This is a example message</p>',
    editorProps: {
      attributes: {
        // prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none
        class:
          'focus:outline-none min-h-96 rounded-md border border-input bg-background px-3 py-2 prose max-w-full max-h-full'
      }
    },
    onUpdate: ({editor}) => {
      form.setValue('message', editor.getHTML())
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-4">
            <CardTitle>Notification Popup</CardTitle>
            <CardDescription>
              Configure the notification popup. The notification will be shown
              when the user visits the page.
            </CardDescription>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              const popup = document.getElementById('notification-popup')
              if (popup) {
                popup.click()
              }
            }}>
            Preview
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="News" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of the notification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>

                  {editor && (
                    <div className="flex flex-row space-x-1">
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleBold().run()
                        }
                        disabled={
                          !editor.can().chain().focus().toggleBold().run()
                        }
                        pressed={editor.isActive('bold')}>
                        <Bold className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleItalic().run()
                        }
                        disabled={
                          !editor.can().chain().focus().toggleItalic().run()
                        }
                        pressed={editor.isActive('italic')}>
                        <Italic className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleUnderline().run()
                        }
                        disabled={
                          !editor.can().chain().focus().toggleUnderline().run()
                        }
                        pressed={editor.isActive('underline')}>
                        <UnderlineIcon className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleHeading({level: 1}).run()
                        }
                        disabled={
                          !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleHeading({level: 1})
                            .run()
                        }
                        pressed={editor.isActive('heading', {level: 1})}>
                        <Heading1 className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleHeading({level: 2}).run()
                        }
                        disabled={
                          !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleHeading({level: 2})
                            .run()
                        }
                        pressed={editor.isActive('heading', {level: 2})}>
                        <Heading2 className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleHeading({level: 3}).run()
                        }
                        disabled={
                          !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleHeading({level: 3})
                            .run()
                        }
                        pressed={editor.isActive('heading', {level: 3})}>
                        <Heading3 className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleBulletList().run()
                        }
                        disabled={
                          !editor.can().chain().focus().toggleBulletList().run()
                        }
                        pressed={editor.isActive('bulletList')}>
                        <List className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleOrderedList().run()
                        }
                        disabled={
                          !editor
                            .can()
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                        }
                        pressed={editor.isActive('orderedList')}>
                        <ListOrdered className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() =>
                          editor.chain().focus().toggleBlockquote().run()
                        }
                        disabled={
                          !editor.can().chain().focus().toggleBlockquote().run()
                        }
                        pressed={editor.isActive('blockquote')}>
                        <Quote className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const url = prompt('Enter the URL')
                          if (url) {
                            editor.chain().focus().setLink({href: url}).run()
                          }
                        }}
                        disabled={
                          !editor
                            .can()
                            .chain()
                            .focus()
                            .setLink({href: ''})
                            .run()
                        }
                        pressed={editor.isActive('link')}>
                        <LinkIcon className="h-4 w-4" />
                      </Toggle>
                      <Toggle
                        type="button"
                        variant="outline"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={
                          !editor.can().chain().focus().unsetLink().run()
                        }>
                        <Unlink className="h-4 w-4" />
                      </Toggle>
                    </div>
                  )}

                  <FormControl>
                    <EditorContent editor={editor} className="" />
                  </FormControl>
                  <FormDescription>
                    The message of the notification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="from"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>From</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          form.getValues().to
                            ? date > new Date(form.getValues().to)
                            : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The notification will be shown <b>after</b> this date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>To</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          form.getValues().from
                            ? date < new Date(form.getValues().from)
                            : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The notification will be shown <b>until</b> this date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isEnabled"
              render={({field}) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Show notification popup when the user visits the page
                    </FormLabel>
                    {/* <FormDescription>
                      You can manage your mobile notifications in the{' '}
                      <Link href="/examples/forms">mobile settings</Link> page.
                    </FormDescription> */}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Page

export {Head} from '@atsnek/jaen'

export const pageConfig: PageConfig = {
  label: 'Jaen CMS | Notification',
  icon: 'FaBell',
  layout: {
    name: 'jaen'
  },
  menu: {
    type: 'app',
    group: 'cms',
    label: 'Popup',
    groupLabel: 'Jaen CMS',

    order: 450
  },
  breadcrumbs: [
    {
      label: 'Popup',
      path: '/notification/popup/'
    }
  ],
  auth: {
    isRequired: true,
    isAdminRequired: true
  }
}

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
