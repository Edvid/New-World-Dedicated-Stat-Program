export interface colorProperty {
  color: string;
  name: string;
};

export function fillInColorProperties(searchObj) {
  const ret: colorProperty[] = [];

  Object.keys(searchObj).forEach((key) => {
    const prop: colorProperty = { color: searchObj[key].Color, name: key }
    ret.push(prop);
  });

  return ret;
}

