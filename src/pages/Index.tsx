import { useState } from "react";
import Icon from "@/components/ui/icon";

const MAP_IMAGE = "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/f56ced8a-ea49-47fb-94a6-1c44f33162e1.jpg";

const DISTRICTS = [
  {
    id: "center",
    name: "Центр",
    nameVi: "Trung Tâm",
    color: "#4ECDC4",
    description: "Главный туристический район: набережная, отели, рестораны",
    area: "8.2 км²",
    population: "112 тыс.",
    path: "M 310 230 L 390 215 L 415 290 L 400 360 L 330 375 L 285 320 L 280 255 Z",
    labelX: 350,
    labelY: 298,
  },
  {
    id: "north",
    name: "Северный",
    nameVi: "Phía Bắc",
    color: "#FF6B6B",
    description: "Жилой район, порт, рынки, башни Чамов По Нагар",
    area: "14.5 км²",
    population: "88 тыс.",
    path: "M 240 120 L 390 100 L 390 215 L 310 230 L 280 255 L 220 200 Z",
    labelX: 310,
    labelY: 168,
  },
  {
    id: "south",
    name: "Южный",
    nameVi: "Phía Nam",
    color: "#FFE66D",
    description: "Пляжный курорт, Vinpearl, Long Beach, острова",
    area: "19.8 км²",
    population: "65 тыс.",
    path: "M 285 320 L 330 375 L 400 360 L 420 440 L 320 470 L 240 430 L 230 360 Z",
    labelX: 332,
    labelY: 408,
  },
  {
    id: "west",
    name: "Западный",
    nameVi: "Phía Tây",
    color: "#A8E6CF",
    description: "Горные районы, водопады, буддийские пагоды",
    area: "22.1 км²",
    population: "47 тыс.",
    path: "M 130 150 L 240 120 L 220 200 L 280 255 L 285 320 L 230 360 L 140 300 L 120 220 Z",
    labelX: 200,
    labelY: 255,
  },
  {
    id: "island",
    name: "Острова",
    nameVi: "Đảo",
    color: "#C9B1FF",
    description: "Острова Хон Тре, Хон Мун — коралловые рифы и снорклинг",
    area: "6.4 км²",
    population: "5 тыс.",
    path: "M 480 200 L 530 185 L 550 240 L 520 275 L 470 265 L 455 220 Z",
    labelX: 503,
    labelY: 232,
  },
];

