import type { UsersQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Button, SelectPicker, Table } from 'rsuite'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      email
      role
    }
  }
`

export const MUTATION = gql`
  mutation UpdateUserRole($id: String!, $role: String!) {
    updateUserRole(id: $id, role: $role) {
      id
      role
    }
  }
`

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  const { t } = useTranslation('translation')
  return (
    <Table.Cell {...props} style={{ padding: '6px' }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick && onClick(rowData.id)
        }}
      >
        {rowData.status === 'EDIT'
          ? t('save', { ns: 'translation' })
        : t('edit', { ns: 'translation' })}
      </Button>
    </Table.Cell>
  )
}

const RoleCell = ({ rowData, dataKey, onChange, ...props }) => {
  const { t } = useTranslation('admin')
  const editing = rowData.status === 'EDIT'
  const roleLabels = {
    admin: t('rolesAdmin'),
    steward: t('rolesSteward'),
    general: t('rolesGeneral'),
  }
  const roleTypes = [
    { value: 'admin', label: roleLabels['admin'] },
    { value: 'steward', label: roleLabels['steward'] },
    { value: 'general', label: roleLabels['general'] },
  ]
  return (
    <Table.Cell {...props}>
      {editing ? (
        <SelectPicker
          className="absolute top-1 p-0"
          data={roleTypes}
          onSelect={(value, item, event) => {
            onChange && onChange(rowData.id, dataKey, value)
          }}
        />
      ) : (
        <span className="">{roleLabels[rowData[dataKey]]}</span>
      )}
    </Table.Cell>
  )
}

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({ users }: CellSuccessProps<UsersQuery>) => {
  const [updateUserRole] = useMutation(MUTATION)

  const [userList, setUserList] = useState(
    users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        status: '',
      }
    })
  )

  const handleChange = (id, key, value) => {
    const newUserList = Object.assign([], userList)
    const activeUser = newUserList.find((user) => user.id === id)
    activeUser[key] = value
    setUserList(newUserList)
  }
  const handleEditState = (id) => {
    const newUserList = Object.assign([], userList)
    const activeUser = newUserList.find((user) => user.id === id)
    if (activeUser.status === 'EDIT') {
      updateUserRole({
        variables: {
          id: id,
          role: activeUser.role,
        },
      })
      activeUser.status = null
    } else {
      activeUser.status = 'EDIT'
    }
    setUserList(newUserList)
  }

  return (
    <Table data={userList}>
      <Table.Column width={300}>
        <Table.HeaderCell>
          <Trans i18nKey="translation.email">Email</Trans>
        </Table.HeaderCell>
        <Table.Cell dataKey="email" />
      </Table.Column>

      <Table.Column width={150}>
        <Table.HeaderCell>
          <Trans i18nKey="translation.role">Role</Trans>
        </Table.HeaderCell>
        <RoleCell dataKey="role" onChange={handleChange} />
      </Table.Column>

      <Table.Column>
        <Table.HeaderCell>
          <Trans i18nKey="translation.action">Action</Trans>
        </Table.HeaderCell>
        <ActionCell dataKey="id" onClick={handleEditState} />
      </Table.Column>
    </Table>
  )
}
