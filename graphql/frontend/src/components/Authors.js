  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [author, setAuthor] = useState('')
  const [birthYear, setBirthYear] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  if (!props.show) {
    return null
  }
  
  
  if (result.loading) {
    return <div>Loading</div>
  }
  
  const submit = async (event) => {
    event.preventDefault()

    console.log(`Setting ${author}'s birth year to ${birthYear}`)
    editAuthor({
      variables: {
        name: author,
        birthYear: parseInt(birthYear)
      }
    })
    setAuthor('')
    setBirthYear('')
  }

  const authors = result.data.allAuthors

  const authorOptions = authors.map((author) => ({
    label: author.name,
    value: author.name,
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={authorOptions}
            onChange={({value}) => setAuthor(value)}
          />
        </div>
        <div>
          birth year
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">set birth year</button>
      </form>

    </div>
  )
}

export default Authors
