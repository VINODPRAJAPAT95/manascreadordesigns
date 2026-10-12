import { FaXTwitter, FaWhatsapp, FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'
import { socials } from '../data/siteData'

export const socialIcons = {
  x: FaXTwitter, whatsapp: FaWhatsapp, facebook: FaFacebookF,
  youtube: FaYoutube, linkedin: FaLinkedinIn, instagram: FaInstagram,
}

export function SocialLinks({ className = '', itemClass = '' }) {
  return (
    <ul className={`flex items-center gap-1.5 ${className}`}>
      {socials.map((s) => {
        const Icon = socialIcons[s.icon]
        return (
          <li key={s.name}>
            <a href={s.href} aria-label={s.name} target="_blank" rel="noreferrer"
              className={`grid h-7 w-7 place-items-center rounded-full text-[13px] transition hover:-translate-y-0.5 hover:bg-brand hover:text-white ${itemClass}`}>
              <Icon />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
