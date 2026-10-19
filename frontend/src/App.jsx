
import { useEffect, useRef, useState } from 'react'
import './App.css'

const API_BASE_URL = 'http://localhost:8080/api'

const stayImagePresets = [
  {
    name: 'Campus Corner PG',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    alt: 'Bright shared lounge with warm wood and comfortable seating',
  },
  {
    name: 'Green Door Hostel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=85',
    alt: 'Comfortable hostel room with neatly made beds',
  },
  {
    name: 'Kothrud Study Stay',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
    alt: 'Sunlit shared apartment with a welcoming lounge',
  },
  {
    name: 'Common Ground Rooms',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85',
    alt: 'Light-filled apartment bedroom with a simple modern interior',
  },
  {
    name: 'Baner Grove Living',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
    alt: 'Comfortable contemporary living space with natural light',
  },
  {
    name: 'Karve Nagar House',
    image: 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=85',
    alt: 'Neat shared bedroom with comfortable beds and soft daylight',
  },
  {
    name: 'Hinjawadi Nest',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
    alt: 'Thoughtfully furnished apartment interior with a shared lounge',
  },
  {
    name: 'Wakad Willow PG',
    image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85',
    alt: 'Airy shared living space with plants and green accents',
  },
  {
    name: 'Kothrud Commons',
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=900&q=85',
    alt: 'Shared accommodation bedroom with tidy beds and warm lighting',
  },
  {
    name: 'Viman House PG',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=85',
    alt: 'Bright modern home interior with a comfortable shared space',
  },
]

const normalizeLocality = (locality = '') =>
  locality.trim().replace(/\s+/g, ' ').toLowerCase()

const getLocality = (area = '') =>
  area.split(',')[0].replace(/\s+phase\s+\d+$/i, '').trim().replace(/\s+/g, ' ')

const intendedLocalities = [
  'Balewadi',
  'Baner',
  'Chinchwad',
  'Hadapsar',
  'Hinjawadi',
  'Kalyani Nagar',
  'Karve Nagar',
  'Katraj',
  'Kharadi',
  'Kothrud',
  'Nigdi',
  'Pimpri',
  'Pimple Saudagar',
  'Ravet',
  'Viman Nagar',
  'Wadgaon Sheri',
  'Wakad',
  'Warje',
]

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString('en-IN')}`

function mapAccommodation(accommodation, index = 0) {
  const imagePreset = stayImagePresets[index % stayImagePresets.length]

  return {
    ...accommodation,
    area: `${accommodation.locality}, ${accommodation.city}`,
    type: accommodation.accommodationType,
    price: accommodation.monthlyRent,
    image: imagePreset.image,
    alt: imagePreset.alt,
    tag: 'DEMO listing',
    amenities: Array.isArray(accommodation.amenities)
      ? accommodation.amenities
      : [],
  }
}

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
        <a className="nav-cta" href="#stays">
          Find your place <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  )
}

function SearchPanel({ onSearch, localities }) {
  const [city, setCity] = useState('')
  const [locality, setLocality] = useState('')
  const [type, setType] = useState('Any type')
  const [budget, setBudget] = useState('Any budget')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch({ city, locality, type, budget })
  }

  function handleReset() {
    setCity('')
    setLocality('')
    setType('Any type')
    setBudget('Any budget')

    onSearch({
      city: '',
      locality: '',
      type: 'Any type',
      budget: 'Any budget',
    })
  }

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <label className="search-field location-field">
        <span className="field-label">Where to?</span>
        <span className="field-control">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="City or neighborhood"
            aria-label="City or neighborhood"
          />
        </span>
      </label>

      <label className="search-field">
        <span className="field-label">Locality</span>
        <select
          value={locality}
          onChange={(event) => setLocality(event.target.value)}
          aria-label="Locality"
        >
          <option value="">All localities</option>
          {localities.map((option) => (
            <option key={normalizeLocality(option)} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="search-field">
        <span className="field-label">Stay type</span>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          aria-label="Accommodation type"
        >
          <option>Any type</option>
          <option>PG</option>
          <option>Hostel</option>
          <option>Shared room</option>
        </select>
      </label>

      <label className="search-field">
        <span className="field-label">Monthly budget</span>
        <select
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          aria-label="Monthly budget"
        >
          <option>Any budget</option>
          <option value="7000">Under ₹7,000</option>
          <option value="8000">Under ₹8,000</option>
          <option value="9000">Under ₹9,000</option>
          <option value="10000">Under ₹10,000</option>
          <option value="15000">Under ₹15,000</option>
          <option value="20000">Under ₹20,000</option>
        </select>
      </label>

      <button className="search-button" type="submit" aria-label="Search stays">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4 4" />
        </svg>
        <span>Search stays</span>
      </button>

      <button
        className="reset-button"
        type="button"
        onClick={handleReset}
        aria-label="Reset all filters"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 7v5h-5" />
          <path d="M20 12a8 8 0 1 1-2.34-5.66L20 9" />
        </svg>
        <span>Reset Filters</span>
      </button>
    </form>
  )
}

function StayCard({ stay, onSelect }) {
  return (
    <article
      className="stay-card"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${stay.name}`}
      onClick={() => onSelect(stay)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(stay)
        }
      }}
    >
      <div className="stay-image-wrap">
        <img
          className="stay-image"
          src={stay.image}
          alt={stay.alt}
          loading="lazy"
        />
        <span className="stay-type">{stay.type}</span>
      </div>

      <div className="stay-card-content">
        <p className="stay-tag">{stay.tag}</p>
        <h3>{stay.name}</h3>
        <p className="stay-location">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {stay.area}
        </p>

        <div className="amenities" aria-label="Amenities">
          {stay.amenities.map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>

        <div className="stay-card-bottom">
          <p>
            <strong>{formatPrice(stay.price)}</strong>
            <span> / month</span>
          </p>
          <span className="stay-details-link">
            View details <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </article>
  )
}

