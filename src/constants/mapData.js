import {GlobalStyles} from "./styles";

const Images = [
  {image: require("../../assets/images/central-library-two.png")},
  {image: require("../../assets/images/west-campus.png")},
  {image: require("../../assets/images/SEL.png")},
  {image: require("../../assets/images/basement.png")},
  {image: require("../../assets/images/data-cave.png")},
  {image: require("../../assets/images/fablab.png")},
  {image: require("../../assets/images/special-collections.png")},
  {image: require("../../assets/images/the-studios.png")},
];

export const markers = [
  {
    coordinate: {
      latitude: 32.72974355290265,
      longitude: -97.11291036869027,
    },
    title: "Central Library",
    description:
      "The Central Library is normally open 24 hours and contains numerous study spaces for quiet or collaborative study. Get help in the Academic Plaza or create something new in The Studios or FabLab. Our Special Collections on the 6th floor holds more than 1,500 archives and manuscript collections, primarily in Texas history, cartography, and the U.S.-Mexico War. When you need a break, visit the Market or Einstein Bros. Bagels for a snack. See Central Library Services Floor by Floor.",
    pinColor: GlobalStyles.colors.primary800,
    image: Images[0].image,
    address: "702 Planetarium Pl., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.73125879417564,
      longitude: -97.11622791593008,
    },
    title: "West Campus Library",
    floor: "CAPPA Building- First Floor",
    description:
      "Located on the first floor of the CAPPA building, the West Campus Library (formerly AFA Library) holds a core print collection and digital research resources related to art, architecture, and music. It includes a study room with LCD display/web gateway and whiteboard that can be reserved in advance for 1-4 people.",
    pinColor: GlobalStyles.colors.primary800,
    image: Images[1].image,
    address: "601 W. Nedderman Dr., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.73224798246025,
      longitude: -97.11399622937024,
    },
    title: "Science and Engineering Library",
    floor: "Nedderman Hall - Basement Floor",
    description:
      "Located in the basement of Nedderman Hall, the SEL holds a core print collection and digital research resources related to science and engineering. The SEL also has several group study rooms that may be reserved by the hour, some with LCD display and whiteboards. ",
    pinColor: GlobalStyles.colors.primary800,
    image: Images[2].image,
    address: "416 S. Yates St., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.72944833832764,
      longitude: -97.11312208324671,
    },
    title: "The Basement",
    floor: "Central Library - Basement Floor",
    description:
      "Central Library is home to a new gaming space! The Basement gives students a space to relax between classes while honing their critical thinking skills. ",
    pinColor: GlobalStyles.colors.primary50,
    image: Images[3].image,
    address: "702 Planetarium Pl., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.729431133560055,
      longitude: -97.11275193840265,
    },
    title: "DataCave",
    floor: "Central Library - Basement Floor",
    description:
      "Located in the Basement of Central Library (Room B29E), the DataCave provides support and services centering on data-driven research, e-science, and digital humanities data analysis. The DataCave is open whenever the Central Library is open. Consultations are available 9am-6pm or schedule an online appointment.",
    pinColor: GlobalStyles.colors.primary50,
    image: Images[4].image,
    address: "702 Planetarium Pl., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.72997491542801,
      longitude: -97.11310464888811,
    },
    title: "FabLab",
    floor: "Central Library - First Floor",
    description:
      "The FabLab fabrication laboratory on the first floor of Central Library is a creative hub for students, faculty, and staff, providing access to technologies, equipment, training, opportunities for interdisciplinary collaboration, and inspirational spaces in support of invention and entrepreneurship. This is hands-on learning at its best, for learners from any discipline or experience level.",
    pinColor: GlobalStyles.colors.primary50,
    image: Images[5].image,
    address: "702 Planetarium Pl., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.7299543262372,
      longitude: -97.11273919790983,
    },
    title: "Special Collections",
    floor: "Central Library - Sixth Floor",
    description:
      "Located on the sixth floor of Central Library, Special Collections offers a variety of physical and digital exhibitions throughout the year. The collections are also available to students, faculty, and guest scholars upon written request. For Special Collections related instruction, please contact Evan Spencer.",
    pinColor: GlobalStyles.colors.primary50,
    image: Images[6].image,
    address: "702 Planetarium Pl., Arlington, TX",
  },
  {
    coordinate: {
      latitude: 32.729466953318344,
      longitude: -97.11294505745173,
    },
    title: "The Studios",
    floor: "Central Library - First Floor",
    description:
      "The Studios provide Mavericks with opportunities to create digital art and audio projects and optional consultation assistance provided by knowledgeable students and full-time staff.",
    pinColor: GlobalStyles.colors.primary50,
    image: Images[7].image,
    address: "702 Planetarium Pl., Arlington, TX",
  },
];

export const polygons = [
  [
    {latitude: 32.72939670657606, longitude: -97.11315374945787},
    {latitude: 32.72997618387279, longitude: -97.11315334364396},
    {latitude: 32.73001581175181, longitude: -97.11315426975489},
    {latitude: 32.73001440153406, longitude: -97.11268790066242},
    {latitude: 32.72939813589272, longitude: -97.11269111371703},
  ],
  [
    {latitude: 32.730812017131235, longitude: -97.11619891226292},
    {latitude: 32.730864476747115, longitude: -97.11619958281517},
    {latitude: 32.73086898940082, longitude: -97.1162585914135},
    {latitude: 32.73178082279974, longitude: -97.11624685674906},
    {latitude: 32.731782515027525, longitude: -97.11619321256876},
    {latitude: 32.731866562299345, longitude: -97.11619086563587},
    {latitude: 32.731860075432195, longitude: -97.11594745516777},
    {latitude: 32.73160736928359, longitude: -97.1159477904439},
    {latitude: 32.731609061514625, longitude: -97.11601383984089},
    {latitude: 32.73105570024685, longitude: -97.11602222174406},
    {latitude: 32.73105513616634, longitude: -97.11597494781017},
    {latitude: 32.73080553018735, longitude: -97.11597729474306},
  ],
  [
    {latitude: 32.732073295687854, longitude: -97.11392808705568},
    {latitude: 32.73207385976192, longitude: -97.11400385946035},
    {latitude: 32.73197909526742, longitude: -97.11400453001261},
    {latitude: 32.73223941534835, longitude: -97.11428716778755},
    {latitude: 32.73223969738488, longitude: -97.11418088525534},
    {latitude: 32.7323288208779, longitude: -97.11418591439724},
    {latitude: 32.7323254364431, longitude: -97.11353681981564},
    {latitude: 32.732254645318726, longitude: -97.11353413760662},
    {latitude: 32.73225041477168, longitude: -97.11344294250011},
    {latitude: 32.732037476976835, longitude: -97.11368501186371},
    {latitude: 32.732073295687854, longitude: -97.11368937045336},
    {latitude: 32.732071321428556, longitude: -97.11377184838057},
    {latitude: 32.732038887162595, longitude: -97.1137735247612},
    {latitude: 32.73203691290254, longitude: -97.11392372846603},
  ],
];
