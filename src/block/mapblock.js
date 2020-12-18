/* eslint-disable quote-props */
import mapboxgl from 'mapbox-gl';
import Control from '../utils/control';

export default class MapWraper extends Control {
  constructor(parentNode, data) {
    super(parentNode, 'div', 'map-wrapper');
    this.node.id = 'map';

    mapboxgl.accessToken = 'pk.eyJ1IjoibWF1dGEiLCJhIjoiY2tpbjM4dHIyMDU3MDJ6bWx1YnhoNXYxNSJ9.kq3HP8TVE6Sc8u1-HU2QFg';
    this.map = new mapboxgl.Map({
      container: 'map',
      center: [-74.5, 40],
      zoom: 2,
      style: 'mapbox://styles/mauta/ckin44yuk3h3d18l3t77d0mn2',
      hash: true,
      transformRequest: (url, resourceType) => {
        if (resourceType === 'Source' && url.startsWith('http://myHost')) {
          return {
            url: url.replace('http', 'https'),
            headers: {
              'my-custom-header': true,
            },
            credentials: 'include', // Include cookies for cross-origin requests
          };
        }
      },
    }).addControl(new mapboxgl.AttributionControl({
      compact: true,
    }));

    console.log(data[10].country);

    this.map.on('load', () => {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.map.on('mousemove', (e) => {
        const countries = this.map.queryRenderedFeatures(e.point, {
          layers: ['countries-cnvat2'],
        });

        if (countries.length > 0) {
          const b = data.filter((el) => el.country === countries[0].properties.ADMIN);

          popup.setLngLat(e.lngLat).setHTML(`${b[0].country}\n ${b[0].count}`).addTo(this.map);
        }
      });

      this.map.getCanvas().style.cursor = 'default';
    });
  }
}
