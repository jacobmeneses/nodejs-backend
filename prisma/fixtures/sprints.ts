const startDate = new Date();
const endDate = new Date(startDate);

endDate.setDate(endDate.getDate() + 7);

const sprints = [ {
  id: 1,
  title: 'Sprint 1',
  startDate: startDate,
  endDate: endDate,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: 2,
  title: 'Sprint 2',
  startDate: startDate,
  endDate: endDate,
  createdAt: new Date(),
  updatedAt: new Date(),
},
];

export default sprints;
