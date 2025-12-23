# 🧪 Test Strategy & Templates for Static Export

## Overview

Since you're using static export with no server-side logic, your tests focus on:
- ✅ Component rendering
- ✅ React hooks (useState, useEffect)
- ✅ User interactions
- ✅ Props validation
- ✅ Conditional rendering

**NOT needed**:
- ❌ API mocking (no APIs in static export)
- ❌ Server-side rendering tests
- ❌ Dynamic route tests
- ❌ ISR validation

---

## Test Setup Required

### 1. Install Jest and React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### 2. Configure Jest (jest.config.js)

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### 3. Setup File (jest.setup.js)

```javascript
import '@testing-library/jest-dom'
```

### 4. Update package.json

```json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --ci"
  }
}
```

---

## Test Templates

### Template 1: Header Component Test

```javascript
// __tests__/components/header.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/components/header'

describe('Header Component', () => {
  it('should render without crashing', () => {
    render(<Header />)
    expect(screen.getByAltText('lys-landing-logo')).toBeInTheDocument()
  })

  it('should display phone number', () => {
    render(<Header />)
    expect(screen.getByText(/8-293-8254/)).toBeInTheDocument()
  })

  it('should display email', () => {
    render(<Header />)
    expect(screen.getByText(/limandsze.lf@gmail.com/)).toBeInTheDocument()
  })

  it('should display firm description', () => {
    render(<Header />)
    expect(screen.getByText(/full-service law/i)).toBeInTheDocument()
  })

  it('should display logo with high fetch priority', () => {
    render(<Header />)
    const logo = screen.getByAltText('lys-landing-logo')
    expect(logo).toHaveAttribute('fetchpriority', 'high')
  })

  it('should render with random background image', () => {
    const { container } = render(<Header />)
    const headerDiv = container.querySelector('div')
    expect(headerDiv.className).toMatch(/bg-\[linear-gradient/i)
  })
})
```

### Template 2: Profile Component Test

```javascript
// __tests__/components/profile.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import Profile from '@/components/profile'

describe('Profile Component', () => {
  const mockProfileData = {
    img: '/images/test-profile.jpg',
    name: 'Atty. John Doe',
    position: 'Partner',
    mobile: '+63-928-123-4567',
    email: 'john@lyslaw.com',
  }

  it('should render profile with all data', () => {
    render(<Profile {...mockProfileData} />)
    expect(screen.getByText('Atty. John Doe')).toBeInTheDocument()
    expect(screen.getByText('Partner')).toBeInTheDocument()
    expect(screen.getByText('+63-928-123-4567')).toBeInTheDocument()
    expect(screen.getByText('john@lyslaw.com')).toBeInTheDocument()
  })

  it('should display profile image', () => {
    render(<Profile {...mockProfileData} />)
    const image = screen.getByAltText('profile')
    expect(image).toHaveAttribute('src', mockProfileData.img)
  })

  it('should handle missing optional fields', () => {
    const minimalData = {
      img: '/images/test.jpg',
      name: 'Test Attorney',
      position: 'Associate',
    }
    render(<Profile {...minimalData} />)
    expect(screen.getByText('Test Attorney')).toBeInTheDocument()
    expect(screen.queryByText(/\+63/)).not.toBeInTheDocument()
  })

  it('should use default image if not provided', () => {
    const { img, ...dataWithoutImg } = mockProfileData
    render(<Profile {...dataWithoutImg} />)
    const image = screen.getByAltText('profile')
    expect(image).toBeInTheDocument()
  })

  it('should have lazy loading attribute', () => {
    render(<Profile {...mockProfileData} />)
    const image = screen.getByAltText('profile')
    expect(image).toHaveAttribute('loading', 'lazy')
  })
})
```

### Template 3: Map Component Test

```javascript
// __tests__/components/map.test.js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Map from '@/components/map'

// Mock the Google Maps API
jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }) => <div data-testid="google-map">{children}</div>,
  useJsApiLoader: () => ({ isLoaded: true, loadError: null }),
  Marker: () => <div data-testid="marker" />,
  InfoWindow: ({ children }) => <div data-testid="info-window">{children}</div>,
}))

describe('Map Component', () => {
  it('should render without crashing', () => {
    render(<Map />)
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })

  it('should display marker', () => {
    render(<Map />)
    expect(screen.getByTestId('marker')).toBeInTheDocument()
  })

  it('should display info window with firm info', () => {
    render(<Map />)
    expect(screen.getByTestId('info-window')).toBeInTheDocument()
    expect(screen.getByText(/Unit 901/)).toBeInTheDocument()
  })

  it('should show loading state when map loads', () => {
    render(<Map />)
    // Component uses ClipLoader - verify it's being rendered
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })
})
```

