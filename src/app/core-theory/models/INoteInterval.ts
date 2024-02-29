import { IInterval } from "./IInterval";
import { INote } from "./INote";

export interface INoteInterval extends IInterval
{
    note: INote;
}