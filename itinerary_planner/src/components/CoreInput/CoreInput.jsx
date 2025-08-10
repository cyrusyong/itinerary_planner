import { useState, useEffect } from 'react'
import DestinationInput from "./DestinationInput/DestinationInput.jsx"
import TagSelection from "./TagSelection/TagSelection.jsx";


function CoreInput() {
    const [step, setStep] = useState(0)
    const [tags, setTags] = useState()
    const [selectedTags, setSelectedTags] = useState()

    const incrementStep = () => {
        setStep(step + 1)
    }

    const fetchTags = (fetchedTags) => {
        setTags(fetchedTags)
    }

    const getSelectedTags = (receivedTags) => {
        setSelectedTags(receivedTags)
    }

    useEffect(() => {
        if (selectedTags) {
            selectedTags.forEach((tag) => {
                console.log(tag.data.places)
            })
        }
    }, [selectedTags])

    return (
        <>
            <div>Step {step}</div>
            {step == 0 && <DestinationInput incrementStep={incrementStep} sendTags={fetchTags}/>}
            {step == 1 && <TagSelection incrementStep={incrementStep} tags={tags} sendSelectedTags={getSelectedTags}/>}
            {step == 2 && <p>step 2</p>}
        </>
    )
}

export default CoreInput;