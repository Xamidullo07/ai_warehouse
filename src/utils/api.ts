import type { Country, PaginatedResponse, SearchParams, Statistics } from '../types';

// Enhanced mock data with landmarks and coordinates
const mockCountries: Country[] = [
  {
    id: 1,
    name: "O'zbekiston",
    capital: "Toshkent",
    population: 34915000,
    area: 447400,
    flag: "https://flagcdn.com/w320/uz.png",
    language: "uz",
    region: "Osiyo",
    subregion: "Markaziy Osiyo",
    continent: "Asia",
    currency: "UZS",
    timezone: "UTC+5",
    independent: true,
    unMember: true,
    landlocked: true,
    borders: ["AFG", "KAZ", "KGZ", "TJK", "TKM"],
    coordinates: { lat: 41.3775, lng: 64.5853 },
    landmarks: [
      {
        id: "uz-1",
        name: "Registon maydoni",
        description: "Samarkandning markaziy me'moriy ansambli",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        coordinates: { lat: 39.6542, lng: 66.9597 },
        type: "historical",
        city: "Samarkand"
      },
      {
        id: "uz-2",
        name: "Ichan-Qal'a",
        description: "Xivaning qadimiy qal'asi",
        image: "https://images.unsplash.com/photo-1559628233-100c798642d3?w=400",
        coordinates: { lat: 41.3775, lng: 60.3593 },
        type: "historical",
        city: "Xiva"
      },
      {
        id: "uz-3",
        name: "Amir Temur maqbarasi",
        description: "Buyuk temuriy hukmdor maqbarasi",
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400",
        coordinates: { lat: 39.6470, lng: 66.9760 },
        type: "historical",
        city: "Samarkand"
      }
    ]
  },
  {
    id: 2,
    name: "United States",
    capital: "Washington, D.C.",
    population: 331900000,
    area: 9833517,
    flag: "https://flagcdn.com/w320/us.png",
    language: "en",
    region: "Americas",
    subregion: "North America",
    continent: "North America",
    currency: "USD",
    timezone: "UTC-5 to UTC-10",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: ["CAN", "MEX"],
    coordinates: { lat: 38.9072, lng: -77.0369 },
    landmarks: [
      {
        id: "us-1",
        name: "Statue of Liberty",
        description: "Ozodlik haykali",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
        coordinates: { lat: 40.6892, lng: -74.0445 },
        type: "historical",
        city: "New York"
      },
      {
        id: "us-2",
        name: "Golden Gate Bridge",
        description: "San-Fransiskoning mashhur ko'prigi",
        image: "https://images.unsplash.com/photo-1505832018823-50331d49d2d1?w=400",
        coordinates: { lat: 37.8199, lng: -122.4783 },
        type: "modern",
        city: "San Francisco"
      },
      {
        id: "us-3",
        name: "Grand Canyon",
        description: "Katta darasi tabiiy go'zallik",
        image: "https://images.unsplash.com/photo-1611667214289-5c1a8f3c5c2f?w=400",
        coordinates: { lat: 36.1069, lng: -112.1129 },
        type: "natural",
        city: "Arizona"
      }
    ]
  },
  {
    id: 3,
    name: "Россия",
    capital: "Москва",
    population: 146170000,
    area: 17098242,
    flag: "https://flagcdn.com/w320/ru.png",
    language: "ru",
    region: "Yevropa",
    subregion: "Eastern Europe",
    continent: "Europe",
    currency: "RUB",
    timezone: "UTC+3 to UTC+12",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: ["NOR", "FIN", "EST", "LVA", "LTU", "POL", "BLR", "UKR", "GEO", "AZE", "KAZ", "CHN", "MNG", "PRK"],
    coordinates: { lat: 55.7558, lng: 37.6173 },
    landmarks: [
      {
        id: "ru-1",
        name: "Qizil maydon",
        description: "Moskvaning markaziy maydoni",
        image: "https://images.unsplash.com/photo-1559628233-100c798642d3?w=400",
        coordinates: { lat: 55.7539, lng: 37.6208 },
        type: "historical",
        city: "Moscow"
      },
      {
        id: "ru-2",
        name: "Hermitage",
        description: "Sankt-Peterburgdagi mashhur muzey",
        image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400",
        coordinates: { lat: 59.9343, lng: 30.3351 },
        type: "cultural",
        city: "Saint Petersburg"
      }
    ]
  },
  {
    id: 4,
    name: "France",
    capital: "Paris",
    population: 67390000,
    area: 643801,
    flag: "https://flagcdn.com/w320/fr.png",
    language: "fr",
    region: "Yevropa",
    subregion: "Western Europe",
    continent: "Europe",
    currency: "EUR",
    timezone: "UTC+1",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: ["BEL", "LUX", "DEU", "CHE", "ITA", "MCO", "AND", "ESP"],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    landmarks: [
      {
        id: "fr-1",
        name: "Eiffel Tower",
        description: "Parijning ramzi",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400",
        coordinates: { lat: 48.8584, lng: 2.2945 },
        type: "historical",
        city: "Paris"
      },
      {
        id: "fr-2",
        name: "Luvre",
        description: "Jahondagi eng katta muzey",
        image: "https://images.unsplash.com/photo-1566479179817-7a1f0e8b7e2e?w=400",
        coordinates: { lat: 48.8606, lng: 2.3376 },
        type: "cultural",
        city: "Paris"
      },
      {
        id: "fr-3",
        name: "Versal",
        description: "Qirollik saroyi",
        image: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400",
        coordinates: { lat: 48.8049, lng: 2.1204 },
        type: "historical",
        city: "Versailles"
      }
    ]
  },
  {
    id: 5,
    name: "Japan",
    capital: "Tokyo",
    population: 125800000,
    area: 377975,
    flag: "https://flagcdn.com/w320/jp.png",
    language: "ja",
    region: "Osiyo",
    subregion: "Eastern Asia",
    continent: "Asia",
    currency: "JPY",
    timezone: "UTC+9",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: [],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    landmarks: [
      {
        id: "jp-1",
        name: "Fuji tog'i",
        description: "Yaponiyaning eng baland tog'i",
        image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400",
        coordinates: { lat: 35.3606, lng: 138.7274 },
        type: "natural",
        city: "Fujinomiya"
      },
      {
        id: "jp-2",
        name: "Tokio minorasi",
        description: "Tokioning mashhur minorasi",
        image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400",
        coordinates: { lat: 35.6586, lng: 139.7454 },
        type: "modern",
        city: "Tokyo"
      },
      {
        id: "jp-3",
        name: "Fushimi Inari",
        description: "Minglab darvoza ibodatxonasi",
        image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400",
        coordinates: { lat: 34.9671, lng: 135.7727 },
        type: "cultural",
        city: "Kyoto"
      }
    ]
  },
  {
    id: 6,
    name: "Italy",
    capital: "Rome",
    population: 59554023,
    area: 301336,
    flag: "https://flagcdn.com/w320/it.png",
    language: "it",
    region: "Yevropa",
    subregion: "Southern Europe",
    continent: "Europe",
    currency: "EUR",
    timezone: "UTC+1",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: ["FRA", "SMR", "CHE", "AUT", "SVN", "VAT"],
    coordinates: { lat: 41.9028, lng: 12.4964 },
    landmarks: [
      {
        id: "it-1",
        name: "Kolizey",
        description: "Qadim Rim amfiteatri",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b3?w=400",
        coordinates: { lat: 41.8902, lng: 12.4922 },
        type: "historical",
        city: "Rome"
      },
      {
        id: "it-2",
        name: "Pisa minorasi",
        description: "Qiyalayotgan minora",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400",
        coordinates: { lat: 43.7230, lng: 10.3966 },
        type: "historical",
        city: "Pisa"
      },
      {
        id: "it-3",
        name: "Venetsiya kanallari",
        description: "Suv shahri",
        image: "https://images.unsplash.com/photo-1555401263-467d61afdb78?w=400",
        coordinates: { lat: 45.4408, lng: 12.3155 },
        type: "cultural",
        city: "Venice"
      }
    ]
  },
  {
    id: 7,
    name: "China",
    capital: "Beijing",
    population: 1412000000,
    area: 9596961,
    flag: "https://flagcdn.com/w320/cn.png",
    language: "zh",
    region: "Osiyo",
    subregion: "Eastern Asia",
    continent: "Asia",
    currency: "CNY",
    timezone: "UTC+8",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: ["AFG", "BTN", "MMR", "IND", "KAZ", "KGZ", "LAO", "MNG", "NPL", "PRK", "PAK", "RUS", "TJK", "VNM"],
    coordinates: { lat: 39.9042, lng: 116.4074 },
    landmarks: [
      {
        id: "cn-1",
        name: "Buyuk Xitoy devori",
        description: "Dunyoning eng uzun devori",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400",
        coordinates: { lat: 40.4319, lng: 116.5704 },
        type: "historical",
        city: "Beijing"
      },
      {
        id: "cn-2",
        name: "Taqinlangan shahar",
        description: "Imperatorlar shahri",
        image: "https://images.unsplash.com/photo-1548919175-b36508a0b3f3?w=400",
        coordinates: { lat: 39.9163, lng: 116.3972 },
        type: "historical",
        city: "Beijing"
      }
    ]
  },
  {
    id: 8,
    name: "Egypt",
    capital: "Cairo",
    population: 102334404,
    area: 1002450,
    flag: "https://flagcdn.com/w320/eg.png",
    language: "ar",
    region: "Africa",
    subregion: "Northern Africa",
    continent: "Africa",
    currency: "EGP",
    timezone: "UTC+2",
    independent: true,
    unMember: true,
    landlocked: false,
    borders: ["LBY", "SDN", "ISR", "ERI"],
    coordinates: { lat: 30.0444, lng: 31.2357 },
    landmarks: [
      {
        id: "eg-1",
        name: "Giza piramidalari",
        description: "Qadim Misrning buyuk inshootlari",
        image: "https://images.unsplash.com/photo-1539650116574-75d0279bd8bf?w=400",
        coordinates: { lat: 29.9792, lng: 31.1342 },
        type: "historical",
        city: "Giza"
      },
      {
        id: "eg-2",
        name: "Sfinks",
        description: "Buyuk Sfinks haykali",
        image: "https://images.unsplash.com/photo-1554224154-260325c05993?w=400",
        coordinates: { lat: 29.9756, lng: 31.1376 },
        type: "historical",
        city: "Giza"
      }
    ]
  }
];

