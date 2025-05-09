import {Artiste} from "./artiste";

export class Style {
  id!: number;
  photo!: string;
  styleIdByArtiste!: number;
  artisteId!: number;
  artiste!: Artiste;
  description!: string;
}
