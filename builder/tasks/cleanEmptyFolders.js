import deleteEmpty from 'delete-empty';
import { paths, source } from '../config';

const deleteEmptyFolders = () =>
    deleteEmpty(paths.dist.root)
        .catch(console.error);

export default deleteEmptyFolders;
