import { useState } from "react";

interface FiltersProps {
  categories: string[];
  authors: string[];
  onFilter: (
    searchTerm: string,
    selectedCategory: string,
    selectedAuthor: string,
  ) => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, authors, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    setSearchTerm(term);
    onFilter(term, selectedCategory, selectedAuthor); // Call onFilter with updated values
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    setSelectedCategory(category);
    onFilter(searchTerm, category, selectedAuthor); // Call onFilter with updated values
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const author = e.target.value;

    setSelectedAuthor(author);
    onFilter(searchTerm, selectedCategory, author); // Call onFilter with updated values
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between mb-8">
      <input
        className="mb-4 md:mb-0 md:w-1/3 px-4 py-2 border rounded"
        placeholder="Search articles..."
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="mb-4 md:mb-0 md:w-1/3 px-4 py-2 border rounded"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        className="mb-4 md:mb-0 md:w-1/3 px-4 py-2 border rounded"
        value={selectedAuthor}
        onChange={handleAuthorChange}
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
