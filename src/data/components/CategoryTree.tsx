import React, { useState } from 'react'

interface ICategory {
  id: number;
  name: string;
  children: ICategory[];
}

interface ICategoryTreeProps {
  data: ICategory[];
}

const CategoryTree: React.FC<ICategoryTreeProps> = ( { data } ) => {

  const [categories, setCategories] = useState<ICategory[]>(data);

  const addNode = (parentId: number, nodeName: string) => {
    const addCategory = (category: ICategory): ICategory => {
      if (category.id === parentId) {
        const newCategory: ICategory = {
          id: new Date().getTime(), // unique id
          name: nodeName,
          children: []
        };
        return { ...category, children: [...category.children, newCategory] };
      } else {
        return { ...category, children: category.children.map(addCategory) };
      }
    };

    setCategories(categories.map(addCategory));
  };

  const removeNode = (nodeId: number) => {
    const removeCategory = (category: ICategory): ICategory | null => {
      if (category.id === nodeId) {
        return null;
      }
      return {
        ...category,
        children: category.children
          .map(removeCategory)
          .filter((child) => child !== null) as ICategory[],
      };
    };

    setCategories(categories.map(removeCategory).filter(Boolean) as ICategory[]);
  };

  const handleAdd = (id:number) => {
    const categoryName = prompt('Enter category name');
    if (id && categoryName ) {
      addNode(id, categoryName);
    }
  }

  const renderTree = (category: ICategory) => {
    return (
      <li key={category.id}>
        - {category.name}
        <button onClick={() => removeNode(category.id)}>Remove</button>
        <button onClick={() => handleAdd(category.id)}>Add</button>
        {category.children.length > 0 && (
          <ul>{category.children.map(renderTree)}</ul>
        )}
      </li>
    )
  }

  return (
    <div>
      <ul>{categories.map(renderTree)}</ul>
    </div>
  )
}

export default CategoryTree