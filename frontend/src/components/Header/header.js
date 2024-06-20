import React from "react";
import LinkIcon from "./icon";
const Header = ()=>{
    return(
        <div className="flex items-center p-4 border-b">
            <LinkIcon/>
        <h1 className="text-lg ml-2 font-semibold">Link Manager</h1>
    </div>
    
    )
}

export default Header;