const POI = [
  { id: 1, name: "Набережная Чан Фу", category: "park", emoji: "🌊", x: 405, y: 285, district: "center", desc: "Главная пешеходная набережная 6 км вдоль пляжа", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/bcb6bfcb-ca34-471c-9db2-71f3bbaf876f.jpg" },
  { id: 2, name: "Пляж Нячанг", category: "beach", emoji: "🏖️", x: 425, y: 320, district: "center", desc: "Белоснежный городской пляж — визитная карточка города", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/2b685e84-bf90-422e-abac-3578b683c63f.jpg" },
  { id: 3, name: "Башни Чамов По Нагар", category: "temple", emoji: "🏯", x: 265, y: 170, district: "north", desc: "Индуистские башни VIII–IX вв., архитектурный шедевр", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/17fe54c0-71e6-4751-9524-2793b3175c63.jpg" },
  { id: 4, name: "Рыбный рынок Дам", category: "market", emoji: "🐟", x: 310, y: 150, district: "north", desc: "Самый большой рыбный рынок региона, работает с 4 утра", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/d33b965a-fe6e-4f08-85ae-7a77426ca054.jpg" },
  { id: 5, name: "Oceanpark Vinpearl", category: "attraction", emoji: "🎡", x: 505, y: 220, district: "island", desc: "Остров-курорт с аквапарком и сафари-парком", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/9a1fca40-5f24-4008-8434-b1f3c3dd3341.jpg" },
  { id: 6, name: "Длинный пляж", category: "beach", emoji: "🏝️", x: 360, y: 445, district: "south", desc: "Самый длинный пляж Нячанга, спокойная вода", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/f76926bb-bf52-4875-8ebe-8510f1c9548a.jpg" },
  { id: 7, name: "Пагода Лонг Шон", category: "temple", emoji: "🛕", x: 195, y: 220, district: "west", desc: "Буддийская пагода с огромной статуей Будды", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/85231924-4334-44e9-9269-662b291eca57.jpg" },
  { id: 8, name: "Водопад Бахо", category: "nature", emoji: "💧", x: 155, y: 260, district: "west", desc: "Живописный трёхуровневый водопад в джунглях", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/b473daef-8b3c-4f5c-8d96-69a1b604b74c.jpg" },
  { id: 9, name: "Институт океанографии", category: "museum", emoji: "🐠", x: 380, y: 355, district: "south", desc: "Один из лучших аквариумов Вьетнама", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/39e65e16-ca84-478f-912d-67bc3fadcd35.jpg" },
  { id: 10, name: "Ночной рынок", category: "market", emoji: "🌙", x: 355, y: 255, district: "center", desc: "Сувениры, морепродукты, уличная еда до 22:00", photo: "https://cdn.poehali.dev/projects/95cff1ec-7098-44d2-8623-42311ca605b6/files/c3c8abb3-bc4f-4f26-8cb1-076713ce6385.jpg" },
];

const CATEGORIES = [
  { id: "all", label: "Все", icon: "Map" },
  { id: "beach", label: "Пляжи", icon: "Waves" },
  { id: "temple", label: "Храмы", icon: "Building" },
  { id: "market", label: "Рынки", icon: "ShoppingBag" },
  { id: "park", label: "Парки", icon: "TreePine" },
  { id: "museum", label: "Музеи", icon: "Landmark" },
  { id: "nature", label: "Природа", icon: "Mountain" },
  { id: "attraction", label: "Аттракции", icon: "Star" },
];

export default function Index() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<typeof POI[0] | null>(null);
  const [showLayer, setShowLayer] = useState(true);

  const district = activeDistrict ? DISTRICTS.find(d => d.id === activeDistrict) : null;

  const visiblePoi = POI.filter(p => {
    const categoryMatch = activeCategory === "all" || p.category === activeCategory;
    const districtMatch = !activeDistrict || p.district === activeDistrict;
    return categoryMatch && districtMatch;
  });

  return (
    <div className="map-app">
      <header className="map-header">
        <div className="header-left">
          <div className="logo-badge">
            <Icon name="MapPin" size={18} />
          </div>
          <div>
            <h1 className="site-title">Нячанг</h1>
            <p className="site-sub">Интерактивная карта города</p>
          </div>
        </div>
        <div className="header-right">
          <button
            className={`layer-toggle ${showLayer ? "active" : ""}`}
            onClick={() => setShowLayer(v => !v)}
          >
            <Icon name="Layers" size={15} />
            <span>Достопримечательности</span>
          </button>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label">Районы Нячанга</p>
            <div className="district-list">
              {DISTRICTS.map(d => (
                <button
                  key={d.id}
                  className={`district-item ${activeDistrict === d.id ? "active" : ""}`}
                  style={{ "--district-color": d.color } as React.CSSProperties}
                  onClick={() => setActiveDistrict(activeDistrict === d.id ? null : d.id)}
                >
                  <span className="district-dot" />
                  <div className="district-names">
                    <span className="district-name">{d.name}</span>
                    <span className="district-name-vi">{d.nameVi}</span>
                  </div>
                  <span className="district-pop">{d.population}</span>
                </button>
              ))}
            </div>
          </div>

          {showLayer && (
            <div className="sidebar-section">
              <p className="sidebar-label">Категории</p>
              <div className="category-list">
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    className={`category-item ${activeCategory === c.id ? "active" : ""}`}
                    onClick={() => setActiveCategory(c.id)}
                  >
                    <Icon name={c.icon} size={13} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {district && (
            <div className="district-info" style={{ "--district-color": district.color } as React.CSSProperties}>
              <button className="close-info" onClick={() => setActiveDistrict(null)}>
                <Icon name="X" size={14} />
              </button>
              <h3 className="info-name">{district.name} район</h3>
              <p className="info-name-vi">{district.nameVi}</p>
              <p className="info-desc">{district.description}</p>
              <div className="info-stats">
                <div className="stat-item">
                  <Icon name="Ruler" size={12} />
                  <span>{district.area}</span>
                </div>
                <div className="stat-item">
                  <Icon name="Users" size={12} />
                  <span>{district.population}</span>
                </div>
              </div>
            </div>
          )}

          <div className="sea-label">
            <Icon name="Waves" size={14} />
            <span>Южно-Китайское море</span>
          </div>
        </aside>

        <main className="map-container">
          <div className="map-wrap">
            <div
              className="map-bg"
              style={{ backgroundImage: `url(${MAP_IMAGE})` }}
            />

            <svg
              viewBox="100 60 500 440"
              className="district-svg"
              onClick={() => { setActiveDistrict(null); setSelectedPoi(null); }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.8)"/>
                </filter>
              </defs>

              {DISTRICTS.map(d => {
                const isHovered = hoveredDistrict === d.id;
                const isActive = activeDistrict === d.id;
                const isDimmed = !!(activeDistrict && activeDistrict !== d.id);
                return (
                  <g key={d.id}>
                    <path
                      d={d.path}
                      fill={d.color}
                      fillOpacity={isDimmed ? 0.04 : isActive ? 0.42 : isHovered ? 0.28 : 0.14}
                      stroke={d.color}
                      strokeWidth={isActive ? 2.5 : isHovered ? 2 : 1.2}
                      strokeOpacity={isDimmed ? 0.15 : 0.9}
                      style={{ cursor: "pointer", transition: "all 0.25s ease" }}
                      onClick={e => { e.stopPropagation(); setActiveDistrict(activeDistrict === d.id ? null : d.id); setSelectedPoi(null); }}
                      onMouseEnter={() => setHoveredDistrict(d.id)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                    />
                    {!isDimmed && (
                      <g filter="url(#shadow)">
                        <text
                          x={d.labelX}
                          y={d.labelY - 5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontFamily="Oswald, sans-serif"
                          fontWeight="500"
                          opacity="0.95"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {d.name}
                        </text>
                        <text
                          x={d.labelX}
                          y={d.labelY + 8}
                          textAnchor="middle"
                          fill={d.color}
                          fontSize="8.5"
                          fontFamily="Golos Text, sans-serif"
                          opacity="0.85"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {d.nameVi}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              <text x="490" y="340" textAnchor="middle" fill="rgba(120,220,255,0.65)" fontSize="10" fontFamily="Oswald, sans-serif" fontStyle="italic" style={{ userSelect: "none" }}>Южно-Китайское</text>
              <text x="490" y="354" textAnchor="middle" fill="rgba(120,220,255,0.65)" fontSize="10" fontFamily="Oswald, sans-serif" fontStyle="italic" style={{ userSelect: "none" }}>море</text>

              {showLayer && visiblePoi.map(poi => (
                <g
                  key={poi.id}
                  style={{ cursor: "pointer" }}
                  onClick={e => { e.stopPropagation(); setSelectedPoi(selectedPoi?.id === poi.id ? null : poi); }}
                >
                  <circle
                    cx={poi.x}
                    cy={poi.y}
                    r={selectedPoi?.id === poi.id ? 15 : 12}
                    fill={selectedPoi?.id === poi.id ? "rgba(255,255,255,0.22)" : "rgba(10,12,28,0.82)"}
                    stroke={selectedPoi?.id === poi.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)"}
                    strokeWidth={selectedPoi?.id === poi.id ? 1.8 : 1}
                    filter={selectedPoi?.id === poi.id ? "url(#glow)" : "url(#shadow)"}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  <text
                    x={poi.x}
                    y={poi.y + 5}
                    textAnchor="middle"
                    fontSize="12"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {poi.emoji}
                  </text>
                </g>
              ))}
            </svg>

            {selectedPoi && (
              <div className="poi-popup">
                <button className="popup-close" onClick={() => setSelectedPoi(null)}>
                  <Icon name="X" size={12} />
                </button>
                <div className="popup-photo-wrap">
                  <img
                    src={selectedPoi.photo}
                    alt={selectedPoi.name}
                    className="popup-photo"
                  />
                  <div className="popup-photo-emoji">{selectedPoi.emoji}</div>
                </div>
                <div className="popup-body">
                  <h4 className="popup-name">{selectedPoi.name}</h4>
                  <p className="popup-desc">{selectedPoi.desc}</p>
                  <div className="popup-district">
                    <Icon name="MapPin" size={11} />
                    <span>{DISTRICTS.find(d => d.id === selectedPoi.district)?.name} район</span>
                  </div>
                </div>
              </div>
            )}

            <div className="map-controls">
              <button className="ctrl-btn" title="Сбросить" onClick={() => { setActiveDistrict(null); setSelectedPoi(null); }}>
                <Icon name="Crosshair" size={16} />
              </button>
            </div>

            <div className="map-stats">
              <Icon name="MapPin" size={12} />
              <span>{visiblePoi.length} объектов</span>
              <span className="stats-sep">·</span>
              <Icon name="Map" size={12} />
              <span>{activeDistrict ? DISTRICTS.find(d => d.id === activeDistrict)?.name : "Все районы"}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}