function StayDetailsModal({ stay, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!stay || !dialog) return

    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
    }
  }, [stay])

  if (!stay) return <dialog ref={dialogRef} className="stay-dialog" />

  const locality = getLocality(stay.area)

  return (
    <dialog
      ref={dialogRef}
      className="stay-dialog"
      aria-labelledby="stay-dialog-title"
      aria-describedby="stay-dialog-description"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          onClose()
        }
      }}
    >
      <div className="stay-dialog-layout">
        <img className="stay-dialog-image" src={stay.image} alt={stay.alt} />

        <div className="stay-dialog-content">
          <div className="stay-dialog-topline">
            <p className="stay-dialog-tag">{stay.tag}</p>
            <button
              className="stay-dialog-close"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <h2 id="stay-dialog-title">{stay.name}</h2>

          <dl className="stay-dialog-facts">
            <div><dt>City</dt><dd>{stay.city}</dd></div>
            <div><dt>Locality</dt><dd>{locality}</dd></div>
            <div><dt>Accommodation type</dt><dd>{stay.type}</dd></div>
            <div><dt>Monthly rent</dt><dd>{formatPrice(stay.price)}</dd></div>
          </dl>

          <section className="stay-dialog-section">
            <h3>About this stay</h3>
            <p id="stay-dialog-description">{stay.description}</p>
          </section>

          <section className="stay-dialog-section">
            <h3>Available amenities</h3>
            <ul className="stay-dialog-amenities">
              {stay.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </dialog>
  )
}

