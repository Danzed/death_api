import { Death } from '.'

let death

beforeEach(async () => {
  death = await Death.create({ title: 'test', start: 'Wed Sep 18 2019 09:00:00 GMT-0300', timestamps: 1568808000 })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = death.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(death.id)
    expect(view.title).toBe(death.title)
    expect(view.start).toBe(death.start)
    expect(view.timestamps).toBe(death.timestamps)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = death.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(death.id)
    expect(view.title).toBe(death.title)
    expect(view.start).toBe(death.start)
    expect(view.timestamps).toBe(death.timestamps)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
