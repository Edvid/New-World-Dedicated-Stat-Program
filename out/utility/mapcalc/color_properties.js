export function fillInColorProperties(searchObj) {
    const ret = [];
    Object.keys(searchObj).forEach((key) => {
        const prop = { color: searchObj[key].Color, name: key };
        ret.push(prop);
    });
    return ret;
}
