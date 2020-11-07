import { get } from "../axios/index";

async function getHot() {
    let { data: res } = await get("/hot");
   return res
}

async function getMap() {
    let { data: res } = await get("/map");
   return res
}
async function getRank() {
    let { data: res } = await get("/rank");
   return res
}

async function getSeller() {
    let { data: res } = await get("/seller");
   return res
}

async function getStock() {
    let { data: res } = await get("/stock");
   return res
}

async function getTrend() {
    let { data: res } = await get("/trend");
   return res
}


export {getHot,getMap,getRank,getSeller,getStock,getTrend}