
export interface Event {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

export const DEFAULT_EVENTS: Event[] = [
  { id: '1', name: '2x2', code: '222', active: true },
  { id: '2', name: '3x3', code: '333', active: true },
  { id: '3', name: '4x4', code: '444', active: true },
  { id: '4', name: '5x5', code: '555', active: true },
  { id: '5', name: '6x6', code: '666', active: true },
  { id: '6', name: '7x7', code: '777', active: true },
  { id: '7', name: '3x3 Blindfolded', code: '333bf', active: true },
  { id: '8', name: '3x3 Fewest Moves', code: '333fm', active: true },
  { id: '9', name: '3x3 One-Handed', code: '333oh', active: true },
  { id: '10', name: 'Clock', code: 'clock', active: true },
  { id: '11', name: 'Megaminx', code: 'minx', active: true },
  { id: '12', name: 'Pyraminx', code: 'pyram', active: true },
  { id: '13', name: 'Skewb', code: 'skewb', active: true },
  { id: '14', name: 'Square-1', code: 'sq1', active: true },
  { id: '15', name: '4x4 Blindfolded', code: '444bf', active: true },
  { id: '16', name: '5x5 Blindfolded', code: '555bf', active: true },
  { id: '17', name: 'Multi-Blind', code: '333mbf', active: true },
];
