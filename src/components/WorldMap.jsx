import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { mapCountries } from "@/content/countries";

const GEO_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

const defaultFill = "#e2e8e2";
const highlightFill = "#22361B";
const strokeColor = "#ffffff";

export default function WorldMap() {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const highlightedIds = new Set(mapCountries.map((c) => c.id));

  const getCountryData = (isoA3) =>
    mapCountries.find((c) => c.id === isoA3);

  const handleMouseEnter = (geo, evt) => {
    const iso = geo.properties?.ISO_A3;
    const country = getCountryData(iso);
    if (country) {
      setTooltip(country);
      setTooltipPos({ x: evt.clientX, y: evt.clientY });
    }
  };

  const handleMouseMove = (evt) => {
    if (tooltip) setTooltipPos({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section className="border-b border-brand-pink/30 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-black sm:text-3xl">
          Where I’ve worked
        </h2>
        <p className="mt-2 text-black/70">
          Hover or click on highlighted countries to see projects and roles.
        </p>
        <div
          className="relative mt-8 overflow-hidden rounded border border-brand-pink/20 bg-brand-green-soft/30"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140 }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup center={[20, 20]}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso = geo.properties?.ISO_A3;
                    const isHighlighted = highlightedIds.has(iso);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isHighlighted ? highlightFill : defaultFill}
                        stroke={strokeColor}
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            outline: "none",
                            fill: isHighlighted ? "#2d4a20" : "#d4ddd4",
                            cursor: isHighlighted ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          {tooltip && (
            <div
              className="pointer-events-none fixed z-50 max-w-xs rounded-lg border border-brand-pink/30 bg-white p-4 shadow-lg"
              style={{
                left: tooltipPos.x + 12,
                top: tooltipPos.y + 12,
              }}
            >
              <p className="font-semibold text-black">{tooltip.name}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-black/80">
                {tooltip.projects.map((p, i) => (
                  <li key={i}>
                    <span className="font-medium text-brand-green">
                      {p.role}
                    </span>
                    <br />
                    <span className="text-black/70">{p.company}</span>
                    {p.period && (
                      <>
                        <br />
                        <span className="text-black/60">{p.period}</span>
                      </>
                    )}
                    {p.location && (
                      <>
                        <br />
                        <span className="text-black/60">{p.location}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
