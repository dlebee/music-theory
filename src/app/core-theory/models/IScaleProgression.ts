import { IChord } from "./IChord";
import { IScale, IScaleProgressionDefinition } from "./IScale";

export interface IScaleProgression {
    scale: IScale,
    definition: IScaleProgressionDefinition,
    chords: Array<IChord | null>
}