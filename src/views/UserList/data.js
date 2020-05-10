import uuid from 'uuid/v1';

export default {
  stock: {
    componentsAvailable: [
      'capacitor',
      'resistor',
      'led',
      'diode',
      'aop',
      'pot',
      'trimpot',
      'transistor',
      'socket',
      'switch',
      'plug',
      'enclosure'
    ],

    componentsStock: {
      resistor: {
        typeAvailable: ['Ω', 'kΩ', 'MΩ'],
        ohm: [
          {
            value: '1 Ω',
            stock: 1
          },
          {
            value: '2,2 Ω',
            stock: 1
          },
          {
            value: '4,7 Ω',
            stock: 1
          },
          {
            value: '5,6 Ω',
            stock: 1
          },
          {
            value: '7,5 Ω',
            stock: 1
          },
          {
            value: '8,2 Ω',
            stock: 1
          },
          {
            value: '10 Ω',
            stock: 1
          },
          {
            value: '15 Ω',
            stock: 1
          },
          {
            value: '22 Ω',
            stock: 1
          },
          {
            value: '27 Ω',
            stock: 1
          },
          {
            value: '33 Ω',
            stock: 1
          },
          {
            value: '39 Ω',
            stock: 1
          },
          {
            value: '47 Ω',
            stock: 1
          },
          {
            value: '56 Ω',
            stock: 1
          },
          {
            value: '68 Ω',
            stock: 1
          },
          {
            value: '75 Ω',
            stock: 1
          },
          {
            value: '82 Ω',
            stock: 1
          },
          {
            value: '100 Ω',
            stock: 1
          },
          {
            value: '120 Ω',
            stock: 1
          },
          {
            value: '150 Ω',
            stock: 1
          },
          {
            value: '180 Ω',
            stock: 1
          },
          {
            value: '220 Ω',
            stock: 1
          },
          {
            value: '270 Ω',
            stock: 1
          },
          {
            value: '330 Ω',
            stock: 1
          },
          {
            value: '390 Ω',
            stock: 1
          },
          {
            value: '470 Ω',
            stock: 1
          },
          {
            value: '510 Ω',
            stock: 1
          },
          {
            value: '560 Ω',
            stock: 1
          },
          {
            value: '680 Ω',
            stock: 1
          },
          {
            value: '820 Ω',
            stock: 1
          }
        ],
        kOhm: [
          {
            value: '1 kΩ',
            stock: 1
          },
          {
            value: '1,2 kΩ',
            stock: 1
          },
          {
            value: '1,5 kΩ',
            stock: 1
          },
          {
            value: '2,2 kΩ',
            stock: 1
          },
          {
            value: '3 kΩ',
            stock: 1
          },
          {
            value: '3,3 kΩ',
            stock: 1
          },
          {
            value: '3,9 kΩ',
            stock: 1
          },
          {
            value: '4,7 kΩ',
            stock: 1
          },
          {
            value: '5,1kΩ',
            stock: 1
          },
          {
            value: '5,6kΩ',
            stock: 1
          },
          {
            value: '6,8 kΩ',
            stock: 1
          },
          {
            value: '7,5 kΩ',
            stock: 1
          },
          {
            value: '8,2 kΩ',
            stock: 1
          },
          {
            value: '9,1 kΩ',
            stock: 1
          },
          {
            value: '10 kΩ',
            stock: 1
          },
          {
            value: '12 kΩ',
            stock: 1
          },
          {
            value: '15 kΩ',
            stock: 1
          },
          {
            value: '18 kΩ',
            stock: 1
          },
          {
            value: '22 kΩ',
            stock: 1
          },
          {
            value: '33 kΩ',
            stock: 1
          },
          {
            value: '39 kΩ',
            stock: 1
          },
          {
            value: '47 kΩ',
            stock: 1
          },
          {
            value: '51 kΩ',
            stock: 1
          },
          {
            value: '56 kΩ',
            stock: 1
          },
          {
            value: '68 kΩ',
            stock: 1
          },
          {
            value: '75 kΩ',
            stock: 1
          },
          {
            value: '82 kΩ',
            stock: 1
          },
          {
            value: '100 kΩ',
            stock: 1
          },
          {
            value: '120 kΩ',
            stock: 1
          },
          {
            value: '150 kΩ',
            stock: 1
          },
          {
            value: '180 kΩ',
            stock: 1
          },
          {
            value: '220 kΩ',
            stock: 1
          },
          {
            value: '330 kΩ',
            stock: 1
          },
          {
            value: '470 kΩ',
            stock: 1
          },
          {
            value: '510 kΩ',
            stock: 1
          },
          {
            value: '560 kΩ',
            stock: 1
          },
          {
            value: '680 kΩ',
            stock: 1
          },
          {
            value: '820 kΩ',
            stock: 1
          }
        ],
        mOhm: [
          {
            value: '1 MΩ',
            stock: 1
          },
          {
            value: '1,5 MΩ',
            stock: 1
          },
          {
            value: '2 MΩ',
            stock: 1
          },
          {
            value: '2,2 MΩ',
            stock: 1
          },
          {
            value: '3,3 MΩ',
            stock: 1
          },
          {
            value: '4,7 MΩ',
            stock: 1
          },
          {
            value: '5,6 MΩ',
            stock: 1
          },
          {
            value: '10 MΩ',
            stock: 1
          }
        ]
      },
      capacitor: {
        typeAvailable: ['film', 'electrolytic', 'ceramic'],
        film: [
          {
            value: '1 nF',
            stock: 1
          },
          {
            value: '2,2 nF',
            stock: 1
          },
          {
            value: '3,3 nF',
            stock: 1
          },
          {
            value: '4,7nF',
            stock: 1
          },
          {
            value: '10 nF',
            stock: 1
          },
          {
            value: '22 nF',
            stock: 1
          },
          {
            value: '39 nF',
            stock: 1
          },
          {
            value: '47 nF',
            stock: 1
          },
          {
            value: '68 nF',
            stock: 1
          },
          {
            value: '100 nF',
            stock: 1
          },
          {
            value: '220 nF',
            stock: 1
          },
          {
            value: '680 nF',
            stock: 1
          },
          {
            value: '1 µF',
            stock: 1
          }
        ],
        electrolytic: [
          {
            value: '1µF',
            stock: 1
          },
          {
            value: '2,2µF',
            stock: 1
          },
          {
            value: '4,7µF',
            stock: 1
          },
          {
            value: '10 µF',
            stock: 1
          },
          {
            value: '22 µF',
            stock: 1
          },
          {
            value: '33 µF',
            stock: 1
          },
          {
            value: '47 µF',
            stock: 1
          },
          {
            value: '100 µF',
            stock: 1
          }
        ],
        ceramic: [
          {
            value: '10 pF',
            stock: 1
          },
          {
            value: '22 pF',
            stock: 1
          },
          {
            value: '47 pF',
            stock: 1
          },
          {
            value: '100 pF',
            stock: 1
          },
          {
            value: '120 pF',
            stock: 1
          },
          {
            value: '150 pF',
            stock: 1
          },
          {
            value: '220 pF',
            stock: 1
          },
          {
            value: '470 pF',
            stock: 1
          }
        ]
      },
      led: {
        typeAvailable: [],
        values: [
          {
            value: 'Rouge3mm',
            stock: 1
          },
          {
            value: 'Rouge5mm',
            stock: 1
          },
          {
            value: 'Verte5mm',
            stock: 1
          },
          {
            value: 'Jaune5mm',
            stock: 1
          },
          {
            value: 'Bezel',
            stock: 1
          },
          {
            value: 'Blanche 5mm',
            stock: 1
          }
        ]
      },
      diode: {
        typeAvailable: [],
        values: [
          {
            value: '9,1v Zener',
            stock: 1
          },
          {
            value: '1N5817',
            stock: 1
          },
          {
            value: '1N4001',
            stock: 1
          },
          {
            value: '1N4148',
            stock: 1
          },
          {
            value: '1N34A',
            stock: 1
          },
          {
            value: '1N914',
            stock: 1
          },
          {
            value: 'BAT46',
            stock: 1
          }
        ]
      },
      aop: {
        typeAvailable: [],
        values: [
          {
            value: 'LM1458',
            stock: 1
          },
          {
            value: 'LM386',
            stock: 1
          },
          {
            value: 'LT1054',
            stock: 1
          },
          {
            value: 'TL072',
            stock: 1
          },
          {
            value: 'TL082',
            stock: 1
          }
        ]
      },
      pot: {
        typeAvailable: ['A', 'B', 'C'],
        a: [
          {
            value: '25k',
            stock: 1
          },
          {
            value: '50k',
            stock: 1
          },
          {
            value: '100k',
            stock: 1
          },
          {
            value: '250k',
            stock: 1
          },
          {
            value: '500k',
            stock: 1
          },
          {
            value: '1M',
            stock: 1
          }
        ],
        b: [
          {
            value: '1k',
            stock: 1
          },
          {
            value: '2k',
            stock: 1
          },
          {
            value: '5k',
            stock: 1
          },
          {
            value: '10k',
            stock: 1
          },
          {
            value: '20k',
            stock: 1
          },
          {
            value: '25k',
            stock: 1
          },
          {
            value: '50k',
            stock: 1
          },
          {
            value: '100k',
            stock: 1
          },
          {
            value: '250k',
            stock: 1
          },
          {
            value: '500k',
            stock: 1
          },
          {
            value: '1M',
            stock: 1
          }
        ],
        c: [
          {
            value: '1k',
            stock: 1
          },
          {
            value: '10k',
            stock: 1
          },
          {
            value: '100k',
            stock: 1
          }
        ]
      },
      trimpot: {
        typeAvailable: [],
        values: [
          {
            value: '5k',
            stock: 1
          },
          {
            value: '10k',
            stock: 1
          },
          {
            value: '50 K',
            stock: 1
          },
          {
            value: '100K',
            stock: 1
          }
        ]
      },
      transistor: {
        typeAvailable: [],
        values: [
          {
            value: '2N2646',
            stock: 1
          },
          {
            value: '2N3906',
            stock: 1
          },
          {
            value: '2N5088',
            stock: 1
          },
          {
            value: '2N5089',
            stock: 1
          },
          {
            value: '2N5457',
            stock: 1
          },
          {
            value: '2SC1815',
            stock: 1
          },
          {
            value: 'BC108C',
            stock: 1
          },
          {
            value: 'J201',
            stock: 1
          },
          {
            value: 'MPSA13',
            stock: 1
          },
          {
            value: 'MPSA18',
            stock: 1
          },
          {
            value: 'BS170',
            stock: 1
          },
          {
            value: '2N7000',
            stock: 1
          }
        ]
      },
      socket: {
        typeAvailable: [],
        values: [
          {
            value: '8 pin',
            stock: 1
          },
          {
            value: '1 pin',
            stock: 1
          }
        ]
      },
      switch: {
        typeAvailable: [],
        values: [
          {
            value: '3PDT',
            stock: 1
          },
          {
            value: 'SPST',
            stock: 1
          },
          {
            value: 'SPDT',
            stock: 1
          }
        ]
      },
      plug: {
        typeAvailable: [],
        values: [
          {
            value: 'Jack mono',
            stock: 1
          },
          {
            value: 'Jack stéréo',
            stock: 1
          },
          {
            value: '9V DC',
            stock: 1
          }
        ]
      },
      enclosure: {
        typeAvailable: [],
        values: [
          {
            value: '1590A',
            stock: 1
          },
          {
            value: '125B',
            stock: 1
          }
        ]
      }
    }
  }
};
