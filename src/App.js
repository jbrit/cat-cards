import card_list from "./cards.json";
import { Card, Row, Col } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const containerStyle = { padding: "0 8px", width: "100%" };
const App = () => {
  const [cards, setCards] = useState(card_list);
  // n*(n-1) / 2
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCards(items);
  };

  return (
    <div style={containerStyle}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <Row
              {...provided.droppableProps}
              ref={provided.innerRef}
              gutter={[16, 16]}
            >
              <>
                {cards.map((card, idx) => (
                  <Draggable
                    key={"" + card.position}
                    draggableId={"" + card.position}
                    index={idx}
                  >
                    {(provided) => (
                      <Col
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        span={8}
                      >
                        <Card title={card.title}>Card content</Card>
                      </Col>
                    )}
                  </Draggable>
                ))}
              </>
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
