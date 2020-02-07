const geolib = require('geolib')

const initialRestaurants = [
  {
    blurhash: 'UUKJMXv|x]oz0gtRM{V@AHRQwvxZXSs9s;o0',
    city: 'Helsinki',
    currency: 'EUR',
    delivery_price: 390,
    description: 'Asenneburgeri',
    image:
      'https://prod-wolt-venue-images-cdn.wolt.com/5b348b31fe8992000bbec771/2be8c7738b220df2f9a0974da5c90d90',
    location: [24.941324, 60.169937],
    name: 'blaalb blaalb',
    online: false,
    tags: ['hamburger', 'fries']
  },
  {
    blurhash: 'U8INy*D+KjIW%3pZ$yx[5T0Lv|_1.3m,0z9h',
    city: 'Helsinki',
    currency: 'EUR',
    delivery_price: 390,
    description: 'Japanilaista ramenia parhaimmillaan',
    image:
      'https://prod-wolt-venue-images-cdn.wolt.com/5d108aa82e757db3f4946ca9/d88ebd36611a5e56bfc6a60264fe3f81',
    location: [24.941786, 60.169933],
    name: 'Momotoko',
    online: false,
    tags: ['ramen', 'risotto']
  }
]

const findByName = anyName =>
  initialRestaurants.filter(
    n => n.name.toUpperCase().indexOf(anyName.toUpperCase(), 0) > -1
  )
const findByDescription = anyDescription =>
  initialRestaurants.filter(
    drp =>
      drp.description.toUpperCase().indexOf(anyDescription.toUpperCase(), 0) >
      -1
  )
const findByTags = anyTags =>
  initialRestaurants.filter(
    tgs =>
      tgs.tags
        .toString()
        .toUpperCase()
        .indexOf(anyTags.toUpperCase(), 0) > -1
  )

const findLatLon = () =>
  initialRestaurants.map(n => {
    return {
      lat: n.location[1],
      lon: n.location[0]
    }
  })
const cannotFindByWrongValues = values =>
  !findByName(values) && !findByTags(values) && !findByDescription(values)
    ? []
    : findByName(values) && findByTags(values) && findByDescription(values)

const isDistanceLessThan3KM = (CustomerPoint, distanceDestination) =>
  geolib.getDistance(CustomerPoint, distanceDestination) < 3000

module.exports = {
  findByName,
  initialRestaurants,
  findByDescription,
  findLatLon,
  findByTags,
  isDistanceLessThan3KM,
  cannotFindByWrongValues
}
