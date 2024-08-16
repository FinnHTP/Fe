import { useState, useEffect } from "react";
import { getAllGameTypes } from "../../services/category/category.services";

const AccordionItem = ({ title, gameTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="w-full text-left text-white p-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 text-white">
          {gameTypes.map((gameType, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-sm mb-3">{gameType.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const [gameTypes, setGameTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGameTypes();
        if (Array.isArray(data)) {
          setGameTypes(data);
        } else {
          console.error("Dữ liệu không phải là mảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const items = [
    {
      title: "Game Types",
      gameTypes: gameTypes,
    },
  ];

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          gameTypes={item.gameTypes}
        />
      ))}
    </div>
  );
};

export default Accordion;
