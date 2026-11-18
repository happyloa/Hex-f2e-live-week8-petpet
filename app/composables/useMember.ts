export const demoLoginStorageKey = 'petpet-remember-demo'

export function useMember() {
  const isSignedIn = useState('member-signed-in', () => false)
  const profile = useState('member-profile', () => ({
    name: 'Joanne',
    email: 'cycample@gmail.com',
    phone: '0912-345-789',
    gender: '女',
    address: '高雄市鹽埕區七賢三路123號',
  }))

  function signOut() {
    isSignedIn.value = false
    return navigateTo('/login')
  }

  return { isSignedIn, profile, signOut }
}
