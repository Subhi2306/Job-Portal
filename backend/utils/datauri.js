import DataUriParser from "datauri/parser.js";

import path  from "path";

// file ka jo bhi path h usko bhejunga aur usko convert krke yeh return krega
const getDataUri=(file) => {
    const parser=new DataUriParser();
    const extName= path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}
export default getDataUri;