export const supportedLanguages = ['id', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export function normalizeLang(lang?: string): SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage)
    ? (lang as SupportedLanguage)
    : 'id';
}

const businessDestinations = {
  id: [
    {
      title: 'Adem Anyer Park',
      subtitle: 'Pesisir yang menenangkan untuk keluarga, komunitas, dan acara perusahaan.',
      description: 'Destinasi pantai dengan kabin, glamping, area campervan, dan ruang acara yang dirancang untuk pengalaman keluarga dan korporat yang tak terlupakan.',
      href: '/destinations/adem-anyer-park',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      badge: 'Resort Pesisir'
    },
    {
      title: 'Cabinite Pangalengan',
      subtitle: 'Kabin pegunungan privat yang dikelilingi alam.',
      description: 'Retret eksklusif di dataran tinggi dengan pemandangan hutan pinus, aktivitas outdoor, dan pertemuan berbasis alam yang tak terlupakan.',
      href: '/destinations/cabinite-pangalengan',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
      badge: 'Retret Pegunungan'
    }
  ],
  en: [
    {
      title: 'Adem Anyer Park',
      subtitle: 'Beachfront escape for families, communities, and corporate gatherings.',
      description: 'A coastal destination offering cabins, glamping, campervan areas, and event spaces designed for unforgettable family and corporate experiences.',
      href: '/destinations/adem-anyer-park',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      badge: 'Beachfront Resort'
    },
    {
      title: 'Cabinite Pangalengan',
      subtitle: 'Private mountain cabins surrounded by nature.',
      description: 'An exclusive retreat in the cool highlands with pine forest views, outdoor activities, and memorable nature-based gatherings.',
      href: '/destinations/cabinite-pangalengan',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
      badge: 'Mountain Retreat'
    }
  ]
};

