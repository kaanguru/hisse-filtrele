
export function fibSeviyeAltinda(
  hisse: string,
  filteler: {
    borsa: string;
    aralik: string;
    mum: string;
    seviye: string;
  },
) {

  return hisse.startsWith(filteler.borsa.slice(0,1));
}
