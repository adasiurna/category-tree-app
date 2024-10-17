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

  const renderTree = (category: ICategory) => {
    return (
      <li key={category.id}>
        - {category.name}
        {category.children.length > 0 && (
          <ul>{category.children.map(renderTree)}</ul>
        )}
      </li>
    )
  }

  return (
    <div>
      <button>Add Node</button>
      <ul>{categories.map(renderTree)}</ul>
    </div>
  )
}

export default CategoryTree