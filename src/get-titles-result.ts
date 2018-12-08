import Result from './result';
import Title from './title';

export default interface GetNoteResult extends Result {
	titles?: Title[];
}
