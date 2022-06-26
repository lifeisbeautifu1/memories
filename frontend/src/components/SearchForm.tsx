import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { getPostsBySearch } from '../features/posts/postsSlice';
import ChipInput from 'material-ui-chip-input';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchPosts = () => {
    if (searchTerm.trim() || tags.length !== 0) {
      dispatch(
        getPostsBySearch({
          searchTerm,
          tags: tags.join(',').trim(),
        })
      );
      navigate(
        `/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(
          ','
        )}`
      );
    } else {
      navigate('/posts');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPosts();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') searchPosts();
  };

  const handleAddChip = (tag: string) =>
    setTags((prevState) => [...prevState, tag]);

  const handleDeleteChip = (tagToDelete: string) =>
    setTags((prevState) => prevState.filter((tag) => tag !== tagToDelete));

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          className="p-2 bg-gray-100 rounded outline-black"
          placeholder="Search term..."
          value={searchTerm}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        />
        <ChipInput
          value={tags}
          onAdd={(tag) => handleAddChip(tag)}
          onDelete={(tag) => handleDeleteChip(tag)}
          label="Search Tags"
          variant="outlined"
        />
        <button className="btn">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
