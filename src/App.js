import cards from "./cards.json";
const App = () => {
  return (
    <div>
      <ul>
        {cards.map((card) => (
          <li key={card.position}>{card.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
