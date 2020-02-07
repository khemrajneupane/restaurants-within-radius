const express = require('express')
const cors = require('cors')
const app = express()
const geolib = require('geolib')
const Restaurants = require('./restaurants')

app.use(cors())
app.get('/', (req, res) => {
  res.send(Restaurants)
})
//** http://localhost:3001/restaurants/search/sushi/60.17045/24.93147 */
app.get('/restaurants/search/:q/:lat/:lon', async (req, res) => {
  const lat = req.params.lat
  const lon = req.params.lon
  const q = req.params.q
  const RestaurantLatLonObj = JSON.parse(Restaurants).map(t => {
    //create temp RestaurantLatLonObj object out of Restaurant, a javascript object
    return {
      lat: t.location[1],
      lon: t.location[0]
    }
  })

  const CustomerPoint = {
    //current coords of the customer/app user
    latitude: lat,
    longitude: lon
  }

  const coordsLessThan3Km = RestaurantLatLonObj.map(m =>
    geolib.getDistance(CustomerPoint, { latitude: m.lat, longitude: m.lon }) <
    3000
      ? m
      : { lat: null, lon: null }
  ) // searched coords within 3000m, distances in meters

  //console.log("coordsLessThan3Km: ", coordsLessThan3Km);
  const resturantsInside3Km = JSON.parse(Restaurants).filter(
    t =>
      coordsLessThan3Km
        .map(lt => lt.lat)
        .indexOf(parseFloat(Number(t.location[1])), 0) > -1 &&
      coordsLessThan3Km
        .map(lt => lt.lon)
        .indexOf(parseFloat(Number(t.location[0])), 0) > -1
  ) //return all the restaurants that match the location coords derieved from coordsLessThan3Km

  //console.log("resturantsInside3Km: ", resturantsInside3Km);

  const inside3KmWithSearchCriteria = resturantsInside3Km.filter(
    //apply IgnoreCase search criterias within resturantsInside3Km
    t =>
      t.description.toUpperCase().indexOf(q.toUpperCase(), 0) > -1 ||
      t.name.toUpperCase().indexOf(q.toUpperCase(), 0) > -1 ||
      t.tags
        .toString()
        .toUpperCase()
        .indexOf(q.toUpperCase(), 0) > -1
  )
  //console.log(JSON.parse(Restaurants).length); //check the original length of the Restaurant.
  console.log('*****************************************')
  //console.log(inside3KmWithSearchCriteria.length); //check the length of the Restaurant after radius filter.

  res.json(inside3KmWithSearchCriteria)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
