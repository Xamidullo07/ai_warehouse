export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('uz-UZ').format(num);
};

export const formatArea = (area: number): string => {
  if (area >= 1000000) {
    return `${(area / 1000000).toFixed(1)}M km²`;
  } else if (area >= 1000) {
    return `${(area / 1000).toFixed(1)}K km²`;
  }
  return `${area} km²`;
};

export const formatPopulation = (population: number): string => {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(1)}B`;
  } else if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
};

export const translations = {
  uz: {
    title: 'Davlatlar ma\'lumotlari',
    subtitle: 'Jahon davlatlari haqida to\'liq ma\'lumot',
    search: 'Qidiruv...',
    filter: 'Filter',
    statistics: 'Statistika',
    name: 'Nomi',
    capital: 'Poytaxt',
    population: 'Aholi',
    area: 'Maydon',
    language: 'Til',
    region: 'Region',
    subregion: 'Subregion',
    currency: 'Valyuta',
    timezone: 'Vaqtni mintaqasi',
    independent: 'Mustaqil',
    unMember: 'BMT a\'zosi',
    landlocked: 'Quruqlik bilan o\'ralgan',
    searchPlaceholder: 'Davlat, poytaxt yoki region nomi...',
    populationMin: 'Aholi (min)',
    populationMax: 'Aholi (max)',
    areaMin: 'Maydon (min, km²)',
    areaMax: 'Maydon (max, km²)',
    apply: 'Qo\'llash',
    reset: 'Tozalash',
    previous: 'Oldingi',
    next: 'Keyingi',
    noResults: 'Natijalar topilmadi',
    loading: 'Yuklanmoqda...',
    error: 'Xatolik yuz berdi',
    totalCountries: 'Jami davlatlar',
    totalPopulation: 'Jami aholi',
    totalArea: 'Jami maydon',
    averagePopulation: 'O\'rtacha aholi',
    averageArea: 'O\'rtacha maydon',
    mostPopulated: 'Eng ko\'p aholisi bor',
    largestArea: 'Eng katta maydon',
    smallestArea: 'Eng kichik maydon',
    sortBy: 'Saralash',
    sortOrder: 'Tartib',
    ascending: 'O\'sish',
    descending: 'Kamayish',
    all: 'Barchasi',
    borders: 'Qo\'shni davlatlar',
    details: 'Batafsil'
  },
  en: {
    title: 'Country Information',
    subtitle: 'Complete information about world countries',
    search: 'Search...',
    filter: 'Filter',
    statistics: 'Statistics',
    name: 'Name',
    capital: 'Capital',
    population: 'Population',
    area: 'Area',
    language: 'Language',
    region: 'Region',
    subregion: 'Subregion',
    currency: 'Currency',
    timezone: 'Timezone',
    independent: 'Independent',
    unMember: 'UN Member',
    landlocked: 'Landlocked',
    searchPlaceholder: 'Country, capital or region name...',
    populationMin: 'Population (min)',
    populationMax: 'Population (max)',
    areaMin: 'Area (min, km²)',
    areaMax: 'Area (max, km²)',
    apply: 'Apply',
    reset: 'Reset',
    previous: 'Previous',
    next: 'Next',
    noResults: 'No results found',
    loading: 'Loading...',
    error: 'An error occurred',
    totalCountries: 'Total Countries',
    totalPopulation: 'Total Population',
    totalArea: 'Total Area',
    averagePopulation: 'Average Population',
    averageArea: 'Average Area',
    mostPopulated: 'Most Populated',
    largestArea: 'Largest Area',
    smallestArea: 'Smallest Area',
    sortBy: 'Sort by',
    sortOrder: 'Order',
    ascending: 'Ascending',
    descending: 'Descending',
    all: 'All',
    borders: 'Border Countries',
    details: 'Details'
  },
  ru: {
    title: 'Информация о странах',
    subtitle: 'Полная информация о странах мира',
    search: 'Поиск...',
    filter: 'Фильтр',
    statistics: 'Статистика',
    name: 'Название',
    capital: 'Столица',
    population: 'Население',
    area: 'Площадь',
    language: 'Язык',
    region: 'Регион',
    subregion: 'Субрегион',
    currency: 'Валюта',
    timezone: 'Часовой пояс',
    independent: 'Независимый',
    unMember: 'Член ООН',
    landlocked: 'Не имеет выхода к морю',
    searchPlaceholder: 'Название страны, столицы или региона...',
    populationMin: 'Население (мин)',
    populationMax: 'Население (макс)',
    areaMin: 'Площадь (мин, км²)',
    areaMax: 'Площадь (макс, км²)',
    apply: 'Применить',
    reset: 'Сбросить',
    previous: 'Предыдущий',
    next: 'Следующий',
    noResults: 'Результаты не найдены',
    loading: 'Загрузка...',
    error: 'Произошла ошибка',
    totalCountries: 'Всего стран',
    totalPopulation: 'Общее население',
    totalArea: 'Общая площадь',
    averagePopulation: 'Среднее население',
    averageArea: 'Средняя площадь',
    mostPopulated: 'Самая населенная',
    largestArea: 'Самая большая площадь',
    smallestArea: 'Самая маленькая площадь',
    sortBy: 'Сортировка',
    sortOrder: 'Порядок',
    ascending: 'По возрастанию',
    descending: 'По убыванию',
    all: 'Все',
    borders: 'Граничащие страны',
    details: 'Подробнее'
  }
};

export const getTranslation = (lang: keyof typeof translations, key: keyof typeof translations.uz): string => {
  return translations[lang][key] || translations.uz[key];
};