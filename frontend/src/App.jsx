import { useState } from 'react'
import './App.css'

const stays = [
  {
    name: 'Campus Corner PG',
    city: 'Pune',
    area: 'Hinjawadi, Pune',
    type: 'PG',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    alt: 'Bright shared lounge with warm wood and comfortable seating',
    amenities: ['Meals included', 'Wi-Fi', 'Study lounge'],
    tag: 'DEMO listing',
  },
  {
    name: 'Green Door Hostel',
    city: 'Pune',
    area: 'Wakad, Pune',
    type: 'Hostel',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=85',
    alt: 'Comfortable hostel room with neatly made beds',
    amenities: ['Common room', 'Laundry', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Kothrud Study Stay',
    city: 'Pune',
    area: 'Kothrud, Pune',
    type: 'PG',
    price: 9400,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
    alt: 'Sunlit shared apartment with a welcoming lounge',
    amenities: ['Home-style meals', 'Power backup', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Common Ground Rooms',
    city: 'Pune',
    area: 'Viman Nagar, Pune',
    type: 'Shared room',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85',
    alt: 'Light-filled apartment bedroom with a simple modern interior',
    amenities: ['Shared kitchen', 'Housekeeping', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Baner Grove Living',
    city: 'Pune',
    area: 'Baner, Pune',
    type: 'PG',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
    alt: 'Comfortable contemporary living space with natural light',
    amenities: ['Meals included', 'Gym access', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Karve Nagar House',
    city: 'Pune',
    area: 'Karve Nagar, Pune',
    type: 'Hostel',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=85',
    alt: 'Neat shared bedroom with comfortable beds and soft daylight',
    amenities: ['24/7 security', 'Laundry', 'Common room'],
    tag: 'DEMO listing',
  },
  {
    name: 'Hinjawadi Nest',
    city: 'Pune',
    area: 'Hinjawadi Phase 1, Pune',
    type: 'Shared room',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
    alt: 'Thoughtfully furnished apartment interior with a shared lounge',
    amenities: ['Shared kitchen', 'Desk space', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Wakad Willow PG',
    city: 'Pune',
    area: 'Wakad, Pune',
    type: 'PG',
    price: 11200,
    image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85',
    alt: 'Airy shared living space with plants and green accents',
    amenities: ['Meals included', 'Housekeeping', 'Power backup'],
    tag: 'DEMO listing',
  },
  {
    name: 'Kothrud Commons',
    city: 'Pune',
    area: 'Kothrud, Pune',
    type: 'Hostel',
    price: 8800,
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=900&q=85',
    alt: 'Shared accommodation bedroom with tidy beds and warm lighting',
    amenities: ['Common room', 'Study area', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Viman House PG',
    city: 'Pune',
    area: 'Viman Nagar, Pune',
    type: 'PG',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=85',
    alt: 'Bright modern home interior with a comfortable shared space',
    amenities: ['Home-style meals', 'Laundry', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'DEMO Viman Student PG',
    city: 'Pune',
    area: 'Viman Nagar, Pune',
    type: 'PG',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=85',
    alt: 'Neat shared bedroom with comfortable beds and soft daylight',
    amenities: ['Meals included', 'Wi-Fi', 'Study area'],
    tag: 'DEMO listing',
  },
  {
    name: 'DEMO Viman Study Stay',
    city: 'Pune',
    area: 'Viman Nagar, Pune',
    type: 'PG',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85',
    alt: 'Light-filled apartment bedroom with a simple modern interior',
    amenities: ['Housekeeping', 'Power backup', 'Wi-Fi'],
    tag: 'DEMO listing',
  },
  {
    name: 'Baner Co-Living Rooms',
    city: 'Pune',
    area: 'Baner, Pune',
    type: 'Shared room',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    alt: 'Welcoming shared lounge with comfortable seating and warm finishes',
    amenities: ['Shared kitchen', 'Cleaning', 'Study lounge'],
    tag: 'DEMO listing',
  },
  {
    name: 'Karve Student Rooms',
    city: 'Pune',
    area: 'Karve Nagar, Pune',
    type: 'PG',
    price: 9200,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
    alt: 'Calm, sunlit shared living room with leafy plants',
    amenities: ['Meals included', 'Wi-Fi', 'Power backup'],
    tag: 'DEMO listing',
  },
]

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`

function BrandMark() {
  return (
    <a className="brand" href="#home" aria-label="Smart Student Sojourn home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 36 36" fill="none">
          <path d="M5 17.5 18 6l13 11.5v13H5v-13Z" />
          <path d="M14 30.5V20h8v10.5M11 16h.01M25 16h.01" />
        </svg>
      </span>
      <span className="brand-name">sojourn<span>.</span></span>
    </a>
  )
}

function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <BrandMark />
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link nav-link-active" href="#home">Home</a>
          <a className="nav-link" href="#stays">Explore stays</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#stays">Find your place <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}

function SearchPanel({ onSearch }) {
  const [city, setCity] = useState('')
  const [type, setType] = useState('Any type')
  const [budget, setBudget] = useState('Any budget')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch({ city, type, budget })
  }

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <label className="search-field location-field">
        <span className="field-label">Where to?</span>
        <span className="field-control">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="City or neighborhood" aria-label="City or neighborhood" />
        </span>
      </label>
      <label className="search-field">
        <span className="field-label">Stay type</span>
        <select value={type} onChange={(event) => setType(event.target.value)} aria-label="Accommodation type">
          <option>Any type</option><option>PG</option><option>Hostel</option><option>Shared room</option>
        </select>
      </label>
      <label className="search-field">
        <span className="field-label">Monthly budget</span>
        <select value={budget} onChange={(event) => setBudget(event.target.value)} aria-label="Monthly budget">
          <option>Any budget</option><option value="10000">Under ₹10,000</option><option value="15000">Under ₹15,000</option><option value="20000">Under ₹20,000</option>
        </select>
      </label>
      <button className="search-button" type="submit" aria-label="Search stays">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></svg>
        <span>Search stays</span>
      </button>
    </form>
  )
}

function StayCard({ stay }) {
  return (
    <article className="stay-card">
      <div className="stay-image-wrap">
        <img className="stay-image" src={stay.image} alt={stay.alt} loading="lazy" />
        <span className="stay-type">{stay.type}</span>
      </div>
      <div className="stay-card-content">
        <p className="stay-tag">{stay.tag}</p>
        <h3>{stay.name}</h3>
        <p className="stay-location">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
          {stay.area}
        </p>
        <div className="amenities" aria-label="Amenities">{stay.amenities.map((amenity) => <span key={amenity}>{amenity}</span>)}</div>
        <div className="stay-card-bottom">
          <p><strong>{formatPrice(stay.price)}</strong><span> / month</span></p>
          <a href="#contact" aria-label={`Ask us about ${stay.name}`}>View stay <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  )
}

function WhyChooseUs() {
  return (
    <section className="why-section" id="about">
      <div className="why-intro">
        <p className="eyebrow">A softer landing</p>
        <h2>New city.<br />New possibilities.</h2>
        <p className="why-copy">Finding a place shouldn’t feel like another exam. We make the first step feel a little more like home.</p>
      </div>
      <div className="why-points">
        <article className="why-point"><span className="point-number">01</span><div><h3>Made for student life</h3><p>Places and details that make the day-to-day easier, from study corners to shared kitchens.</p></div></article>
        <article className="why-point"><span className="point-number">02</span><div><h3>Know what to expect</h3><p>Clear monthly prices and useful amenity details help you compare at your own pace.</p></div></article>
        <article className="why-point"><span className="point-number">03</span><div><h3>A place to belong</h3><p>Discover welcoming ways to live, learn, and find your people in a new city.</p></div></article>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand-block"><BrandMark /><p>A little closer to feeling at home.</p></div>
        <div className="footer-links">
          <div><h3>Discover</h3><a href="#stays">Explore stays</a><a href="#about">Why Sojourn</a></div>
          <div><h3>Say hello</h3><a href="mailto:hello@sojourn.example">hello@sojourn.example</a><a href="#contact">Get in touch</a></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Smart Student Sojourn</span><span>Sample listings shown for illustrative purposes only.</span></div>
    </footer>
  )
}

function App() {
  const [filters, setFilters] = useState({ city: '', type: 'Any type', budget: 'Any budget' })
  const filteredStays = stays.filter((stay) => {
    const matchesCity = !filters.city || `${stay.area} ${stay.city}`.toLowerCase().includes(filters.city.toLowerCase())
    const matchesType = filters.type === 'Any type' || stay.type === filters.type
    const matchesBudget = filters.budget === 'Any budget' || stay.price <= Number(filters.budget)
    return matchesCity && matchesType && matchesBudget
  })

  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> Your next chapter starts here</p>
              <h1>Find your place<br />in a <span>new city.</span></h1>
              <p className="hero-description">Thoughtful stays for student life. Find a room, meet your people, and make somewhere new feel like yours.</p>
              <div className="hero-notes"><span><b aria-hidden="true">✓</b> Made for student budgets</span><span><b aria-hidden="true">✓</b> Room to make it yours</span></div>
            </div>
            <div className="hero-visual">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=90" alt="Welcoming, sunlit shared apartment with leafy plants" />
              <div className="hero-sticker"><span className="sticker-sun" aria-hidden="true">✳</span><span>Room to<br />feel at home</span></div>
              <div className="hero-photo-caption"><span className="caption-dot" /> A fresh start, your way</div>
            </div>
            <div className="search-wrap"><SearchPanel onSearch={setFilters} /></div>
          </div>
          <div className="hero-curve" aria-hidden="true" />
        </section>
        <section className="featured-section" id="stays">
          <div className="section-heading"><div><p className="eyebrow">A good place to begin</p><h2>Stay a little <span>closer</span></h2></div><p className="section-aside">A few ideas for your next address.<br />Your story starts wherever you land.</p></div>
          <p className="sample-note">All listings are DEMO samples, not verified or currently available.</p>
          {filteredStays.length > 0 ? (
            <div className="stay-grid">{filteredStays.map((stay) => <StayCard key={stay.name} stay={stay} />)}</div>
          ) : (
            <div className="empty-state"><span aria-hidden="true">⌕</span><h3>No sample stays match those filters</h3><p>Try another city, accommodation type, or budget.</p><button type="button" onClick={() => setFilters({ city: '', type: 'Any type', budget: 'Any budget' })}>Show all stays</button></div>
          )}
        </section>
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  )
}

export default App
