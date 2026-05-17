import { useState } from "react";
import Icon from "@/components/ui/icon";

const DISTRICTS = [
  {
    id: "center",
    name: "Центральный",
    color: "#4ECDC4",
    description: "Исторический центр города с административными зданиями",
    area: "12.4 км²",
    population: "89 тыс.",
    path: "M 300 200 L 420 180 L 460 260 L 430 340 L 350 360 L 270 320 L 250 240 Z",
    labelX: 355,
    labelY: 275,
  },
  {
    id: "north",
    name: "Северный",
    color: "#FF6B6B",
    description: "Промышленный район с современными жилыми кварталами",
    area: "18.7 км²",
    population: "124 тыс.",
    path: "M 250 100 L 420 80 L 420 180 L 300 200 L 250 200 Z",
    labelX: 335,
    labelY: 148,
  },
  {
    id: "east",
    name: "Восточный",
    color: "#FFE66D",
    description: "Культурный район с парками и музеями",
    area: "15.2 км²",
    population: "97 тыс.",
    path: "M 420 180 L 530 150 L 560 280 L 500 360 L 430 340 L 460 260 Z",
    labelX: 490,
    labelY: 255,
  },
  {
    id: "south",
    name: "Южный",
    color: "#A8E6CF",
    description: "Курортная зона с набережной и пляжами",
    area: "21.0 км²",
    population: "78 тыс.",
    path: "M 270 320 L 350 360 L 430 340 L 500 360 L 480 460 L 300 470 L 240 400 Z",
    labelX: 370,
    labelY: 405,
  },
  {
    id: "west",
    name: "Западный",
    color: "#C9B1FF",
    description: "Деловой район с торговыми центрами",
    area: "14.8 км²",
    population: "102 тыс.",
    path: "M 150 180 L 250 100 L 250 200 L 300 200 L 270 320 L 240 400 L 140 350 L 120 240 Z",
    labelX: 205,
    labelY: 270,
  },
];

const POI = [
  { id: 1, name: "Исторический музей", category: "museum", emoji: "🏛️", x: 355, y: 260, district: "center", desc: "Богатейшая коллекция экспонатов XVIII–XX вв." },
  { id: 2, name: "Центральный парк", category: "park", emoji: "🌳", x: 310, y: 300, district: "center", desc: "30 гектаров зелёных зон для отдыха" },
  { id: 3, name: "Кафедральный собор", category: "church", emoji: "⛪", x: 390, y: 240, district: "center", desc: "Архитектурный памятник XIX века" },
  { id: 4, name: "Северный рынок", category: "market", emoji: "🛒", x: 340, y: 130, district: "north", desc: "Крупнейший продовольственный рынок" },
  { id: 5, name: "Арт-галерея", category: "museum", emoji: "🎨", x: 480, y: 200, district: "east", desc: "Современное искусство и временные выставки" },
  { id: 6, name: "Ботанический сад", category: "park", emoji: "🌺", x: 510, y: 300, district: "east", desc: "Более 5000 видов растений" },
  { id: 7, name: "Пляж Солнечный", category: "beach", emoji: "🏖️", x: 380, y: 430, district: "south", desc: "Лучший городской пляж с инфраструктурой" },
  { id: 8, name: "Набережная", category: "park", emoji: "🚶", x: 320, y: 450, district: "south", desc: "3 км прогулочной набережной" },
  { id: 9, name: "Бизнес-центр", category: "business", emoji: "🏢", x: 180, y: 280, district: "west", desc: "Крупнейший деловой кластер города" },
  { id: 10, name: "Торговый квартал", category: "market", emoji: "🛍️", x: 200, y: 330, district: "west", desc: "Шоппинг и рестораны мирового уровня" },
];

