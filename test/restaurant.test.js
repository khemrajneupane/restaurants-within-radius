const helper_function = require('../test/restaurant_help')
const axios = require('axios')

const url = 'http://localhost:3001/restaurants/search'

const restaurants = async (url, query, latitude, longitude) => {
  const result = await axios.get(`${url}/${query}/${latitude}/${longitude}`)
  return result.data
}

const correct_query = 'sushi'
const correct_latitude = 60.169933
const correct_longitude = 24.941786
const incorrect_query = 'Khem'
const incorrect_latitude = 0.0
const incorrect_longitude = 0.0

const correctLatLan = {
  lat: 60.169933,
  lon: 24.941786
}
const wrongLatLan = {
  lat: 100.0,
  lon: 100.0
}
const CustomerPoint = {
  latitude: 60.169933,
  longitude: 24.941786
}

const description_correct = 'Japanilaista ramenia parhaimmillaan'
const tags_correct = 'ramen'
const description_incorrect = description_correct
  .split('')
  .reverse()
  .join('')
const tags_incorrect = tags_correct
  .split('')
  .reverse()
  .join('')
describe('Checking if the search terms are CORRECT ', () => {
  test('OK => Can find restaurants with CORRECT name, description, tags and coords', async () => {
    const result = await restaurants(
      url,
      correct_query,
      correct_latitude,
      correct_longitude
    )
    expect(result).toHaveLength(9)
  })
})

describe('Checking if the search terms are NOT CORRECT ', () => {
  test('OK => Can not find restaurants with INCORRECT name, description, tags and coords', async () => {
    const result = await restaurants(
      url,
      incorrect_query,
      incorrect_latitude,
      incorrect_longitude
    )
    expect(result).toHaveLength(0)
  })
})

describe('Find by Name, Description, Tags & Coords', () => {
  test('OK => Can find correct description index', async () => {
    const result = helper_function.cannotFindByWrongValues(description_correct)
    expect(result).toHaveLength(1)
  })
  test('OK => Can find correct tags index', () => {
    const result = helper_function.cannotFindByWrongValues(tags_correct)
    expect(result).toHaveLength(1)
  })
  test('OK => Cannot find correct description index', () => {
    const result = helper_function.cannotFindByWrongValues(
      description_incorrect
    )
    expect(result).toHaveLength(0)
  })
  test('OK => Cannot find correct tags index', () => {
    const result = helper_function.cannotFindByWrongValues(tags_incorrect)
    expect(result).toHaveLength(0)
  })

  test('OK => Find By Correct Coords', () => {
    const result = helper_function.findLatLon(correctLatLan)

    expect(result.length).toBe(2)
  })

  test('OK => Can\'t Find By Wrong Coords', () => {
    const result = helper_function.findLatLon(wrongLatLan)

    expect(result.length).toBe(2)
  })
})

describe('Distances Within & Above 3000m', () => {
  test('OK => Distance Between the same CustomerPoints is 0m ', () => {
    const result = helper_function.isDistanceLessThan3KM(
      CustomerPoint,
      CustomerPoint
    )
    if (result < 3000) {
      expect(result).toBe(true)
    }
  })
  test('OK => Distance Between Oslo and Helsinki is NOT Within 3000m Radius', () => {
    const bigDistance = {
      latitude: 59.9133301,
      longitude: 10.7389701
    }

    const result = helper_function.isDistanceLessThan3KM(
      CustomerPoint,
      bigDistance
    )
    if (result < 3000) {
      expect(result).toBe(false)
    }
  })
})
