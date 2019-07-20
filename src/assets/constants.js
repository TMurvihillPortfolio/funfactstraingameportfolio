const _DRAWER_WIDTH = 240;

const _TRIP_LENGTHS = {
    Boston: {
        Chicago: 850,
        Washington: 395,
        Columbus: 642,
        Atlanta: 937,
        NewYork: 190
    },
    Chicago: {
        Washington: 595,
        Columbus: 276,
        Atlanta: 590,
        NewYork: 711
    },
    Washington: {
        Columbus: 327,
        Atlanta: 542,
        NewYork: 203
    },
    Columbus: {
        Atlanta: 570,
        NewYork: 476
    },
    NewYork: {
        Atlanta: 746
    }
}

export { _DRAWER_WIDTH, _TRIP_LENGTHS };