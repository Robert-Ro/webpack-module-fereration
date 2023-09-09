import React from 'react'
import { useQuery } from '@tanstack/react-query'

const Component1 = ({ id = '8663' }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (res) => res.json()
      ),
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h3>{data.title}</h3>
      <strong>🍴 {data.url}</strong>
    </div>
  )
}

export default Component1
