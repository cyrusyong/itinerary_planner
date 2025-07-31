import { useEffect, useState } from "react";

const TagSelection = ({ tags }) => {
  const [tagArray, setTagArray] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    if (tags) {
      console.log(tags)
      setTagArray(tags)
    }
  }, [tags])

  function handleTagClick(e) {
    const updatedTagArray = [...tagArray]

    const [, tagData] = updatedTagArray[e.target.id]
    console.log(tagData)

    if (tagData.tagSelected) {
      tagData.tagSelected = false
    } else {
      tagData.tagSelected = true
    }
    setTagArray(updatedTagArray)
  }

  return (
    <>
      <div>Hello this is tag selection</div>
      {tagArray.map(([tagName, tagData], index) => {
        if (!tagData.tagSelected) {
          return (
            <button key={index} id={index} onClick={(e) => {
              handleTagClick(e)
            }}>{tagName}</button>
          )
        }
      })}

      <div>
        {tagArray.map(([tagName, tagData], index) => {
          if (tagData.tagSelected) {
            return (
              <button key={index} id={index} onClick={(e) => {
                handleTagClick(e)
              }}>{tagName}</button>
            )
          }
        })}
      </div>


      <button>Next</button>
    </>
  );
};

export default TagSelection;
