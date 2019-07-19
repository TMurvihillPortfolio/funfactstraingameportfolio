const _DRAWER_WIDTH = 240;

const _TRIP_LENGTHS = {
    Boston: {
        Chicago: 850,
        Washington: 395,
        Columbus: 642,
        Atlanta: 937
    },
    Chicago: {
        Washington: 595,
        Columbus: 276,
        Atlanta: 590
    },
    Washington: {
        Columbus: 327,
        Atlanta: 542
    },
    Columbus: {
        Atlanta:570
    }
}

export { _DRAWER_WIDTH, _TRIP_LENGTHS };