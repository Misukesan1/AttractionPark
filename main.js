import { SidebarDOM } from "./modules/SidebarDOM.js"
import { AttractionClass } from "./class/AttractionClass.js"
import { ParcClass } from "./class/ParcClass.js"


const divSectionInfosSuppParc = document.querySelector("div.park-info")

console.log(divSectionInfosSuppParc)


document.addEventListener("DOMContentLoaded", function () {
    SidebarDOM.initAllEventsSidebarDOM()

});