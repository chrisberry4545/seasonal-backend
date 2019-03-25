export const sortByName = <ItemWithName extends { name: string }>(
  a: ItemWithName,
  b: ItemWithName
): number => (
  a.name > b.name ? 1 : -1
);

export const sortBySeasonIndex = <
  ItemWithSeasonIndex extends { seasonIndex: number }
>(
  a: ItemWithSeasonIndex,
  b: ItemWithSeasonIndex
): number => (
  a.seasonIndex > b.seasonIndex ? 1 : -1
);
