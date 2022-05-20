import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App from './App'
import { Home } from './components/Home'
import { NavBar } from './components/NavBar'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { ShopItem } from './components/ShopItem'
import { MemoryRouter } from 'react-router-dom'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('App component', () => {
  it('renders a navbar', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})

describe('ShopItem component', () => {
  it('renders when given props', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <ShopItem
          shopItem={{
            name: 'Mug',
            price: '$10',
            image: 'fakeurl',
            id: '123',
          }}
        />
      </MemoryRouter>
    )

    expect(getByRole('button').textContent).toMatch('Add to cart')
    expect(getByText('Mug')).toBeInTheDocument()
    expect(getByText('$10')).toBeInTheDocument()
  })
})

describe('Home component', () => {
  it('renders correct number of items', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Home
          shopItems={[
            {
              name: 'Mug',
              price: '$10',
              image: 'fakeurl',
              id: '123',
            },
            {
              name: 'Mug2',
              price: '$11',
              image: 'fakeurl',
              id: '1234',
            },
          ]}
        />
      </MemoryRouter>
    )

    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(2)
  })

  it('calls addToCart when a shop item add button is clicked', () => {
    const addToCart = jest.fn()

    const { getAllByRole } = render(
      <MemoryRouter>
        <Home
          shopItems={[
            {
              name: 'Mug',
              price: '$10',
              image: 'fakeurl',
              id: '123',
            },
            {
              name: 'Mug2',
              price: '$11',
              image: 'fakeurl',
              id: '1234',
            },
          ]}
          addToCart={addToCart}
        />
      </MemoryRouter>
    )

    const inputs = getAllByRole('spinbutton')
    const buttons = getAllByRole('button')

    userEvent.type(inputs[0], '1')
    userEvent.click(buttons[0])

    expect(addToCart).toHaveBeenCalledTimes(1)
  })
})

describe('NavBar component', () => {
  it('should update Cart() with number', () => {
    const { getByRole, getByText, get } = render(
      <MemoryRouter>
        <NavBar cartAmount={3} />
      </MemoryRouter>
    )
    screen.debug()

    const counter = getByText('(3)')

    expect(counter).toBeInTheDocument()
  })
})
