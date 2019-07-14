import uuid from 'uuid';
import image1 from '../img/steamSide.jpg';
import jennyLind from '../img/jennylind.jpg';

export default [
    {
        trains: [    
            {
                trainId: uuid(),
                trainName: 'Illinois 201',
                trainImage: image1,       
                trainFacts: [ 
                    'Casey Jones was one of its engineers',
                    'On display at Illinois Railway Museum',
                    'Built in 1880, retired 1928'
                ]
            },
            {
                trainId: uuid(),
                trainName: 'Jenny Lind',
                trainImage: jennyLind,
                trainFacts: [
                    'Named after Jenny Lind, who was a famous opera singer of the period.',
                    'Due to advancements in suspension, it steamed freely and was economical on fuel.',
                    'Standard gauge locomotive buit in 1847'
                ]
            }

        ],
        contracts: [
            {
                from: '',
                to: '',
                payment: '',
                units: '',
                cargo: 'passengers',
                accepted: 'false'
            }
        ],
        companyInfo: [
            {
                companyName: '',
                companyId: '',
                userId: '',
                money: '',
                inceptionDate: ''
            }
        ]       
    }
]





// export default [
//     {
//         trainId: uuid(),
//         trainName: 'Illinois Central 201',
//         trainImage: image1,
//         trainFacts: [ 
//             'Casey Jones was one of its engineers',
//             'On display at Illinois Railway Museum',
//             'Built in 1880, retired 1928'
//         ]
//     },
//     {
//         trainId: uuid(),
//         trainName: 'Jenny Lind',
//         trainImage: jennyLind,
//         trainFacts: [ 
//             'Named after Jenny Lind, who was a famous opera singer of the period',
//             'Due to advancements in suspension, it steamed freely and was economical on fuel.',
//             'Built in 1847, gauge: standard gauge'
//         ]
//     }
// ];
