import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import styled from '@emotion/styled'
import { setAccessToken } from '../lib/accessToken'
import Link from 'next/link'

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  a {
    margin-right: 2rem;
  }
`

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { data, loading } = useMeQuery()
  const [logout, { client }] = useLogoutMutation()

  const body = loading ? null : data && data.me ? (
    <div>
      Hello {data.me.username!} - {data.me.email}
    </div>
  ) : null

  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout()
              setAccessToken('')
              await client!.resetStore()
            }}
          >
            logout
          </button>
        ) : null}
        {body}
      </div>
    </Nav>
  )
}
