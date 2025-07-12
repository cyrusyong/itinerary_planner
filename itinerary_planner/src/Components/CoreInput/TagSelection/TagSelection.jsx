import { useEffect, useState } from "react";

const TagSelection = ({ tags }) => {
  const [tagsObj, setTagsObj] = useState({});
  useEffect(() => {
    if (tags) {
      setTagsObj(tags);
    }
  }, [tags]);

  if (tagsObj) {
    const tagsArray = Object.entries(tagsObj);
    console.log(tagsArray)
  }

  return (
    <>
      <div>Hello this is tag selection</div>
    </>
  );
};

export default TagSelection;
