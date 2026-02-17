export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/messages/:path*', '/board/:path*'],
}
