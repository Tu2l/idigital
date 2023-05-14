const data = [
  {
    id: 1,
    title: "title 1",
    desc: "desc",
    image: "https://placehold.co/140",
  },
  {
    id: 2,
    title: "title 2",
    desc: "desc",
    image: "https://placehold.co/140",
  },

  {
    id: 3,
    title: "title 3",
    desc: "desc",
    image: "https://placehold.co/140",
  },

  {
    id: 4,
    title: "title 4",
    desc: "desc",
    image: "https://placehold.co/140",
  },

  {
    id: 5,
    title: "title 5",
    desc: "desc",
    image: "https://placehold.co/140",
  },
];

export function generateDemoData() {
  const data = [];
  for (let i = 1; i <= 20; i++)
    data.push({
      id: i,
      title: `title ${i}`,
      desc: `desc ${i}`,
      image: "https://placehold.co/140",
    });
  return data;
}

export default data;
