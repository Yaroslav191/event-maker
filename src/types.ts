export interface MarkerInterface {
  id: number |  string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  key: string;
  time: string;
  id_user: string;
  created: string;
}

