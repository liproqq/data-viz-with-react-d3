import { geoEqualEarth, geoPath, geoGraticule } from "d3";

const projection = geoEqualEarth()
const path = (geoPath(projection))
const graticule = geoGraticule()

export const Marks = ({ data: { countries, interiors } }) => (

  <g className="mark" >
    <path className="sphere" d={path({ type: "Sphere" })} />
    <path className="graticule" d={path(graticule())} />
    {countries.features.map(feature =>
    (<path className="country" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    )
  </g>
);
