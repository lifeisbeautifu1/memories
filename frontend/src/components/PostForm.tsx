import React from 'react';
import FileBase from 'react-file-base64';
import { createPost, editPost } from '../features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const initialState = {
  name: '',
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
  likes: [],
  creator: '',
};

const PostForm = () => {
  const [formState, setFormState] = React.useState(initialState);
  const dispatch = useAppDispatch();
  const { posts, selectedId } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    if (selectedId) {
      const post = posts.find((p) => p._id === selectedId);
      if (post) {
        setFormState({
          name: user?.name!,
          title: post?.title,
          message: post?.message,
          tags: post?.tags.join(','),
          selectedFile: post?.selectedFile,
          //@ts-ignore
          likes: post?.likes!,
          creator: user?.id!,
        });
      }
    }
  }, [selectedId, posts]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedId)
      dispatch(
        createPost({
          ...formState,
          creator: user?.id!,
          name: user?.name!,
          tags: formState.tags.split(','),
        })
      );
    else
      dispatch(
        editPost({
          ...formState,
          tags: formState.tags.split(','),
          _id: selectedId,
        })
      );
    clearForm();
  };

  const clearForm = () => {
    setFormState(initialState);
  };
  return (
    <div className="form">
      <h2>{selectedId ? 'Edit' : 'Create'} Memory</h2>
      <form onSubmit={handleSubmit}>
        {/* <input
          className="form-control"
          placeholder="Creator"
          type="text"
          name="creator"
          value={formState.creator}
          onChange={handleChange}
        /> */}
        <input
          className="form-control"
          placeholder="Title"
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control"
          placeholder="Message"
          name="message"
          value={formState.message}
          onChange={handleChange}
        />
        <input
          className="form-control"
          placeholder="Tags (coma separated)"
          type="text"
          name="tags"
          value={formState.tags}
          onChange={handleChange}
        />
        <FileBase
          type="file"
          multiple={false}
          //@ts-ignore
          onDone={({ base64 }) =>
            setFormState((prevState) => ({
              ...prevState,
              selectedFile: base64,
            }))
          }
        />
        <button className="btn" type="submit">
          submit
        </button>
        <button className="btn" onClick={clearForm}>
          clear
        </button>
      </form>
    </div>
  );
};

export default PostForm;
