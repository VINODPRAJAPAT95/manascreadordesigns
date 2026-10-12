// ===== Edit company details here =====

export const company = {
  name: 'Manas Automotive Parts',
  phone: '02114 6601700',
  email: 'optomar@manasautomotive.com',
  address: 'Gat No 105-106, Village - Ambi, Tal - Maval, MIDC Road, Talegaon Pune - 410507, Maharashtra, India',
}


export const socials = [
  { name: 'Twitter / X', icon: 'x', href: '#' },
  { name: 'WhatsApp', icon: 'whatsapp', href: '#' },
  { name: 'Facebook', icon: 'facebook', href: '#' },
  { name: 'YouTube', icon: 'youtube', href: '#' },
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
]

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Mission', to: '/about/mission' },
      { label: 'Vision', to: '/about/vision' },
      { label: 'Our Story', to: '/about/our-story' },
      { label: 'About Me', to: '/about/about-me' },
      { label: 'Our Team', to: '/about/our-team' },
    ],
  },
  { label: 'Q-Policy', to: '/q-policy' },
  { label: 'Mirror Plant', to: '/mirror-plant' },
  { label: 'Molding', to: '/molding' },
  { label: 'Design', to: '/design' },
  { label: 'Product', to: '/product' },
  { label: 'Tool Room', to: '/tool-room' },
  { label: 'Career', to: '/career' },
  { label: 'Contact Us', to: '/contact-us' },
]
