import { z } from 'zod'

const clientEnvSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, 'VITE_FIREBASE_API_KEY is required'),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'VITE_FIREBASE_AUTH_DOMAIN is required'),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, 'VITE_FIREBASE_PROJECT_ID is required'),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'VITE_FIREBASE_STORAGE_BUCKET is required'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'VITE_FIREBASE_MESSAGING_SENDER_ID is required'),
  VITE_FIREBASE_APP_ID: z.string().min(1, 'VITE_FIREBASE_APP_ID is required'),
  VITE_JERAYA_BASEID: z.string().min(1, 'VITE_JERAYA_BASEID is required'),
})

export function validateClientEnv() {
  const result = clientEnvSchema.safeParse(import.meta.env)
  if (!result.success) {
    console.warn('Invalid environment variables:', result.error.flatten().fieldErrors)
    return false
  }
  return true
}

export function getClientEnv() {
  return clientEnvSchema.parse(import.meta.env)
}
