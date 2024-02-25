export class DataUtils<T> {
  constructor() {}

  filter(list: T[], filters: { field: keyof T; value: string | number }[]): T[] {
    if (!list) return [];

    let filteredTokens: T[] = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      let passesFilters = true;

      for (let j = 0; j < filters.length; j++) {
        const filter = filters[j];
        const field = filter.field;
        const value = filter.value;

        if (item[field] !== value) {
          passesFilters = false;
          break;
        }
      }

      if (passesFilters) {
        filteredTokens.push(item);
      }
    }

    return filteredTokens;
  }

  random(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }
}
