import { library } from"@fortawesome/fontawesome-svg-core";
import { faTrash, faSignOutAlt, faTools, faCog, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


const Icons = () => {
    return (library.add(faTrash, faSignOutAlt, faTools, faCog, faPlusCircle));};

export default Icons;