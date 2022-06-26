import React from 'react';
import FileBase from 'react-file-base64';
import { createPost, editPost, selectId } from '../features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

interface FormStateType {
  name: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
  likes: string[];
  creator: string;
}

const initialState: FormStateType = {
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
          likes: post?.likes!,
          creator: user?.id!,
        });
      }
    }
  }, [selectedId, posts, user?.id, user?.name]);
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
    dispatch(selectId(0));
  };

  if (!user) {
    return (
      <div className="p-8 bg-white border border-gray-100 rounded-lg shadow-lg flex items-start self-start">
        <h3 className="text-center font-bold text-xl">
          Please Sign In to create your own memories and like other memories!
        </h3>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-start">
      <div
        className="w-full p-4 bg-white rounded shadow border border-gray-100
    flex flex-col gap-4 overflow-hidden"
      >
        <h2 className="font-bold">{selectedId ? 'Edit' : 'Create'} Memory</h2>
        <form
          className="flex flex-col justify-between gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded p-2 bg-gray-100 outline-gray-700"
            placeholder="Title"
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
          <textarea
            className="rounded p-2 bg-gray-100 h-[100px] outline-gray-700"
            placeholder="Message"
            name="message"
            value={formState.message}
            onChange={handleChange}
          />
          <input
            className="rounded p-2 bg-gray-100 outline-gray-700"
            placeholder="Tags (coma separated)"
            type="text"
            name="tags"
            value={formState.tags}
            onChange={handleChange}
          />

          <div className="max-w-[250px]">
            <FileBase
              multiple={false}
              //@ts-ignore
              onDone={({ base64 }) => {
                setFormState((prevState) => ({
                  ...prevState,
                  selectedFile: base64,
                }));
              }}
            />
          </div>

          <button className="btn" type="submit">
            submit
          </button>
          <span className="text-center btn cursor-pointer" onClick={clearForm}>
            clear
          </span>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
