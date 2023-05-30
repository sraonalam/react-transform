import React, { useState } from 'react';
import { freemarker } from 'freemarker';
import { Html5Entities } from 'html-entities';

function applyTransformation(inputData, transformationData) {
  return new Promise((resolve, reject) => {
    freemarker.render(
      transformationData,
      inputData,
      (error, transformedOutput) => {
        if (error) {
          reject(error);
        } else {
          const entities = new Html5Entities();
          const decodedOutput = entities.decode(transformedOutput);
          resolve(decodedOutput);
        }
      }
    );
  });
}

function App() {
  const [inputData, setInputData] = useState('');
  const [transformationData, setTransformationData] = useState('');
  const [outputData, setOutputData] = useState('');

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleTransformationChange = (event) => {
    setTransformationData(event.target.value);
  };

  const handleGenerateOutput = () => {
    // Perform Jolt transformation on the input data
    applyTransformation(inputData, transformationData)
      .then((transformedData) => {
        // Update the state with the transformed output data
        setOutputData(transformedData);
      })
      .catch((error) => {
        // Handle any error that occurred during the transformation
        console.error('Error applying transformation:', error);
      });
  };

  return (
    <div>
      <h1>FreeMarker Transformation</h1>
      <div>
        <h2>Input Data (JSON Model)</h2>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          rows={10}
          cols={50}
          placeholder="Enter JSON model..."
        />
      </div>
      <div>
        <h2>Transformation Data (FreeMarker Spec Template)</h2>
        <textarea
          value={transformationData}
          onChange={handleTransformationChange}
          rows={10}
          cols={50}
          placeholder="Enter FreeMarker spec template..."
        />
      </div>
      <div>
        <button onClick={handleGenerateOutput}>Generate Output</button>
      </div>
      {outputData && (
        <div>
          <h2>Output Data</h2>
          <textarea value={outputData} rows={10} cols={50} readOnly />
        </div>
      )}
    </div>
  );
}
export default App;
