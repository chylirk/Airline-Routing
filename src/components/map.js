import React from 'react';

const Map = ({ routes }) => {
  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>

        {routes.map(route => {
          return <g key={Object.values(route).join(':')}>
                   <circle className="source" cx={route.x1} cy={route.y1}>
                     <title></title>
                   </circle> 
                   <circle className="destination" cx={route.x1} cy={route.y1}>
                     <title></title>
                   </circle>
                   <path d={`M${route.x1} ${route.y1} L ${route.x2} ${route.y2}`} />
                 </g>
        })}
      </g>
    </svg>
  )
};

export default Map;
