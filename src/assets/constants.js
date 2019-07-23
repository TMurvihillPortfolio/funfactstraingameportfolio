
import illinoisCentral201 from '../img/illinoisCentral201.jpg';
import jennyLind from '../img/jennylind.jpg';
import jupiter from '../img/jupiter.jpg';

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
    },
    {
        trainId: '0003-jupiter',
        trainName: 'Jupiter',
        pathName: 'jupiter',
        trainImage: jupiter,
        trainFacts: [
            'Built in 1868 by the Schenectady Locomotive Works of New York.',
            'Dismantled and sailed to San Francisco where it was reassembled and put into service.',
            'The Jupiter was one of the locomotives that met when the trans-continental (USA) railroad was completed in 1869.'
        ]
    }
]
const _CARGO_TYPES = [
    {         
        name: 'coal',
        image: coal,
        cargoFacts:  [
            'Anthracite (or "hard" coal), clean and smokeless, became the preferred fuel in cities, replacing wood by about 1850.',
            'After 1850 soft coal, which is cheaper but dirtier, came into demand for railway locomotives and stationary steam engines.',
            'Coal output soared until 1918 going from 8.4 million short tons in 1850 to 40 million in 1870, 270 million in 1900, and peaking at 680 million short tons in 1918.'
        ]
    },
    {
        name: 'wheat',
        image: wheat,
        cargoFacts:  [
            'FunFact one about wheat',
            'FunFact two about wheat',
            'FunFact three about wheat'
        ]
    },
    {
        name: 'milk',
        image: milk,
        cargoFacts:  [
            'FunFact one about milk',
            'FunFact two about milk',
            'FunFact three about milk'
        ]
    },
    {
        name: 'textiles',
        image: textiles,
        cargoFacts:  [
            'Sewing machines emerged in the 19th century[56] streamlining clothing production.',
            'In the early 1800s advances in transportation resulted in increasing quantities of textiles produced in far-away factories rather than produced locally.',
            'The vast majority of the people working in these factories were women.'
        ]
    }
];
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
export { _DRAWER_WIDTH, _TRIP_LENGTHS, _TRAIN_DETAILS, _CARGO_TYPES };