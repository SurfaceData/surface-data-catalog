import ProfileInfoPage from './ProfileInfoPage'

export const generated = () => {
  mockCurrentUser({
    name: 'Test Name',
    sub: '1234',
    email: 'test@email.com',
    role: 'general',
  })
  return <ProfileInfoPage />
}

export default { title: 'Pages/ProfileInfoPage' }