### Template 4: Footer Component Test

```javascript
// __tests__/components/footer.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/footer'

describe('Footer Component', () => {
  it('should render without crashing', () => {
    render(<Footer />)
    expect(screen.getByAltText('LYS Logo')).toBeInTheDocument()
  })

  it('should display firm name', () => {
    render(<Footer />)
    expect(screen.getByText(/Lim & Yutatco-Sze Law Firm/i)).toBeInTheDocument()
  })

  it('should display credit link', () => {
    render(<Footer />)
    const creditLink = screen.getByText('Boaz Sze')
    expect(creditLink).toHaveAttribute('href')
    expect(creditLink.href).toContain('facebook.com')
  })

  it('should have lazy loading for logo', () => {
    render(<Footer />)
    const logo = screen.getByAltText('LYS Logo')
    expect(logo).toHaveAttribute('loading', 'lazy')
  })
})
```

### Template 5: PracticeAreas Component Test

```javascript
// __tests__/components/practice-areas.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import PracticeAreas from '@/components/practice-areas'

describe('PracticeAreas Component', () => {
  const mockAreas = [
    {
      title: 'Corporate Law',
      description: 'Business incorporation and contracts',
      icon: 'FaBriefcase',
    },
    {
      title: 'Labor Law',
      description: 'Employment and labor disputes',
      icon: 'FaUsers',
    },
  ]

  it('should render all practice areas', () => {
    render(<PracticeAreas practiceAreas={mockAreas} />)
    expect(screen.getByText('Corporate Law')).toBeInTheDocument()
    expect(screen.getByText('Labor Law')).toBeInTheDocument()
  })

  it('should display descriptions', () => {
    render(<PracticeAreas practiceAreas={mockAreas} />)
    expect(screen.getByText('Business incorporation and contracts')).toBeInTheDocument()
  })

  it('should handle empty practice areas', () => {
    const { container } = render(<PracticeAreas practiceAreas={[]} />)
    expect(container.querySelector('.grid')).toBeEmptyDOMElement()
  })

  it('should render section title', () => {
    render(<PracticeAreas practiceAreas={mockAreas} />)
    // The component uses SectionTitle which should render
    expect(screen.getByText('Practice Areas')).toBeInTheDocument()
  })
})
```

---

## Coverage Goals

| Component | Current | Target | Priority |
|-----------|---------|--------|----------|
| Header | 0% | 80%+ | High |
| Footer | 0% | 90%+ | Medium |
| Map | 0% | 70%+ | High |
| Profile | 0% | 85%+ | High |
| PracticeAreas | 0% | 75%+ | Medium |
| Team | 0% | 60%+ | Low |
| BusinessProfile | 0% | 50%+ | Low |

---

## Running Tests

```bash
# Run all tests in watch mode
npm run test

# Run specific test file
npm run test -- header.test.js

# Generate coverage report
npm run test -- --coverage

# Run in CI mode (once)
npm run test:ci
```

---

## Next Steps to Implement Tests

1. **Install dependencies** - `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`
2. **Create jest.config.js** and **jest.setup.js**
3. **Create __tests__ directory** at project root
4. **Start with Header component** (most important)
5. **Add tests incrementally** - one component per day

---

## Why These Tests Matter

- ✅ **Confidence**: Know your changes don't break UI
- ✅ **Regression prevention**: Catch bugs before users see them
- ✅ **Documentation**: Tests show how components should be used
- ✅ **Refactoring safety**: Can improve code without fear
- ✅ **Quality gate**: Catch issues in CI/CD

---

## Estimated Time to Implement

| Phase | Time | Effort |
|-------|------|--------|
| Setup Jest/RTL | 15 min | Easy |
| Header tests | 20 min | Easy |
| Profile tests | 25 min | Medium |
| Map tests (with mocks) | 30 min | Medium |
| Footer tests | 15 min | Easy |
| PracticeAreas tests | 20 min | Easy |
| **Total** | **~2 hours** | **Medium** |

Would you like me to create the test configuration files for you?
