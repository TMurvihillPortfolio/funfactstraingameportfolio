
import illinoisCentral201 from '../img/illinoisCentral201.jpg';
import jennyLind from '../img/jennylind.jpg';

import wheat from '../img/wheat.jpg';
import textiles from '../img/textiles.jpg';
import coal from '../img/coal.jpg';
import milk from '../img/milk.jpg';

const _DRAWER_WIDTH = 240;

const _TRAIN_DETAILS = [
    {
        trainId: '0001-illcent201',
        trainName: 'Illinois Central 201',
        pathName: 'illinoiscentral201',
        trainImage: illinoisCentral201,       
        trainFacts: [ 
            'Casey Jones was one of its engineers',
            'On display at Illinois Railway Museum',
            'Built in 1880, retired 1928'
        ]
    },
    {
        trainId: '0002-jennylind',
        trainName: 'Jenny Lind',
        pathName: 'jennylind',
        trainImage: jennyLind,
        trainFacts: [
            'Named after Jenny Lind, who was a famous opera singer of the period.',
            'Due to advancements in suspension, it steamed freely and was economical on fuel.',
            'Standard gauge locomotive buit in 1847'
        ]
    }
]
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

export { _DRAWER_WIDTH, _TRIP_LENGTHS, _TRAIN_DETAILS };