const siteContent = {
  id: {
    meta: {
      title: 'Bambulogy Group',
      description: 'Bambulogy Group — Membangun destinasi luar biasa yang menghubungkan hospitality, alam, dan teknologi di Indonesia.'
    },
    header: {
      siteName: 'Bambulogy',
      logoUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=80&q=60',
      menu: [
        { label: 'Beranda', link: '/id' },
        { label: 'Bisnis', link: '#businesses' },
        { label: 'Keberlanjutan', link: '#sustainability' },
        { label: 'Berita', link: '#news' },
        { label: 'Kontak', link: '#contact' }
      ],
      cta: { text: 'Hubungi', link: 'mailto:corporate@bambulogy.com' }
    },
    hero: {
      backgroundImage: 'https://bambulogyindonesia-my.sharepoint.com/:i:/p/syamsurizal_munaf/IQDLIy36zD9LQJoAXQVhkuaZAcUaz1TvfH4muRFB7siRWPE?e=2Mvnb3',
      title: 'Membangun Destinasi Luar Biasa',
      subtitle: 'Menghubungkan Hospitality, Alam, dan Inovasi di seluruh Indonesia.',
      primary: { text: 'Jelajahi Bisnis Kami', link: '#businesses' },
      secondary: { text: 'Pelajari Lebih Lanjut', link: '#about' }
    },
    about: {
      title: 'Tentang Perusahaan',
      description: 'Bambulogy Group adalah perusahaan hospitality dan manajemen resort yang menciptakan penginapan unik dan pengalaman luar ruangan yang terkurasi di seluruh Indonesia. Kami percaya perjalanan tidak hanya tentang destinasi, tetapi tentang menciptakan kenangan yang berarti melalui alam, kenyamanan, dan pengalaman autentik.\n\nMisi kami adalah mengembangkan destinasi yang terinspirasi alam, menggabungkan hospitality unggulan, petualangan outdoor, budaya lokal, dan pariwisata berkelanjutan.',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80',
      cta: { label: 'Hubungi Korporat', href: '#contact' }
    },
    businesses: {
      sectionLabel: 'Destinasi kami',
      title: 'Temukan Tempat Bambulogy',
      cta: 'Lihat semua pengalaman',
      destinations: businessDestinations.id
    },
    brands: {
      title: 'Brand Unggulan',
      brands: [
        {
          id: 'adem-anyer-park',
          name: 'Adem Anyer Park',
          description: 'Resor tepi pantai dengan lanskap tropis dan arena acara yang dirancang untuk hospitality premium.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
          logo: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
          website: '/brands/adem-anyer-park',
          established: '2017'
        },
        {
          id: 'cabinite-pangalengan',
          name: 'Cabinite Pangalengan',
          description: 'Glamping mewah di hutan pegunungan dengan pagi berkabut — pengalaman alam yang intim dan mendalam.',
          image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
          logo: 'https://images.unsplash.com/photo-1505691723518-36a2d7f9d1f8?auto=format&fit=crop&w=800&q=80',
          website: '/brands/cabinite-pangalengan',
          established: '2019'
        },
        {
          id: 'bambu-resorts',
          name: 'Bambu Resorts',
          description: 'Koleksi properti resort butik yang menekankan desain, pelayanan, dan budaya lokal.',
          image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80',
          logo: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
          website: '/brands/bambu-resorts',
          established: '2021'
        }
      ]
    },
    statistics: {
      headline: 'Berdasarkan angka',
      summary: 'Metrik kinerja dan dampak yang merepresentasikan skala serta ambisi grup.',
      stats: [
        { id: 'guests', number: '100.000+', label: 'Tamu dilayani' },
        { id: 'rooms', number: 860, label: 'Kamar & vila' },
        { id: 'brands', number: 8, label: 'Brand aktif' },
        { id: 'years', number: 11, label: 'Tahun beroperasi' },
        { id: 'partners', number: 45, label: 'Mitra lokal' }
      ]
    },
    sustainability: {
      title: 'Keberlanjutan — Manusia · Alam · Masa Depan',
      description: 'Merancang dengan menghormati tempat dan manusia, Bambulogy Group memprioritaskan praktik regeneratif, kemitraan lokal, dan arsitektur ramah lingkungan.',
      image: 'https://images.unsplash.com/photo-1505691723518-36a5d0d28a1a?auto=format&fit=crop&w=1600&q=80',
      button: 'Pelajari pendekatan kami'
    },
    news: {
      title: 'Berita & Media',
      posts: [
        {
          id: 'post-1',
          title: 'Bambulogy umumkan pengembangan resort baru',
          date: '2026-06-01',
          short: 'Meluncurkan destinasi tepi pantai yang dirancang untuk konservasi dan kemewahan.',
          category: 'Pengumuman',
          coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
          link: '/news/bambulogy-new-resort'
        },
        {
          id: 'post-2',
          title: 'Cabinite Pangalengan dibuka untuk tamu',
          date: '2026-05-10',
          short: 'Pengalaman glamping yang terkurasi untuk menghubungkan tamu dengan alam pegunungan.',
          category: 'Berita',
          coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
          link: '/news/cabinite-pangalengan-opens'
        }
      ]
    },
    contact: {
      title: 'Mari Bangun Sesuatu yang Luar Biasa Bersama',
      description: 'Untuk kemitraan, kolaborasi, dan peluang korporat, silakan hubungi tim korporat kami.',
      button: 'Hubungi Bambulogy Group'
    },
    footer: {
      company: {
        name: 'Bambulogy Group',
        description: 'Perusahaan yang bergerak di hospitality, pariwisata, properti, gaya hidup, dan teknologi.',
        address: 'Jl. Cendrawasih V No. 125, Sawah Baru, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413.',
        email: 'Reservation@bambulogyIndonesia.com',
        phone: '085861214132'
      },
      links: {
        products: [
          { label: 'Brand', href: '/brands' },
          { label: 'Unit Bisnis', href: '/business' }
        ],
        company: [
          { label: 'Tentang Kami', href: '/about' },
          { label: 'Karier', href: '/careers' },
          { label: 'Kontak', href: '/contact' }
        ],
        legal: [
          { label: 'Kebijakan Privasi', href: '/legal/privacy' },
          { label: 'Syarat Penggunaan', href: '/legal/terms' }
        ]
      },
      social: [
        { name: 'LinkedIn' },
        { name: 'Instagram' },
        { name: 'Facebook' }
      ],
      copyright: '© 2026 Bambulogy Group. Semua hak dilindungi.',
      cta: { label: 'Berlangganan newsletter', href: '/subscribe' }
    }
  },
  en: {
    meta: {
      title: 'Bambulogy Group',
      description: 'Bambulogy Group — Building extraordinary destinations that connect hospitality, nature, and technology across Indonesia.'
    },
    header: {
      siteName: 'Bambulogy',
      logoUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=80&q=60',
      menu: [
        { label: 'Home', link: '/en' },
        { label: 'Businesses', link: '#businesses' },
        { label: 'Sustainability', link: '#sustainability' },
        { label: 'News', link: '#news' },
        { label: 'Contact', link: '#contact' }
      ],
      cta: { text: 'Contact', link: 'mailto:corporate@bambulogy.com' }
    },
    hero: {
      backgroundImage: 'https://bambulogyindonesia-my.sharepoint.com/:i:/p/syamsurizal_munaf/IQDLIy36zD9LQJoAXQVhkuaZAcUaz1TvfH4muRFB7siRWPE?e=2Mvnb3',
      title: 'Building Extraordinary Destinations',
      subtitle: 'Connecting Hospitality, Nature, and Innovation Across Indonesia.',
      primary: { text: 'Explore Our Businesses', link: '#businesses' },
      secondary: { text: 'Learn More', link: '#about' }
    },
    about: {
      title: 'About Company',
      description: 'Bambulogy Group is a hospitality and resort management company that creates unique stays and curated outdoor experiences across Indonesia. We believe travel is not only about a destination but about creating meaningful memories through nature, comfort, and authentic experiences.\n\nOur mission is to develop nature-inspired destinations that combine exceptional hospitality, outdoor adventure, local culture, and sustainable tourism.',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80',
      cta: { label: 'Contact Corporate', href: '#contact' }
    },
    businesses: {
      sectionLabel: 'Our destinations',
      title: 'Discover Bambulogy Places',
      cta: 'View all experiences',
      destinations: businessDestinations.en
    },
    brands: {
      title: 'Featured Brands',
      brands: [
        {
          id: 'adem-anyer-park',
          name: 'Adem Anyer Park',
          description: 'Beachfront resort with tropical landscape and an event venue designed for premium hospitality.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
          logo: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
          website: '/brands/adem-anyer-park',
          established: '2017'
        },
        {
          id: 'cabinite-pangalengan',
          name: 'Cabinite Pangalengan',
          description: 'Luxury glamping in mountain forest with misty mornings — an intimate, immersive nature experience.',
          image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
          logo: 'https://images.unsplash.com/photo-1505691723518-36a2d7f9d1f8?auto=format&fit=crop&w=800&q=80',
          website: '/brands/cabinite-pangalengan',
          established: '2019'
        },
        {
          id: 'bambu-resorts',
          name: 'Bambu Resorts',
          description: 'A collection of boutique resort properties emphasizing design, service, and local culture.',
          image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80',
          logo: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
          website: '/brands/bambu-resorts',
          established: '2021'
        }
      ]
    },
    statistics: {
      headline: 'By the numbers',
      summary: 'Performance and impact metrics that represent the group’s scale and ambition.',
      stats: [
        { id: 'guests', number: '100,000+', label: 'Guests served' },
        { id: 'rooms', number: 860, label: 'Rooms & villas' },
        { id: 'brands', number: 8, label: 'Active brands' },
        { id: 'years', number: 11, label: 'Years operating' },
        { id: 'partners', number: 45, label: 'Local partners' }
      ]
    },
    sustainability: {
      title: 'Sustainability — People · Nature · Future',
      description: 'Designing with respect for place and people, Bambulogy Group prioritizes regenerative practices, local partnerships, and low-impact architecture.',
      image: 'https://images.unsplash.com/photo-1505691723518-36a5d0d28a1a?auto=format&fit=crop&w=1600&q=80',
      button: 'Learn about our approach'
    },
    news: {
      title: 'News & Media',
      posts: [
        {
          id: 'post-1',
          title: 'Bambulogy announces new resort development',
          date: '2026-06-01',
          short: 'Launching a signature beachfront destination designed for conservation and luxury.',
          category: 'Announcements',
          coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
          link: '/news/bambulogy-new-resort'
        },
        {
          id: 'post-2',
          title: 'Cabinite Pangalengan opens to guests',
          date: '2026-05-10',
          short: 'A curated glamping experience that connects guests with mountain nature.',
          category: 'News',
          coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
          link: '/news/cabinite-pangalengan-opens'
        }
      ]
    },
    contact: {
      title: "Let's Build Something Extraordinary Together",
      description: 'For partnerships, collaborations, and corporate opportunities, reach out to our corporate team.',
      button: 'Contact Bambulogy Group'
    },
    footer: {
      company: {
        name: 'Bambulogy Group',
        description: 'A diversified hospitality, tourism, property, lifestyle, and technology holding company.',
        address: 'Jl. Cendrawasih V No. 125, Sawah Baru, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413.',
        email: 'Reservation@bambulogyIndonesia.com',
        phone: '085861214132'
      },
      links: {
        products: [
          { label: 'Brands', href: '/brands' },
          { label: 'Business Units', href: '/business' }
        ],
        company: [
          { label: 'About Us', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact', href: '/contact' }
        ],
        legal: [
          { label: 'Privacy Policy', href: '/legal/privacy' },
          { label: 'Terms of Use', href: '/legal/terms' }
        ]
      },
      social: [
        { name: 'LinkedIn' },
        { name: 'Instagram' },
        { name: 'Facebook' }
      ],
      copyright: '© 2026 Bambulogy Group. All rights reserved.',
      cta: { label: 'Subscribe to newsletter', href: '/subscribe' }
    }
  }
} as const;

export function getPageContent(lang?: string) {
  const locale = normalizeLang(lang);
  return siteContent[locale];
}