function AiSearchPanel({
  message,
  setMessage,
  onSubmit,
  onClear,
  isLoading,
  isActive,
  error,
}) {
  return (
    <section className="ai-search-panel" aria-labelledby="ai-search-title">
      <div className="ai-search-copy">
        <p className="eyebrow">A smarter way to find your stay</p>
        <h2 id="ai-search-title">
          Tell us what you <span>need.</span>
        </h2>
        <p>
          Describe your budget, preferred locality, stay type, or amenities
          in everyday language. AI will search our accommodation database.
        </p>
        <p className="ai-search-example">
          Try: “Find a PG in Hinjawadi under ₹10,000 with Wi-Fi.”
        </p>
      </div>

      <form className="ai-search-form" onSubmit={onSubmit}>
        <label htmlFor="ai-search-input">
          Describe your ideal accommodation
        </label>

        <textarea
          id="ai-search-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="e.g. Find a PG in Hinjawadi under ₹10,000 with Wi-Fi"
          rows={3}
          maxLength={1000}
          required
          disabled={isLoading}
        />

        <div className="ai-search-actions">
          <button
            className="search-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : '✦ Search with AI'}
          </button>

          {isActive && (
            <button
              className="reset-button"
              type="button"
              onClick={onClear}
              disabled={isLoading}
            >
              Clear AI search
            </button>
          )}
        </div>

        {isLoading && (
          <p className="ai-search-feedback" role="status">
            Understanding your requirements and searching the database...
          </p>
        )}

        {error && (
          <p className="ai-search-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="why-section" id="about">
      <div className="why-intro">
        <p className="eyebrow">A softer landing</p>
        <h2>New city.<br />New possibilities.</h2>
        <p className="why-copy">
          Finding a place shouldn’t feel like another exam. We make the first
          step feel a little more like home.
        </p>
      </div>

      <div className="why-points">
        <article className="why-point">
          <span className="point-number">01</span>
          <div>
            <h3>Made for student life</h3>
            <p>
              Places and details that make the day-to-day easier, from study
              corners to shared kitchens.
            </p>
          </div>
        </article>

        <article className="why-point">
          <span className="point-number">02</span>
          <div>
            <h3>Know what to expect</h3>
            <p>
              Clear monthly prices and useful amenity details help you compare
              at your own pace.
            </p>
          </div>
        </article>

        <article className="why-point">
          <span className="point-number">03</span>
          <div>
            <h3>A place to belong</h3>
            <p>
              Discover welcoming ways to live, learn, and find your people in
              a new city.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand-block">
          <BrandMark />
          <p>A little closer to feeling at home.</p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Discover</h3>
            <a href="#stays">Explore stays</a>
            <a href="#about">Why Sojourn</a>
          </div>
          <div>
            <h3>Say hello</h3>
            <a href="mailto:hello@sojourn.example">hello@sojourn.example</a>
            <a href="#contact">Get in touch</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Smart Student Sojourn</span>
        <span>Sample listings shown for illustrative purposes only.</span>
      </div>
    </footer>
  )
}

function App() {
  const [stays, setStays] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const [filters, setFilters] = useState({
    city: '',
    locality: '',
    type: 'Any type',
    budget: 'Any budget',
  })

  const [selectedStay, setSelectedStay] = useState(null)
  const [sortOrder, setSortOrder] = useState('default')

  // AI search state
  const [aiMessage, setAiMessage] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiSearchActive, setAiSearchActive] = useState(false)
  const [aiResults, setAiResults] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    async function loadAccommodations() {
      setIsLoading(true)
      setLoadError('')

      try {
        const response = await fetch(`${API_BASE_URL}/accommodations`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const accommodations = await response.json()

        if (!Array.isArray(accommodations)) {
          throw new Error('The API returned an unexpected response.')
        }

        setStays(accommodations.map(mapAccommodation))
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadError(
            'Could not load accommodation listings. Check that the Spring Boot backend is running, then try again.'
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadAccommodations()

    return () => controller.abort()
  }, [retryCount])

  const localities = [
    ...new Map(
      [...intendedLocalities, ...stays.map((stay) => getLocality(stay.area))]
        .map((locality) => [normalizeLocality(locality), locality])
    ).values(),
  ].sort((first, second) => first.localeCompare(second))

  const filteredStays = stays.filter((stay) => {
    const matchesCity =
      !filters.city ||
      `${stay.area} ${stay.city}`.toLowerCase().includes(filters.city.toLowerCase())

    const matchesLocality =
      !filters.locality ||
      normalizeLocality(getLocality(stay.area)) === normalizeLocality(filters.locality)

    const matchesType =
      filters.type === 'Any type' || stay.type === filters.type

    const matchesBudget =
      filters.budget === 'Any budget' || stay.price < Number(filters.budget)

    return matchesCity && matchesLocality && matchesType && matchesBudget
  })

  const sortedStays = [...filteredStays].sort((a, b) => {
    if (sortOrder === 'price-low-high') return a.price - b.price
    if (sortOrder === 'price-high-low') return b.price - a.price
    return a.id - b.id
  })

  // Send the user's natural-language request to the Spring Boot AI endpoint.
  async function handleAiSearch(event) {
    event.preventDefault()

    const message = aiMessage.trim()

    if (!message) {
      setAiError('Please describe the accommodation you are looking for.')
      return
    }

    setAiLoading(true)
    setAiError('')
    setAiSearchActive(false)
    setAiResults([])

    try {
      const response = await fetch(
        `${API_BASE_URL}/ai/search?message=${encodeURIComponent(message)}`
      )

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.message || 'AI search failed. Please try again.'
        )
      }

      if (!Array.isArray(data.accommodations)) {
        throw new Error('The AI search returned an unexpected response.')
      }

      console.log('AI search response:', data)

        const mappedResults = data.accommodations.map(mapAccommodation)

        console.log('Mapped AI results:', mappedResults)

        setAiResults(mappedResults)
        setAiSearchActive(true)

      // Clear regular filters so they do not conflict with AI results.
      setFilters({
        city: '',
        locality: '',
        type: 'Any type',
        budget: 'Any budget',
      })
      setSortOrder('default')
    } catch (error) {
      setAiError(
        error.message || 'Could not complete AI search. Please try again.'
      )
    } finally {
      setAiLoading(false)
    }
  }

  function clearAiSearch() {
    setAiMessage('')
    setAiError('')
    setAiSearchActive(false)
    setAiResults([])
  }

  function resetAllFilters() {
    setFilters({
      city: '',
      locality: '',
      type: 'Any type',
      budget: 'Any budget',
    })
    setSortOrder('default')
    clearAiSearch()
  }

  const visibleStays = aiSearchActive ? aiResults : sortedStays

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" /> Your next chapter starts here
              </p>

              <h1>Find your place<br />in a <span>new city.</span></h1>

              <p className="hero-description">
                Thoughtful stays for student life. Find a room, meet your
                people, and make somewhere new feel like yours.
              </p>

              <div className="hero-notes">
                <span><b aria-hidden="true">✓</b> Made for student budgets</span>
                <span><b aria-hidden="true">✓</b> Room to make it yours</span>
              </div>
            </div>

            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=90"
                alt="Welcoming, sunlit shared apartment with leafy plants"
              />

              <div className="hero-sticker">
                <span className="sticker-sun" aria-hidden="true">✳</span>
                <span>Room to<br />feel at home</span>
              </div>

              <div className="hero-photo-caption">
                <span className="caption-dot" /> A fresh start, your way
              </div>
            </div>

            <div className="search-wrap">
              <SearchPanel
                onSearch={(newFilters) => {
                  clearAiSearch()
                  setFilters(newFilters)
                }}
                localities={localities}
              />
            </div>
          </div>

          <div className="hero-curve" aria-hidden="true" />
        </section>

        <section className="featured-section" id="stays">
          <AiSearchPanel
            message={aiMessage}
            setMessage={setAiMessage}
            onSubmit={handleAiSearch}
            onClear={clearAiSearch}
            isLoading={aiLoading}
            isActive={aiSearchActive}
            error={aiError}
          />

          <div className="section-heading">
            <div>
              <p className="eyebrow">A good place to begin</p>
              <h2>Stay a little <span>closer</span></h2>
            </div>

            <p className="section-aside">
              A few ideas for your next address.<br />
              Your story starts wherever you land.
            </p>
          </div>

          <p className="sample-note">
            All listings are DEMO samples, not verified or currently available.
          </p>
          <p className="sample-note">
            Listings are loaded from the Smart Student Sojourn accommodation service.
          </p>

          <div className="sort-control">
            <label htmlFor="sort-order">Sort by rent</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              disabled={aiSearchActive}
            >
              <option value="default">Default sorting</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          {aiSearchActive && !isLoading && !loadError && (
            <div className="ai-results-summary" role="status">
              <div>
                <h3>AI search results</h3>
                <p>
                  {aiResults.length > 0
                    ? `${aiResults.length} matching accommodation${aiResults.length === 1 ? '' : 's'} found in the database.`
                    : 'No matching accommodations found. Try changing your requirements.'}
                </p>
              </div>

              <button
                type="button"
                className="reset-button"
                onClick={clearAiSearch}
              >
                Show all stays
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="listing-status" role="status">
              Loading accommodation listings...
            </div>
          ) : loadError ? (
            <div className="listing-status listing-error" role="alert">
              <p>{loadError}</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                Try again
              </button>
            </div>
          ) : visibleStays.length > 0 ? (
            <div className="stay-grid">
              {visibleStays.map((stay) => (
                <StayCard
                  key={stay.id}
                  stay={stay}
                  onSelect={setSelectedStay}
                />
              ))}
            </div>
          ) : aiSearchActive ? (
            <div className="empty-state">
              <span aria-hidden="true">⌕</span>
              <h3>No matching stays found</h3>
              <p>
                Try another locality, budget, stay type, or amenity in your
                AI search.
              </p>
              <button type="button" onClick={clearAiSearch}>
                Show all stays
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">⌕</span>
              <h3>No stays match those filters</h3>
              <p>
                Try another city, locality, accommodation type, or budget.
              </p>
              <button type="button" onClick={resetAllFilters}>
                Show all stays
              </button>
            </div>
          )}
        </section>

        <WhyChooseUs />
      </main>

      <Footer />

      <StayDetailsModal
        stay={selectedStay}
        onClose={() => setSelectedStay(null)}
      />
    </>
  )
}

export default App
