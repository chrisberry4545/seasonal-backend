const filterByIds = (ids) => (
  `OR(${ids.map((id) => `RECORD_ID() = '${id}'`)})`
);

module.exports = {
  filterByIds
};
