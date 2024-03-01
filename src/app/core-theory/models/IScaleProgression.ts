import { IChord } from "./IChord";
import { IScale } from "./IScale";

export interface IScaleProgression {
    scale: IScale,
    chords: IChord[]
}