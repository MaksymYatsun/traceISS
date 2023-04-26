addMap('issMap');

function addMap(containerId) {
  const mapContainer = document.getElementById(containerId)
  const mymap = L.map(mapContainer, { zoomControl: false }).setView([0, 0], 2);

  const issImg = L.icon({
    iconUrl: 'issImg.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
  const marker = L.marker([0, 0], { icon: issImg }).addTo(mymap);

  const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

  async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude, altitude } = data;

    marker.setLatLng([latitude, longitude]);
    mymap.setView([latitude, longitude], 3);
    document.querySelector('#lat').textContent = latitude.toFixed(2) + '˚';
    document.querySelector('#lon').textContent = longitude.toFixed(2) + '˚';
    document.querySelector('#alt').textContent = altitude.toFixed(2) + ' km';
  }

  setInterval(getISS, 1500)
}