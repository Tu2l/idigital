import ItemCard from "../components/ItemCard";
import ItemList from "../components/ItemList";
import Login from "../components/Login";

function generateDemoData() {
  const data = [];
  for (let i = 1; i < 20; i++)
    data.push({
      id: i,
      title: `title ${i}`,
      desc: `desc ${i}`,
      image: "https://placehold.co/140",
    });
  return data;
}

export default function index() {
  return <Login />;
}
