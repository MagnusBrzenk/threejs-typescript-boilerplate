import {
  Color
} from 'three';

import { ViveController } from './ViveController';

export class PaintViveController extends ViveController {
  constructor(id: number);

  getColor(): Color;
  getSize(): number;
}
