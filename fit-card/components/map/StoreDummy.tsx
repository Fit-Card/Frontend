const dummyData = [
  // 음식점 (0)
  {
    id: "6",
    name: "롯데리아 강남역점",
    address: "서울특별시 강남구 강남대로 396",
    distance: "0.4km",
    latitude: 37.498317,
    longitude: 127.027712,
    category: 0,
  },
  {
    id: "7",
    name: "서브웨이 강남역점",
    address: "서울특별시 강남구 강남대로 396",
    distance: "0.4km",
    latitude: 37.498817,
    longitude: 127.027812,
    category: 0,
  },
  {
    id: "8",
    name: "맥도날드 강남점",
    address: "서울특별시 강남구 테헤란로 115",
    distance: "0.6km",
    latitude: 37.501921,
    longitude: 127.037158,
    category: 0,
  },
  {
    id: "9",
    name: "파리바게뜨 강남점",
    address: "서울특별시 강남구 역삼로 1",
    distance: "0.6km",
    latitude: 37.500287,
    longitude: 127.036475,
    category: 0,
  },
  {
    id: "10",
    name: "오므토토마토 강남역점",
    address: "서울특별시 강남구 테헤란로 16",
    distance: "0.5km",
    latitude: 37.498132,
    longitude: 127.028423,
    category: 0,
  },
  {
    id: "11",
    name: "백년옥 강남점",
    address: "서울특별시 강남구 테헤란로5길 7",
    distance: "0.9km",
    latitude: 37.500462,
    longitude: 127.035428,
    category: 0,
  },
  {
    id: "12",
    name: "매드포갈릭 강남점",
    address: "서울특별시 강남구 논현로 73",
    distance: "1.1km",
    latitude: 37.501001,
    longitude: 127.030487,
    category: 0,
  },
  {
    id: "13",
    name: "마포갈매기 강남점",
    address: "서울특별시 강남구 강남대로 100길 12",
    distance: "0.7km",
    latitude: 37.498721,
    longitude: 127.029482,
    category: 0,
  },
  {
    id: "14",
    name: "이디야커피 강남역점",
    address: "서울특별시 강남구 테헤란로 110",
    distance: "0.3km",
    latitude: 37.500421,
    longitude: 127.03451,
    category: 0,
  },
  {
    id: "15",
    name: "봉추찜닭 강남점",
    address: "서울특별시 강남구 논현로 108길 3",
    distance: "0.9km",
    latitude: 37.499123,
    longitude: 127.032451,
    category: 0,
  },
  {
    id: "16",
    name: "카츠집 강남점",
    address: "서울특별시 강남구 논현로 86",
    distance: "0.8km",
    latitude: 37.500478,
    longitude: 127.035124,
    category: 0,
  },
  {
    id: "17",
    name: "신선설농탕 강남점",
    address: "서울특별시 강남구 강남대로 134길 4",
    distance: "0.6km",
    latitude: 37.50132,
    longitude: 127.034828,
    category: 0,
  },
  {
    id: "18",
    name: "미스터피자 강남역점",
    address: "서울특별시 강남구 강남대로 106길 8",
    distance: "0.5km",
    latitude: 37.498924,
    longitude: 127.033928,
    category: 0,
  },
  {
    id: "19",
    name: "교촌치킨 강남점",
    address: "서울특별시 강남구 논현로 90길 15",
    distance: "0.8km",
    latitude: 37.499212,
    longitude: 127.034234,
    category: 0,
  },
  {
    id: "20",
    name: "본죽 강남점",
    address: "서울특별시 강남구 강남대로 123길 9",
    distance: "0.9km",
    latitude: 37.501978,
    longitude: 127.035654,
    category: 0,
  },
  {
    id: "21",
    name: "고갯마루 강남점",
    address: "서울특별시 강남구 테헤란로 108길 6",
    distance: "1.1km",
    latitude: 37.503211,
    longitude: 127.036114,
    category: 0,
  },
  {
    id: "22",
    name: "신라스테이 강남점",
    address: "서울특별시 강남구 테헤란로 176",
    distance: "0.5km",
    latitude: 37.500104,
    longitude: 127.038221,
    category: 0,
  },
  {
    id: "23",
    name: "놀부부대찌개 강남점",
    address: "서울특별시 강남구 강남대로 144길 3",
    distance: "1.0km",
    latitude: 37.500645,
    longitude: 127.037324,
    category: 0,
  },
  {
    id: "24",
    name: "새마을식당 강남역점",
    address: "서울특별시 강남구 테헤란로5길 9",
    distance: "0.9km",
    latitude: 37.4998,
    longitude: 127.034978,
    category: 0,
  },
  {
    id: "25",
    name: "피자헛 강남역점",
    address: "서울특별시 강남구 테헤란로4길 11",
    distance: "1.2km",
    latitude: 37.497671,
    longitude: 127.033524,
    category: 0,
  },
  // 카페 (1)
  {
    id: "6",
    name: "바나프레소 역삼점",
    address: "서울특별시 강남구 논현로94길 13",
    distance: "0.3km",
    latitude: 37.499979,
    longitude: 127.03735,
    category: 1,
  },
  {
    id: "7",
    name: "스타벅스 강남대로점",
    address: "서울특별시 강남구 강남대로 432",
    distance: "0.4km",
    latitude: 37.501276,
    longitude: 127.027396,
    category: 1,
  },
  {
    id: "8",
    name: "이디야커피 역삼역점",
    address: "서울특별시 강남구 역삼로 102",
    distance: "0.6km",
    latitude: 37.502001,
    longitude: 127.035001,
    category: 1,
  },
  {
    id: "9",
    name: "할리스커피 강남점",
    address: "서울특별시 강남구 도곡로 101",
    distance: "0.8km",
    latitude: 37.501678,
    longitude: 127.03201,
    category: 1,
  },
  {
    id: "10",
    name: "탐앤탐스 강남점",
    address: "서울특별시 강남구 강남대로 110",
    distance: "1.0km",
    latitude: 37.499501,
    longitude: 127.030197,
    category: 1,
  },

  // 편의점 (2)
  {
    id: "11",
    name: "CU 강남역점",
    address: "서울특별시 강남구 강남대로 98길 21",
    distance: "0.4km",
    latitude: 37.499091,
    longitude: 127.030354,
    category: 2,
  },
  {
    id: "12",
    name: "GS25 강남역점",
    address: "서울특별시 강남구 역삼동 822-17",
    distance: "0.7km",
    latitude: 37.502902,
    longitude: 127.028665,
    category: 2,
  },
  {
    id: "13",
    name: "세븐일레븐 강남점",
    address: "서울특별시 강남구 테헤란로 110",
    distance: "0.5km",
    latitude: 37.501201,
    longitude: 127.032178,
    category: 2,
  },
  {
    id: "14",
    name: "이마트24 강남점",
    address: "서울특별시 강남구 봉은사로 234",
    distance: "0.9km",
    latitude: 37.498576,
    longitude: 127.030991,
    category: 2,
  },
  {
    id: "15",
    name: "미니스톱 강남점",
    address: "서울특별시 강남구 논현로 96",
    distance: "1.2km",
    latitude: 37.503124,
    longitude: 127.035554,
    category: 2,
  },

  // 문화 (3)
  {
    id: "16",
    name: "CGV 강남점",
    address: "서울특별시 강남구 강남대로 512",
    distance: "0.6km",
    latitude: 37.504001,
    longitude: 127.037999,
    category: 3,
  },
  {
    id: "17",
    name: "메가박스 강남점",
    address: "서울특별시 강남구 도곡로 56",
    distance: "0.8km",
    latitude: 37.503348,
    longitude: 127.038046,
    category: 3,
  },
  {
    id: "18",
    name: "강남 아트센터",
    address: "서울특별시 강남구 봉은사로 123",
    distance: "1.5km",
    latitude: 37.510987,
    longitude: 127.041234,
    category: 3,
  },
  {
    id: "19",
    name: "강남영화관",
    address: "서울특별시 강남구 테헤란로 42",
    distance: "1.0km",
    latitude: 37.507012,
    longitude: 127.035783,
    category: 3,
  },
  {
    id: "20",
    name: "강남갤러리",
    address: "서울특별시 강남구 도산대로 145",
    distance: "2.0km",
    latitude: 37.512312,
    longitude: 127.045678,
    category: 3,
  },

  // 주유소 (4)
  {
    id: "21",
    name: "GS칼텍스 강남주유소",
    address: "서울특별시 강남구 강남대로 310",
    distance: "0.3km",
    latitude: 37.508123,
    longitude: 127.042101,
    category: 4,
  },
  {
    id: "22",
    name: "SK에너지 강남점",
    address: "서울특별시 강남구 테헤란로 345",
    distance: "0.5km",
    latitude: 37.504102,
    longitude: 127.041778,
    category: 4,
  },
  {
    id: "23",
    name: "S-Oil 강남점",
    address: "서울특별시 강남구 봉은사로 110",
    distance: "1.0km",
    latitude: 37.500876,
    longitude: 127.036092,
    category: 4,
  },
  {
    id: "24",
    name: "현대오일뱅크 강남역점",
    address: "서울특별시 강남구 봉은사로 98",
    distance: "1.2km",
    latitude: 37.506545,
    longitude: 127.040567,
    category: 4,
  },
  {
    id: "25",
    name: "알뜰주유소 강남점",
    address: "서울특별시 강남구 테헤란로 22길 33",
    distance: "1.5km",
    latitude: 37.503678,
    longitude: 127.042789,
    category: 4,
  },
];

export default dummyData;
