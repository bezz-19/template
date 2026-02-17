import { z } from 'zod'

export const sendMessageSchema = z.object({
  contactId: z.string().uuid(),
  type: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO']),
  content: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  caption: z.string().optional(),
})

export const updateLabelSchema = z.object({
  contactId: z.string().uuid(),
  labelId: z.string().uuid(),
})

export type SendMessageInput = z.infer<typeof sendMessageSchema>
export type UpdateLabelInput = z.infer<typeof updateLabelSchema>
