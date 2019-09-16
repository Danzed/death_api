import { Death } from '.'

let death

beforeEach(async () => {
  death = await Death.create({ date: 'test', hours: 'test', user: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = death.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(death.id)
    expect(view.date).toBe(death.date)
    expect(view.hours).toBe(death.hours)
    expect(view.user).toBe(death.user)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = death.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(death.id)
    expect(view.date).toBe(death.date)
    expect(view.hours).toBe(death.hours)
    expect(view.user).toBe(death.user)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
