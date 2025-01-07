function getImgUrl (name){
    return new URL(`../assets/Books/${name}`, import.meta.url)
}

export {getImgUrl}