// Enhanced API with statistics and sorting
export const countryApi = {
  getCountries: async (params: SearchParams = {}): Promise<PaginatedResponse<Country>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredCountries = [...mockCountries];
    
    // Apply search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredCountries = filteredCountries.filter(
        country => 
          country.name.toLowerCase().includes(searchTerm) ||
          country.capital.toLowerCase().includes(searchTerm) ||
          country.region?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply population filter
    if (params.population_min !== undefined) {
      filteredCountries = filteredCountries.filter(
        country => country.population >= params.population_min!
      );
    }
    if (params.population_max !== undefined) {
      filteredCountries = filteredCountries.filter(
        country => country.population <= params.population_max!
      );
    }
    
    // Apply area filter
    if (params.area_min !== undefined) {
      filteredCountries = filteredCountries.filter(
        country => country.area >= params.area_min!
      );
    }
    if (params.area_max !== undefined) {
      filteredCountries = filteredCountries.filter(
        country => country.area <= params.area_max!
      );
    }
    
    // Apply language filter
    if (params.language && params.language !== 'all') {
      filteredCountries = filteredCountries.filter(
        country => country.language === params.language
      );
    }
    
    // Apply region filter
    if (params.region && params.region !== 'all') {
      filteredCountries = filteredCountries.filter(
        country => country.region === params.region
      );
    }
    
    // Apply sorting
    if (params.sort_by) {
      filteredCountries.sort((a, b) => {
        const aValue = a[params.sort_by!];
        const bValue = b[params.sort_by!];
        
        if (params.sort_order === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    // Apply pagination
    const page = params.page || 1;
    const pageSize = 6;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredCountries.slice(startIndex, endIndex);
    
    return {
      count: filteredCountries.length,
      next: endIndex < filteredCountries.length ? `/api/countries/?page=${page + 1}` : null,
      previous: page > 1 ? `/api/countries/?page=${page - 1}` : null,
      results: paginatedResults
    };
  },
  
  getCountry: async (id: number): Promise<Country> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const country = mockCountries.find(c => c.id === id);
    if (!country) throw new Error('Country not found');
    return country;
  },
  
  getStatistics: async (): Promise<Statistics> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const totalCountries = mockCountries.length;
    const totalPopulation = mockCountries.reduce((sum, c) => sum + c.population, 0);
    const totalArea = mockCountries.reduce((sum, c) => sum + c.area, 0);
    const averagePopulation = Math.round(totalPopulation / totalCountries);
    const averageArea = Math.round(totalArea / totalCountries);
    
    const mostPopulated = mockCountries.reduce((max, c) => 
      c.population > max.population ? c : max, mockCountries[0]);
    const largestArea = mockCountries.reduce((max, c) => 
      c.area > max.area ? c : max, mockCountries[0]);
    const smallestArea = mockCountries.reduce((min, c) => 
      c.area < min.area ? c : min, mockCountries[0]);
    
    const languagesCount: Record<string, number> = {};
    const regionsCount: Record<string, number> = {};
    
    mockCountries.forEach(country => {
      languagesCount[country.language] = (languagesCount[country.language] || 0) + 1;
      if (country.region) {
        regionsCount[country.region] = (regionsCount[country.region] || 0) + 1;
      }
    });
    
    return {
      totalCountries,
      totalPopulation,
      totalArea,
      averagePopulation,
      averageArea,
      mostPopulated,
      largestArea,
      smallestArea,
      languagesCount,
      regionsCount
    };
  },
  
  createCountry: async (country: Omit<Country, 'id'>): Promise<Country> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCountry = { ...country, id: mockCountries.length + 1 };
    mockCountries.push(newCountry);
    return newCountry;
  },
  
  updateCountry: async (id: number, country: Partial<Country>): Promise<Country> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockCountries.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Country not found');
    mockCountries[index] = { ...mockCountries[index], ...country };
    return mockCountries[index];
  },
  
  deleteCountry: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockCountries.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Country not found');
    mockCountries.splice(index, 1);
  }
};