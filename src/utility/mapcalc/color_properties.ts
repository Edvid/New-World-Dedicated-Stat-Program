export interface colorProperty {
  color: string;
  name: string;
}

export interface ColorHaver {
  Color: string;
}

export function fillInColorProperties(searchObj: Record<string, ColorHaver>) {
  const ret: colorProperty[] = [];

  Object.keys(searchObj).forEach((key) => {
    const prop: colorProperty = { color: searchObj[key].Color, name: key };
    ret.push(prop);
  });

  return ret;
}
