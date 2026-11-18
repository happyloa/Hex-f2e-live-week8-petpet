export const asset = (file: string) => '/petpet/' + file

export const services = [
  { id: 'boarding', name: '寵物寄宿', short: '寄宿', image: 'index-5.webp', icon: 'house' },
  { id: 'grooming', name: '寵物美容', short: '美容', image: 'index-6.webp', icon: 'wash' },
  { id: 'home-care', name: '到府照顧', short: '到府保姆', image: 'index-7.webp', icon: 'roof' },
  { id: 'walking', name: '遛狗保姆', short: '遛狗保姆', image: 'index-8.webp', icon: 'walk' },
  { id: 'training', name: '行為訓練', short: '寵物行為訓練', image: 'index-3.webp', icon: 'pets' },
] as const

export type ServiceId = typeof services[number]['id']

export interface Sitter {
  id: string
  name: string
  image: string
  services: [ServiceId, ...ServiceId[]]
  city: string
  pets: [PetId, ...PetId[]]
  avatar?: string
  reviews?: number
  orders?: number
}

export const cities = ['高雄市', '臺南市', '臺中市', '臺北市']
export const petTypes = [{ id: 'cat', name: '貓' }, { id: 'dog', name: '狗' }] as const
export type PetId = typeof petTypes[number]['id']

export const featuredSitters: Sitter[] = [
  { id: 'jamie', name: 'Jamie', image: 'index-2.webp', avatar: 'person-1.png', services: ['boarding', 'grooming', 'training'], city: '高雄市', pets: ['cat', 'dog'], reviews: 198, orders: 580 },
  { id: 'eric', name: 'Eric', image: 'index-3.webp', avatar: 'person-2.png', services: ['boarding', 'grooming'], city: '高雄市', pets: ['cat', 'dog'], reviews: 76, orders: 208 },
  { id: 'yvonne', name: 'Yvonne', image: 'index-4.webp', avatar: 'person-3.png', services: ['grooming', 'training', 'boarding'], city: '高雄市', pets: ['cat', 'dog'], reviews: 52, orders: 196 },
]

export const sitters: Sitter[] = [
  { id: 'pet-house', name: '寵屋屋', image: 'homestay-2.webp', services: ['boarding', 'grooming', 'home-care'], city: '高雄市', pets: ['cat', 'dog'] },
  { id: 'good-home', name: '毛孩好家', image: 'homestay-3.webp', services: ['boarding', 'grooming', 'home-care'], city: '高雄市', pets: ['cat', 'dog'], reviews: 30, orders: 52 },
  { id: 'cat-butler', name: '妖貓X僕SS', image: 'homestay-4.webp', services: ['boarding', 'grooming'], city: '高雄市', pets: ['cat'] },
  { id: 'cat-first', name: '貓是主我是僕', image: 'homestay-5.webp', services: ['boarding', 'grooming', 'home-care'], city: '高雄市', pets: ['cat'] },
  { id: 'paw-team', name: '汪汪隊', image: 'homestay-6.webp', services: ['boarding', 'home-care', 'training', 'walking'], city: '高雄市', pets: ['cat', 'dog'] },
  { id: 'mimi', name: '卯咪', image: 'homestay-7.webp', services: ['boarding', 'training'], city: '高雄市', pets: ['cat'] },
  { id: 'cats-and-dogs', name: '貓狗大戰', image: 'index-2.webp', services: ['boarding', 'grooming', 'home-care'], city: '高雄市', pets: ['cat', 'dog'] },
  { id: 'pet-and-home', name: '萌寵底家', image: 'homestay-8.webp', services: ['boarding', 'home-care'], city: '高雄市', pets: ['cat'] },
  ...featuredSitters,
]

export function serviceSummary(sitter: Sitter, compact = false) {
  return services.filter(service => sitter.services.includes(service.id))
    .map(service => service.id === 'grooming' && !compact ? '美容洗澡' : service.short)
    .join('、')
}

export const featuredReviews = [
  { name: '葉子', avatar: 'person-4.png', text: '服務很秋！' },
  { name: 'Ray', avatar: 'person-6.png', text: '超喜歡超棒超讚的...' },
  { name: '俊儀', avatar: 'person-8.png', text: '讚的！' },
  { name: 'Joanne', avatar: 'person-5.png', text: '貓完全不想回家了。' },
  { name: '穎旻', avatar: 'person-7.png', text: '下次還會麻煩您～' },
  { name: '子琪', avatar: 'person-9.png', text: '服務很棒耶哈哈哈！' },
]
