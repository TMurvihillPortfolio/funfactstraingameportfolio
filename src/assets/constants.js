import illinoisCentral201 from '../img/illinoisCentral201.jpg';
import jennyLind from '../img/jennylind.jpg';
import jupiter from '../img/jupiter.jpg';
import wheat from '../img/wheat.jpg';
import textiles from '../img/textiles.jpg';
import coal from '../img/coal.jpg';
import milk from '../img/milk.jpg';

const _DRAWER_WIDTH = 250;
const _CONTRACTOFFER_INTERVAL = 1000;
const _MEDIA_QUERIES = {
    down(size){
        const sizes = {
            xs: '576px',
            sm: '768px',
            md: '992px',
            lg: '1200px'
        }
        return `@media (max-width: ${sizes[size]})`
    }
}
const _TRAIN_DETAILS = [
    {
        trainId: '0001-illcent201',
        trainName: 'Illinois Central 201',
        pathName: 'illinoiscentral201',
        trainImage: illinoisCentral201,
        trainCost: 200,     
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
        trainCost: 150,
        trainFacts: [
            'Standard gauge locomotive buit in 1847',
            'Due to advancements in suspension, it steamed freely and was economical on fuel.',
            'Named after Jenny Lind, who was a famous opera singer of the period.'           
        ]
    },
    {
        trainId: '0003-jupiter',
        trainName: 'Jupiter',
        pathName: 'jupiter',
        trainImage: jupiter,
        trainCost: 300,
        trainFacts: [
            'Built in 1868 by the Schenectady Locomotive Works of New York.',
            'Dismantled and sailed to San Francisco where it was reassembled and put into service.',
            'One of the locomotives that met when the trans-continental (USA) railroad was completed in 1869.'
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
            'In 1830, it took four people and two oxen, working 10 hours a day, to produce 200 bushels.',
            'By 1852, the Galena and Chicago Union railroad supplied Chicago over half of its wheat. This statistic changed the way people thought about the environment and its railways because railways through the countryside provided Chicagoans with increased wealth.',
            'Transcontinental railroads were built in the South (Southern Pacific, Santa Fe) and in the North along the Canada–US border (Northern Pacific, Great Northern), accelerating the settlement of the West by carrying pioneers and supplies westward, and cattle, wheat and minerals eastward.'
        ]
    },
    {
        name: 'milk',
        image: milk,
        cargoFacts:  [
            'Railroads connecting rural dairy-producing areas to cities scheduled daily milk trains (sometimes called milk runs) to pick up loaded milk cars from collection points along their route.',
            'Milk trains usually arrived at their destination cities in the late evening so the milk could be unloaded and processed for delivery the following morning.',
            'A returning train of empty milk cars departed the city in the early morning hours and was often the last scheduled passenger train serving those rural areas.'
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
};
const _CITY_ABBR = {
    Chicago: 'chi',
    Columbus: 'col',
    NewYork: 'nyc',
    Boston: 'bos',
    Washington: 'was',
    Atlanta: 'atl'
};
const _INITIAL_COMPANYDATA = [{
    trains: [],
    contracts:  [
            {
                id: 'f859306a-cce8-47b9-9a65-f9363396116d',
                pathName: 'coal1_chicago_newyork16',
                from: 'Chicago',
                to: 'NewYork',
                payment: '16',
                units: '1',
                cargo: 'coal',
                status: 'offered'
            }
        ],
    financials: {
            cash: 10000,
            loan: 2000
        }
}]   
export { 
    _DRAWER_WIDTH, 
    _TRIP_LENGTHS, 
    _TRAIN_DETAILS, 
    _CARGO_TYPES, 
    _CITY_ABBR, 
    _INITIAL_COMPANYDATA,
    _MEDIA_QUERIES,
    _CONTRACTOFFER_INTERVAL
};