import { redirect } from 'next/navigation'

export default function ApiAccessRedirect() {
  redirect('/api-docs')
}