const CATEGORIES = [
  { id: "all", label: "Все", icon: "Map" },
  { id: "museum", label: "Музеи", icon: "Landmark" },
  { id: "park", label: "Парки", icon: "TreePine" },
  { id: "church", label: "Храмы", icon: "Building" },
  { id: "market", label: "Рынки", icon: "ShoppingBag" },
  { id: "beach", label: "Пляжи", icon: "Waves" },
  { id: "business", label: "Бизнес", icon: "Briefcase" },
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
            <h1 className="site-title">ГородКарта</h1>
            <p className="site-sub">Интерактивный путеводитель</p>
          </div>
        </div>
        <div className="header-right">
          <button
            className={`layer-toggle ${showLayer ? "active" : ""}`}
            onClick={() => setShowLayer(v => !v)}
          >
            <Icon name="Layers" size={15} />
            <span>Туристический слой</span>
          </button>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label">Районы города</p>
            <div className="district-list">
              {DISTRICTS.map(d => (
                <button
                  key={d.id}
                  className={`district-item ${activeDistrict === d.id ? "active" : ""}`}
                  style={{ "--district-color": d.color } as React.CSSProperties}
                  onClick={() => setActiveDistrict(activeDistrict === d.id ? null : d.id)}
                >
                  <span className="district-dot" />
                  <span className="district-name">{d.name}</span>
                  <span className="district-pop">{d.population}</span>
                </button>
              ))}
            </div>
          </div>

          {showLayer && (
            <div className="sidebar-section">
              <p className="sidebar-label">Категории объектов</p>
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
        </aside>

        <main className="map-container">
          <div className="map-wrap">
            <svg
              viewBox="100 60 500 440"
              className="district-svg"
              onClick={() => { setActiveDistrict(null); setSelectedPoi(null); }}
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect x="100" y="60" width="500" height="440" fill="url(#grid)"/>

              {DISTRICTS.map(d => {
                const isHovered = hoveredDistrict === d.id;
                const isActive = activeDistrict === d.id;
                const isDimmed = !!(activeDistrict && activeDistrict !== d.id);
                return (
                  <g key={d.id}>
                    <path
                      d={d.path}
                      fill={d.color}
                      fillOpacity={isDimmed ? 0.06 : isActive ? 0.45 : isHovered ? 0.32 : 0.18}
                      stroke={d.color}
                      strokeWidth={isActive ? 2.5 : isHovered ? 2 : 1}
                      strokeOpacity={isDimmed ? 0.2 : 0.85}
                      style={{ cursor: "pointer", transition: "all 0.25s ease" }}
                      onClick={e => { e.stopPropagation(); setActiveDistrict(activeDistrict === d.id ? null : d.id); setSelectedPoi(null); }}
                      onMouseEnter={() => setHoveredDistrict(d.id)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                    />
                    {!isDimmed && (
                      <text
                        x={d.labelX}
                        y={d.labelY}
                        textAnchor="middle"
                        fill={d.color}
                        fontSize="10.5"
                        fontFamily="Golos Text, sans-serif"
                        fontWeight="600"
                        opacity="0.9"
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      >
                        {d.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {showLayer && visiblePoi.map(poi => (
                <g
                  key={poi.id}
                  style={{ cursor: "pointer" }}
                  onClick={e => { e.stopPropagation(); setSelectedPoi(selectedPoi?.id === poi.id ? null : poi); }}
                >
                  <circle
                    cx={poi.x}
                    cy={poi.y}
                    r={selectedPoi?.id === poi.id ? 14 : 11}
                    fill={selectedPoi?.id === poi.id ? "rgba(255,255,255,0.2)" : "rgba(14,16,30,0.88)"}
                    stroke={selectedPoi?.id === poi.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"}
                    strokeWidth={selectedPoi?.id === poi.id ? 1.5 : 1}
                    filter={selectedPoi?.id === poi.id ? "url(#glow)" : ""}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  <text
                    x={poi.x}
                    y={poi.y + 5}
                    textAnchor="middle"
                    fontSize="11"
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
                <div className="popup-emoji">{selectedPoi.emoji}</div>
                <h4 className="popup-name">{selectedPoi.name}</h4>
                <p className="popup-desc">{selectedPoi.desc}</p>
                <div className="popup-district">
                  <Icon name="MapPin" size={11} />
                  <span>{DISTRICTS.find(d => d.id === selectedPoi.district)?.name} район</span>
                </div>
              </div>
            )}

            <div className="map-controls">
              <button className="ctrl-btn" title="Сбросить фильтры" onClick={() => { setActiveDistrict(null); setSelectedPoi(null); }}>
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
