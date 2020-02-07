const helper_function = require('../test/restaurant_help');



describe('Find by Name, Description, Tags & Coords', () => {

    test('200 OK => Find By Name', () => {
        const correct_name = 'Momotoko Citycenter'
        const result = helper_function.findByName(correct_name)
        expect(result.length).toBe(1)
    })

    test('200 OK => Find By Correct Coords', () => {
        const correctLatLan={
            lat: 60.169933,
            lon: 24.941786
          }
        const result = helper_function.findLatLon(correctLatLan)
        console.log(result)
        expect(result.length).toBe(2)
    })
})
