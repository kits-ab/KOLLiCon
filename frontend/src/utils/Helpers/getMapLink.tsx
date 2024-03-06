export const getMapLink = (coordinates: number[]) => {
  const userAgent = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return `maps://maps.apple.com/?q=${coordinates[0]},${coordinates[1]}`;
  } else {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`;
  }
};
