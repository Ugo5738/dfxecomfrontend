import { useState } from 'react';

const CategoryItem = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>{category.name}</button>
      {isOpen && category.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {category.children.map((child) => (
            <CategoryItem key={child.id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
